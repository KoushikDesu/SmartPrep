import { supabase } from './supabase.js';

/**
 * Fetches all categories ordered by sort_order
 * @returns {Promise<Array>}
 */
export async function getCategories() {
  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetches subcategories for a category
 * @param {string|number} categoryId
 * @returns {Promise<Array>}
 */
export async function getSubcategories(categoryId) {
  try {
    const { data, error } = await supabase
      .from('subcategories')
      .select('*')
      .eq('category_id', categoryId)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
}

/**
 * Fetches topics for a subcategory
 * @param {string|number} subcategoryId
 * @returns {Promise<Array>}
 */
export async function getTopics(subcategoryId) {
  try {
    const { data, error } = await supabase
      .from('topics')
      .select('*')
      .eq('subcategory_id', subcategoryId)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching topics:', error);
    return [];
  }
}

/**
 * Fetches paginated questions for a topic
 * @param {string|number} topicId
 * @param {number} page
 * @param {number} pageSize
 * @returns {Promise<{data: Array, count: number}>}
 */
export async function getQuestions(topicId, page = 1, pageSize = 10) {
  try {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    
    const { data, error, count } = await supabase
      .from('questions')
      .select('*', { count: 'exact' })
      .eq('topic_id', topicId)
      .order('created_at', { ascending: false })
      .range(start, end);
      
    if (error) throw error;
    return { data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error fetching questions:', error);
    return { data: [], count: 0 };
  }
}

/**
 * Fetches a single question by ID
 * @param {string|number} questionId
 * @returns {Promise<Object|null>}
 */
export async function getQuestion(questionId) {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('id', questionId)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching question:', error);
    return null;
  }
}

/**
 * Adds a new question
 * @param {Object} questionData
 * @returns {Promise<{data: Object|null, error: any}>}
 */
export async function addQuestion(questionData) {
  try {
    const { data, error } = await supabase
      .from('questions')
      .insert([questionData])
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error adding question:', error);
    return { data: null, error };
  }
}

/**
 * Updates a question
 * @param {string|number} questionId
 * @param {Object} updates
 * @returns {Promise<{data: Object|null, error: any}>}
 */
export async function updateQuestion(questionId, updates) {
  try {
    const { data, error } = await supabase
      .from('questions')
      .update(updates)
      .eq('id', questionId)
      .select()
      .single();
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating question:', error);
    return { data: null, error };
  }
}

/**
 * Deletes a question
 * @param {string|number} questionId
 * @returns {Promise<{error: any}>}
 */
export async function deleteQuestion(questionId) {
  try {
    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', questionId);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting question:', error);
    return { error };
  }
}

/**
 * Gets count of questions for a topic
 * @param {string|number} topicId
 * @returns {Promise<number>}
 */
export async function getQuestionCount(topicId) {
  try {
    const { count, error } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true })
      .eq('topic_id', topicId);
    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error getting question count:', error);
    return 0;
  }
}

/**
 * Search questions by text
 * @param {string} query
 * @param {string|number} [categoryId]
 * @returns {Promise<Array>}
 */
export async function searchQuestions(query, categoryId) {
  try {
    let q = supabase
      .from('questions')
      .select('*, topics!inner(subcategory_id, subcategories!inner(category_id))')
      .ilike('content', `%${query}%`);
      
    if (categoryId) {
      q = q.eq('topics.subcategories.category_id', categoryId);
    }
    
    const { data, error } = await q.limit(20);
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching questions:', error);
    return [];
  }
}
