import { supabase } from './supabase.js';

/**
 * Signs up a new student with strict username rules and uniqueness verification
 */
export async function signUp(params, maybePassword) {
  try {
    let fullName, username, rollNumber, password;
    if (typeof params === 'object') {
      fullName = (params.fullName || params.name || '').trim();
      username = (params.username || '').trim();
      rollNumber = (params.rollNumber || params.roll_number || '').trim();
      password = params.password;
    } else {
      username = (params || '').trim();
      password = maybePassword;
    }

    if (!username) throw new Error('Please enter a valid username');
    if (!password || password.length < 6) throw new Error('Password must be at least 6 characters');

    // Clean username (remove leading @ if typed)
    const cleanUsername = username.startsWith('@') ? username.substring(1).trim().toLowerCase() : username.toLowerCase();

    // Username format validation (alphanumeric and underscore, 3-20 characters)
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    if (!usernameRegex.test(cleanUsername)) {
      throw new Error('Username must be 3-20 characters long and contain only letters, numbers, and underscores.');
    }

    // Uniqueness check across profiles table before attempting signup
    if (supabase) {
      // 1. Check duplicate username
      const { data: existingUname } = await supabase
        .from('profiles')
        .select('id, username')
        .ilike('username', cleanUsername)
        .maybeSingle();

      if (existingUname) {
        throw new Error(`The username '@${cleanUsername}' is already taken. Please choose another username.`);
      }

      // 2. Check duplicate roll number if provided
      if (rollNumber) {
        const { data: existingRoll } = await supabase
          .from('profiles')
          .select('id, roll_number')
          .ilike('roll_number', rollNumber)
          .maybeSingle();

        if (existingRoll) {
          throw new Error(`The college roll number '${rollNumber}' is already registered with another account.`);
        }
      }
    }

    const email = `${cleanUsername}@smartprep.local`;
    
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || cleanUsername,
          username: cleanUsername,
          roll_number: rollNumber || '',
          role: 'student',
        },
      },
    });
    
    if (authError) {
      if (authError.message?.toLowerCase().includes('already registered')) {
        throw new Error(`The username '@${cleanUsername}' is already registered. Please sign in.`);
      }
      throw authError;
    }
    
    if (!authData.user) throw new Error('User account creation failed');

    // Explicitly ensure profile entry is synced
    try {
      await supabase.from('profiles').upsert({
        id: authData.user.id,
        username: cleanUsername,
        full_name: fullName || cleanUsername,
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

    let cleanInput = (userId || '').trim();
    if (cleanInput.startsWith('@')) cleanInput = cleanInput.substring(1).trim();

    let emailToUse = cleanInput;
    
    if (!cleanInput.includes('@')) {
      // First check profiles table for username or roll number
      try {
        const { data } = await supabase
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
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailToUse,
      password,
    });
    
    if (error) {
      if (error.message?.toLowerCase().includes('invalid login credentials')) {
        throw new Error('Invalid username, roll number, or password.');
      }
      throw error;
    }
    
    return { user: data.user, session: data.session, error: null };
  } catch (error) {
    console.error('Sign in error:', error);
    return { user: null, session: null, error };
  }
}

/**
 * Signs out current user
 */
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Sign out error:', error);
    return { error };
  }
}

/**
 * Gets currently logged in user profile
 */
export async function getCurrentProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();
      
    if (error) throw error;
    return profile || {
      id: user.id,
      full_name: user.user_metadata?.full_name || user.user_metadata?.name || 'User',
      username: user.user_metadata?.username || 'user',
      roll_number: user.user_metadata?.roll_number || user.user_metadata?.rollNumber || '',
      role: user.user_metadata?.role || 'student'
    };
  } catch (error) {
    console.error('Get profile error:', error);
    return null;
  }
}

/**
 * Updates a user profile
 */
export async function updateProfile(userId, updates) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Update profile error:', error);
    return { data: null, error };
  }
}

/**
 * Changes current user's password
 */
export async function changePassword(newPassword) {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Change password error:', error);
    return { data: null, error };
  }
}

/**
 * Admin: changes password of another user
 */
export async function adminChangePassword(userId, newPassword) {
  try {
    const { data, error } = await supabase.rpc('admin_update_user_password', {
      target_user_id: userId,
      new_password: newPassword
    });
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Admin change password error:', error);
    return { data: null, error };
  }
}

/**
 * Admin: deletes a user
 */
export async function adminDeleteUser(userId) {
  try {
    const { data, error } = await supabase.rpc('admin_delete_user', {
      target_user_id: userId
    });
    if (error) {
      // Fallback direct delete from profiles
      await supabase.from('profiles').delete().eq('id', userId);
    }
    return { data, error: null };
  } catch (error) {
    console.error('Admin delete user error:', error);
    return { data: null, error };
  }
}

/**
 * Admin: creates a new teacher
 */
export async function adminCreateTeacher(params, maybePassword, maybeFullName) {
  let username, password, fullName, rollNumber;
  if (typeof params === 'object') {
    username = params.username;
    password = params.password;
    fullName = params.fullName || params.full_name;
    rollNumber = params.rollNumber || params.roll_number || '';
  } else {
    username = params;
    password = maybePassword;
    fullName = maybeFullName;
  }

  const cleanUsername = (username || '').trim().toLowerCase();
  const email = `${cleanUsername}@smartprep.local`;

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || username,
          username: cleanUsername,
          roll_number: rollNumber || 'FAC-ID',
          role: 'teacher'
        }
      }
    });

    if (authError) throw authError;

    if (authData.user) {
      await supabase.from('profiles').upsert({
        id: authData.user.id,
        username: cleanUsername,
        full_name: fullName || username,
        roll_number: rollNumber || 'FAC-ID',
        role: 'teacher'
      });
    }

    return { user: authData.user, error: null };
  } catch (error) {
    console.error('Create teacher error:', error);
    return { user: null, error };
  }
}
