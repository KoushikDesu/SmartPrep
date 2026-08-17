import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uvqbwsyrxdsgrmzrzpdm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bTbBeoNv63UxqZ8jalHCeA_2gxKgylg';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function test() {
  console.log('Testing Supabase Client Auth for admin...');

  // Test 1: Query profiles
  const { data: profs, error: profErr } = await supabase.from('profiles').select('*');
  console.log('Profiles select test:', profs, 'Error:', profErr);

  // Test 2: Sign in as admin
  const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'admin@smartprep.local',
    password: 'admin123'
  });
  console.log('Admin Sign In result:', authData.user ? 'SUCCESS (User ID: ' + authData.user.id + ')' : 'FAILED', 'Error:', authErr);

  // Test 3: Sign up a test student
  const testUname = 'student_test_' + Math.floor(Math.random() * 1000);
  const { data: signUpData, error: signUpErr } = await supabase.auth.signUp({
    email: `${testUname}@smartprep.local`,
    password: 'password123',
    options: {
      data: {
        username: testUname,
        full_name: 'Test Student',
        roll_number: '21CS999',
        role: 'student'
      }
    }
  });
  console.log('Student Sign Up result:', signUpData.user ? 'SUCCESS (User ID: ' + signUpData.user.id + ')' : 'FAILED', 'Error:', signUpErr);
}

test();
