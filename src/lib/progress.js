import { supabase } from './supabase.js';

/**
 * Saves user's answer
 * @param {string} userId
 * @param {string|number} questionId
 * @param {string|number} selectedOption
 * @param {boolean} isCorrect
 * @returns {Promise<{data: any, error: any}>}
 */
export async function saveProgress(userId, questionId, selectedOption, isCorrect) {
  try {
    const { data, error } = await supabase
      .from('progress')
      .upsert([
        {
          user_id: userId,
          question_id: questionId,
          selected_option: selectedOption,
          is_correct: isCorrect,
          answered_at: new Date().toISOString()
        }
      ], { onConflict: 'user_id,question_id' })
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error saving progress:', error);
    return { data: null, error };
  }
}

/**
 * Gets user's progress for a topic
 * @param {string} userId
 * @param {string|number} topicId
 * @returns {Promise<Array>}
 */
export async function getProgress(userId, topicId) {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('*, questions!inner(topic_id)')
      .eq('user_id', userId)
      .eq('questions.topic_id', topicId);
      
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting progress:', error);
    return [];
  }
}

/**
 * Gets overall progress stats
 * @param {string} userId
 * @returns {Promise<{totalAnswered: number, correctAnswers: number}>}
 */
export async function getOverallProgress(userId) {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('is_correct')
      .eq('user_id', userId);
      
    if (error) throw error;
    
    const totalAnswered = data?.length || 0;
    const correctAnswers = data?.filter(p => p.is_correct).length || 0;
    
    return { totalAnswered, correctAnswers };
  } catch (error) {
    console.error('Error getting overall progress:', error);
    return { totalAnswered: 0, correctAnswers: 0 };
  }
}

/**
 * Gets progress per category
 * @param {string} userId
 * @param {string|number} categoryId
 * @returns {Promise<{totalAnswered: number, correctAnswers: number}>}
 */
export async function getCategoryProgress(userId, categoryId) {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('is_correct, questions!inner(topics!inner(subcategories!inner(category_id)))')
      .eq('user_id', userId)
      .eq('questions.topics.subcategories.category_id', categoryId);
      
    if (error) throw error;
    
    const totalAnswered = data?.length || 0;
    const correctAnswers = data?.filter(p => p.is_correct).length || 0;
    
    return { totalAnswered, correctAnswers };
  } catch (error) {
    console.error('Error getting category progress:', error);
    return { totalAnswered: 0, correctAnswers: 0 };
  }
}

/**
 * Gets progress percentage for a topic
 * @param {string} userId
 * @param {string|number} topicId
 * @returns {Promise<number>}
 */
export async function getTopicProgress(userId, topicId) {
  try {
    const { count: totalQuestions } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('topic_id', topicId);
      
    if (!totalQuestions) return 0;
    
    const { count: answeredQuestions } = await supabase
      .from('progress')
      .select('*, questions!inner(topic_id)', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('questions.topic_id', topicId);
      
    return Math.round(((answeredQuestions || 0) / totalQuestions) * 100);
  } catch (error) {
    console.error('Error getting topic progress:', error);
    return 0;
  }
}

/**
 * Checks if user already answered
 * @param {string} userId
 * @param {string|number} questionId
 * @returns {Promise<boolean>}
 */
export async function hasAnswered(userId, questionId) {
  try {
    const { data, error } = await supabase
      .from('progress')
      .select('id')
      .eq('user_id', userId)
      .eq('question_id', questionId)
      .single();
      
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  } catch (error) {
    console.error('Error checking if answered:', error);
    return false;
  }
}

/**
 * For teachers: gets all student profiles with progress stats
 * @returns {Promise<Array>}
 */
export async function getStudentList() {
  try {
    const { data: students, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student');
      
    if (error) throw error;
    
    const studentsWithStats = await Promise.all(students.map(async (student) => {
      const stats = await getOverallProgress(student.id);
      return { ...student, stats };
    }));
    
    return studentsWithStats;
  } catch (error) {
    console.error('Error getting student list:', error);
    return [];
  }
}
