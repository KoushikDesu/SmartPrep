import { supabase } from './supabase.js';

/**
 * Signs up a new student
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

    const cleanUsername = (username || '').trim().toLowerCase();
    const email = `${cleanUsername}@smartprep.local`;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || username,
          username: cleanUsername,
          roll_number: rollNumber || '',
          role: 'student',
        },
      },
    });
    
    if (authError) {
      if (authError.message?.toLowerCase().includes('already registered')) {
        throw new Error('This username is already registered. Please sign in.');
      }
      throw authError;
    }
    
    if (!authData.user) throw new Error('User creation failed');

    // Also explicitly ensure profile entry exists
    try {
      await supabase.from('profiles').upsert({
        id: authData.user.id,
        username: cleanUsername,
        full_name: fullName || username,
        roll_number: rollNumber || '',
        role: 'student'
      });
    } catch (profileErr) {
      console.warn('Profile upsert fallback warning:', profileErr);
    }
    
    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Sign up error:', error);
    return { user: null, error };
  }
}

/**
 * Signs in a user by Username, Roll Number, or Email
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

    const cleanInput = (userId || '').trim();
    let emailToUse = cleanInput;
    
    if (!cleanInput.includes('@')) {
      // First check profiles table
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .or(`username.ilike.${cleanInput},roll_number.ilike.${cleanInput}`)
          .limit(1)
          .maybeSingle();
          
        if (data && data.username) {
          emailToUse = `${data.username.toLowerCase()}@smartprep.local`;
        } else {
          emailToUse = `${cleanInput.toLowerCase()}@smartprep.local`;
        }
      } catch (e) {
        emailToUse = `${cleanInput.toLowerCase()}@smartprep.local`;
      }
    }
    
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password,
    });
    
    if (authError) {
      if (authError.message?.toLowerCase().includes('invalid login credentials')) {
        throw new Error('Invalid username, roll number, or password. Please check and try again.');
      }
      throw authError;
    }
    
    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, error };
  }
}

/**
 * Signs out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

/**
 * Returns current user from Supabase session
 */
export async function getCurrentUser() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user || null;
  } catch (e) {
    return null;
  }
}

/**
 * Fetches profile from profiles table
 */
export async function getUserProfile(userId) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (error || !data) {
      // Fallback from user metadata
      const user = await getCurrentUser();
      if (user && user.id === userId) {
        return {
          id: user.id,
          username: user.user_metadata?.username || user.email?.split('@')[0],
          full_name: user.user_metadata?.full_name || 'User',
          role: user.user_metadata?.role || 'student',
          roll_number: user.user_metadata?.roll_number || ''
        };
      }
    }
    return data;
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

/**
 * Gets current user's profile
 */
export async function getCurrentProfile() {
  const user = await getCurrentUser();
  if (!user) return null;
  return await getUserProfile(user.id);
}

export function onAuthStateChange(callback) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
}

export function isAdmin(profile) {
  return profile?.role === 'admin';
}

export function isTeacher(profile) {
  return profile?.role === 'teacher';
}

export function isStudent(profile) {
  return profile?.role === 'student';
}

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

export async function adminCreateTeacher({ fullName, username, password, rollNumber }) {
  try {
    const email = `${username.toLowerCase().trim()}@smartprep.local`;
    
    const { data, error } = await supabase.rpc('admin_create_user', {
      user_email: email,
      user_password: password,
      user_full_name: fullName,
      user_username: username.toLowerCase().trim(),
      user_roll_number: rollNumber || '',
      user_role: 'teacher'
    });
    
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Admin create teacher error:', error);
    return { data: null, error };
  }
}
