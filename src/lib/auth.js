import { supabase } from './supabase.js';

/**
 * @typedef {Object} UserProfile
 * @property {string} id
 * @property {string} email
 * @property {string} full_name
 * @property {string} username
 * @property {string} roll_number
 * @property {string} role
 */

/**
 * Signs up a new user (student)
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string} params.fullName
 * @param {string} params.username
 * @param {string} params.rollNumber
 * @returns {Promise<{user: any, error: any}>}
 */
export async function signUp(params, maybePassword) {
  try {
    let fullName, username, rollNumber, password;
    if (typeof params === 'object') {
      fullName = params.fullName || params.name;
      username = params.username;
      rollNumber = params.rollNumber || params.roll_number || '';
      password = params.password;
    } else {
      username = params;
      password = maybePassword;
    }

    const email = `${username}@smartprep.local`;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || username,
          username,
          roll_number: rollNumber || '',
          role: 'student',
        },
      },
    });
    
    if (authError) throw authError;
    if (!authData.user) throw new Error('User creation failed');
    
    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error };
  }
}

/**
 * Signs in a user
 */
export async function signIn(params, maybePassword) {
  try {
    let userId, password;
    if (typeof params === 'object') {
      userId = params.userId || params.username || params.email;
      password = params.password;
    } else {
      userId = params;
      password = maybePassword;
    }

    let emailToUse = userId;
    
    if (!userId.includes('@')) {
      // Look up by username or roll_number
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .or(`username.eq.${userId},roll_number.eq.${userId}`)
        .limit(1)
        .single();
        
      if (error || !data) {
        throw new Error('User not found. Check your username or roll number.');
      }
      emailToUse = `${data.username}@smartprep.local`;
    }
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password,
    });
    
    if (authError) throw authError;
    
    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, error };
  }
}

/**
 * Signs out the current user
 * @returns {Promise<{error: any}>}
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Returns current user from Supabase session
 * @returns {Promise<any|null>}
 */
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

/**
 * Fetches profile from profiles table
 * @param {string} userId
 * @returns {Promise<UserProfile|null>}
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

/**
 * Gets current user's profile
 * @returns {Promise<UserProfile|null>}
 */
export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  return await getUserProfile(user.id);
}

/**
 * Wraps supabase.auth.onAuthStateChange
 * @param {Function} callback
 * @returns {Object} Subscription object
 */
export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
}

/**
 * Checks if profile has admin role
 * @param {UserProfile} profile
 * @returns {boolean}
 */
export function isAdmin(profile) {
  return profile?.role === 'admin';
}

/**
 * Checks if profile has teacher role
 * @param {UserProfile} profile
 * @returns {boolean}
 */
export function isTeacher(profile) {
  return profile?.role === 'teacher';
}

/**
 * Checks if profile has student role
 * @param {UserProfile} profile
 * @returns {boolean}
 */
export function isStudent(profile) {
  return profile?.role === 'student';
}

/**
 * Updates profile data
 * @param {string} userId
 * @param {Object} updates
 * @returns {Promise<{data: any, error: any}>}
 */
export async function updateProfile(userId, updates) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update profile error:', error);
    return { data: null, error };
  }
}

/**
 * Changes current user's password
 * @param {string} newPassword
 * @returns {Promise<{error: any}>}
 */
export async function changePassword(newPassword) {
  try {
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Change password error:', error);
    return { error };
  }
}

/**
 * Admin changes another user's password
 * @param {string} userId
 * @param {string} newPassword
 * @returns {Promise<{error: any}>}
 */
export async function adminChangePassword(userId, newPassword) {
  try {
    const { error } = await supabase.rpc('admin_update_user_password', { 
      target_user_id: userId, 
      new_password: newPassword 
    });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Admin change password error:', error);
    return { error };
  }
}

/**
 * Admin deletes a user
 * @param {string} userId
 * @returns {Promise<{error: any}>}
 */
export async function adminDeleteUser(userId) {
  try {
    const { error } = await supabase.rpc('admin_delete_user', { target_user_id: userId });
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Admin delete user error:', error);
    return { error };
  }
}

/**
 * Admin creates a teacher account
 * @param {Object} params
 * @param {string} params.fullName
 * @param {string} params.username
 * @param {string} params.password
 * @param {string} params.rollNumber
 * @returns {Promise<{data: any, error: any}>}
 */
export async function adminCreateTeacher({ fullName, username, password, rollNumber }) {
  try {
    const email = `${username}@smartprep.local`;
    
    const { data, error } = await supabase.rpc('admin_create_user', {
      user_email: email,
      user_password: password,
      user_full_name: fullName,
      user_username: username,
      user_roll_number: rollNumber,
      user_role: 'teacher'
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Admin create teacher error:', error);
    return { data: null, error };
  }
}
