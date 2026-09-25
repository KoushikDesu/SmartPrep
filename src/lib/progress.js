import { supabase } from './supabase.js';

/**
 * Saves user's answer directly to Supabase user_progress online table
 * @param {string} userId
 * @param {string|number} questionId
 * @param {string|number} selectedOption
 * @param {boolean} isCorrect
 * @param {string} [topicSlug]
 * @returns {Promise<{data: any, error: any}>}
 */
export async function saveProgress(userId, questionId, selectedOption, isCorrect, topicSlug = '') {
  const qIdStr = String(questionId);

  // 1. Sync to Supabase user_progress table directly online
  if (supabase && userId && userId !== 'guest') {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: userId,
          question_id: qIdStr,
          selected_option: selectedOption,
          is_correct: isCorrect,
          topic_slug: topicSlug || '',
          attempted_at: new Date().toISOString()
        }, { onConflict: 'user_id,question_id' })
        .select();

      if (error) {
        console.warn('Supabase online progress save error:', error);
      } else {
        console.log('Progress saved to Supabase online database! 🎉');
      }
    } catch (error) {
      console.warn('Supabase saveProgress exception:', error);
    }
  }

  // 2. Local cache backup
  try {
    const localKey = `smartprep_progress_${userId || 'guest'}`;
    const localData = JSON.parse(localStorage.getItem(localKey) || '[]');
    const existingIndex = localData.findIndex(item => String(item.question_id) === qIdStr);
    
    const record = {
      user_id: userId,
      question_id: qIdStr,
      selected_option: selectedOption,
      is_correct: isCorrect,
      topic_slug: topicSlug,
      attempted_at: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      localData[existingIndex] = record;
    } else {
      localData.push(record);
    }
    localStorage.setItem(localKey, JSON.stringify(localData));
  } catch (err) {
    console.warn('LocalStorage backup error:', err);
  }

  return { data: { success: true }, error: null };
}

/**
 * Gets overall progress stats for a user directly from Supabase
 * @param {string} userId
 * @returns {Promise<{totalAnswered: number, correctAnswers: number, accuracy: number, records: Array}>}
 */
export async function getOverallProgress(userId) {
  let records = [];

  // Fetch online records from Supabase user_progress
  if (supabase && userId && userId !== 'guest') {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (!error && data && data.length > 0) {
        records = data;
      }
    } catch (e) {
      console.warn('Supabase getOverallProgress error:', e);
    }
  }

  // Fallback to local cache if offline
  if (records.length === 0) {
    try {
      const localKey = `smartprep_progress_${userId || 'guest'}`;
      records = JSON.parse(localStorage.getItem(localKey) || '[]');
    } catch (e) {
      records = [];
    }
  }

  const totalAnswered = records.length;
  const correctAnswers = records.filter(p => p.is_correct).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctAnswers / totalAnswered) * 100) : 0;

  return { totalAnswered, correctAnswers, accuracy, records };
}

/**
 * Checks if user already answered a question online in Supabase
 * @param {string} userId
 * @param {string|number} questionId
 * @returns {Promise<{answered: boolean, selectedOption?: string, isCorrect?: boolean}>}
 */
export async function hasAnswered(userId, questionId) {
  const qIdStr = String(questionId);

  // Check Supabase first
  if (supabase && userId && userId !== 'guest') {
    try {
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('question_id', qIdStr)
        .maybeSingle();

      if (data) {
        return { answered: true, selectedOption: data.selected_option, isCorrect: data.is_correct };
      }
    } catch (e) {}
  }

  // Check local cache
  try {
    const localKey = `smartprep_progress_${userId || 'guest'}`;
    const localData = JSON.parse(localStorage.getItem(localKey) || '[]');
    const record = localData.find(r => String(r.question_id) === qIdStr);
    if (record) {
      return { answered: true, selectedOption: record.selected_option, isCorrect: record.is_correct };
    }
  } catch (e) {}

  return { answered: false };
}

/**
 * Gets comprehensive topic attempt stats and automatically resolves the next unattempted question
 * @param {string} userId
 * @param {string} topicSlug
 * @param {Array} questions
 * @returns {Promise<{resumeIndex: number, answeredCount: number, answeredIndices: Set<number>}>}
 */
export async function getTopicProgressInfo(userId, topicSlug, questions = []) {
  let records = [];

  // 1. Fetch from Supabase online
  if (supabase && userId && userId !== 'guest') {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('topic_slug', topicSlug);

      if (!error && data && data.length > 0) {
        records = data;
      }
    } catch (e) {
      console.warn('Supabase topic progress query error:', e);
    }
  }

  // 2. Fetch from LocalStorage cache
  try {
    const localKey = `smartprep_progress_${userId || 'guest'}`;
    const localData = JSON.parse(localStorage.getItem(localKey) || '[]');
    const topicLocalRecords = localData.filter(r => r.topic_slug === topicSlug || String(r.question_id).includes(topicSlug));
    
    // Merge without duplicates
    topicLocalRecords.forEach(lr => {
      if (!records.some(r => String(r.question_id) === String(lr.question_id))) {
        records.push(lr);
      }
    });
  } catch (e) {}

  const answeredIndices = new Set();
  const answeredQIds = new Set(records.map(r => String(r.question_id)));

  questions.forEach((q, idx) => {
    const qId1 = String(q.id);
    const qId2 = `local_${topicSlug}_${idx}`;
    if (answeredQIds.has(qId1) || answeredQIds.has(qId2)) {
      answeredIndices.add(idx);
    }
  });

  // Find the first unattempted question index
  let firstUnattemptedIndex = 0;
  for (let i = 0; i < questions.length; i++) {
    if (!answeredIndices.has(i)) {
      firstUnattemptedIndex = i;
      break;
    }
    firstUnattemptedIndex = i; // if all attempted, stay on last
  }

  // Read saved local preference as secondary hint
  const savedIndex = parseInt(localStorage.getItem(`smartprep_resume_${topicSlug}`) || '-1', 10);
  const resumeIndex = (savedIndex >= 0 && savedIndex < questions.length) 
    ? savedIndex 
    : firstUnattemptedIndex;

  return {
    resumeIndex: Math.min(resumeIndex, Math.max(0, questions.length - 1)),
    firstUnattemptedIndex,
    answeredCount: answeredIndices.size,
    answeredIndices
  };
}

