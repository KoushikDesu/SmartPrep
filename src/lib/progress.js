import { supabase } from './supabase.js';

/**
 * Saves user's answer both to Supabase DB and localStorage
 * @param {string} userId
 * @param {string|number} questionId
 * @param {string|number} selectedOption
 * @param {boolean} isCorrect
 * @param {string} [topicSlug]
 * @returns {Promise<{data: any, error: any}>}
 */
export async function saveProgress(userId, questionId, selectedOption, isCorrect, topicSlug = '') {
  // 1. Always save to localStorage for instant fast retrieval & offline support
  try {
    const localKey = `smartprep_progress_${userId || 'guest'}`;
    const localData = JSON.parse(localStorage.getItem(localKey) || '[]');
    const existingIndex = localData.findIndex(item => item.question_id === questionId);
    
    const record = {
      user_id: userId,
      question_id: questionId,
      selected_option: selectedOption,
      is_correct: isCorrect,
      topic_slug: topicSlug,
      answered_at: new Date().toISOString()
    };

    if (existingIndex >= 0) {
      localData[existingIndex] = record;
    } else {
      localData.push(record);
    }
    localStorage.setItem(localKey, JSON.stringify(localData));
  } catch (err) {
    console.warn('LocalStorage progress save error:', err);
  }

  // 2. Sync to Supabase user_progress table if user is logged in
  if (supabase && userId) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .upsert([
          {
            user_id: userId,
            question_id: questionId,
            selected_option: selectedOption,
            is_correct: isCorrect,
            answered_at: new Date().toISOString()
          }
        ], { onConflict: 'user_id,question_id' })
        .select();

      if (error) {
        console.warn('Supabase progress save error:', error);
      }
      return { data, error: null };
    } catch (error) {
      console.warn('Supabase saveProgress error:', error);
      return { data: null, error };
    }
  }

  return { data: { success: true }, error: null };
}

/**
 * Gets overall progress stats for a user
 * @param {string} userId
 * @returns {Promise<{totalAnswered: number, correctAnswers: number, accuracy: number, records: Array}>}
 */
export async function getOverallProgress(userId) {
  let records = [];

  // Try fetching from Supabase user_progress
  if (supabase && userId) {
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

  // Fallback to localStorage if Supabase has no records or offline
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
 * Checks if user already answered a question
 * @param {string} userId
 * @param {string|number} questionId
 * @returns {Promise<{answered: boolean, selectedOption?: string, isCorrect?: boolean}>}
 */
export async function hasAnswered(userId, questionId) {
  // Check localStorage first
  try {
    const localKey = `smartprep_progress_${userId || 'guest'}`;
    const localData = JSON.parse(localStorage.getItem(localKey) || '[]');
    const record = localData.find(r => r.question_id === questionId);
    if (record) {
      return { answered: true, selectedOption: record.selected_option, isCorrect: record.is_correct };
    }
  } catch (e) {}

  // Check Supabase
  if (supabase && userId) {
    try {
      const { data } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('question_id', questionId)
        .maybeSingle();

      if (data) {
        return { answered: true, selectedOption: data.selected_option, isCorrect: data.is_correct };
      }
    } catch (e) {}
  }

  return { answered: false };
}
