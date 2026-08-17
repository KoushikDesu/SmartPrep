import { createClient } from '@supabase/supabase-js';
import pg from 'pg';

const { Client } = pg;
const connectionString = "postgresql://postgres.uvqbwsyrxdsgrmzrzpdm:Kingofstates1119@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

const SUPABASE_URL = 'https://uvqbwsyrxdsgrmzrzpdm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bTbBeoNv63UxqZ8jalHCeA_2gxKgylg';

async function main() {
  const pgClient = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await pgClient.connect();
  console.log('PostgreSQL connected!');

  // 1. Delete previous admin and teacher to recreate them cleanly
  await pgClient.query(`DELETE FROM auth.users WHERE email IN ('admin@smartprep.local', 'teacher@smartprep.local');`);
  console.log('Deleted old auth users');

  await pgClient.end();

  // 2. Use supabase-js to sign up admin and teacher cleanly through GoTrue
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  console.log('Creating admin via Supabase Auth API...');
  const { data: adminAuth, error: adminErr } = await supabase.auth.signUp({
    email: 'admin@smartprep.local',
    password: 'admin123',
    options: {
      data: {
        username: 'admin',
        full_name: 'System Administrator',
        role: 'admin'
      }
    }
  });

  if (adminErr) console.error('Admin signup error:', adminErr);
  else console.log('Admin created successfully! User ID:', adminAuth.user?.id);

  console.log('Creating teacher via Supabase Auth API...');
  const { data: teacherAuth, error: teacherErr } = await supabase.auth.signUp({
    email: 'teacher@smartprep.local',
    password: 'teacher123',
    options: {
      data: {
        username: 'teacher',
        full_name: 'Professor Sharma',
        role: 'teacher'
      }
    }
  });

  if (teacherErr) console.error('Teacher signup error:', teacherErr);
  else console.log('Teacher created successfully! User ID:', teacherAuth.user?.id);

  // 3. Reconnect to PG to verify and confirm emails + roles
  const pgClient2 = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  await pgClient2.connect();
  
  await pgClient2.query(`
    UPDATE auth.users 
    SET email_confirmed_at = NOW() 
    WHERE email IN ('admin@smartprep.local', 'teacher@smartprep.local');
  `);
  
  await pgClient2.query(`
    UPDATE public.profiles 
    SET role = 'admin' WHERE username = 'admin';
  `);
  await pgClient2.query(`
    UPDATE public.profiles 
    SET role = 'teacher' WHERE username = 'teacher';
  `);

  console.log('Confirmed emails and updated profile roles in PostgreSQL!');
  await pgClient2.end();

  // 4. Test Sign In for Admin and Teacher via Supabase Client!
  console.log('Testing Admin Sign In...');
  const { data: adminLogin, error: adminLoginErr } = await supabase.auth.signInWithPassword({
    email: 'admin@smartprep.local',
    password: 'admin123'
  });
  console.log('Admin login result:', adminLogin.user ? 'SUCCESS! 🎉 Logged in as: ' + adminLogin.user.email : 'FAILED', adminLoginErr);

  console.log('Testing Teacher Sign In...');
  const { data: teacherLogin, error: teacherLoginErr } = await supabase.auth.signInWithPassword({
    email: 'teacher@smartprep.local',
    password: 'teacher123'
  });
  console.log('Teacher login result:', teacherLogin.user ? 'SUCCESS! 🎉 Logged in as: ' + teacherLogin.user.email : 'FAILED', teacherLoginErr);
}

main();
