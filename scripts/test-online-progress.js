import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://uvqbwsyrxdsgrmzrzpdm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bTbBeoNv63UxqZ8jalHCeA_2gxKgylg';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testOnlineProgress() {
  console.log('Testing Supabase Auth and user_progress insert/select...');

  // 1. Sign in as admin to get real user_id
  const { data: auth, error: authErr } = await supabase.auth.signInWithPassword({
    email: 'admin@smartprep.local',
    password: 'admin123'
  });

  if (authErr) {
    console.error('Login error:', authErr);
    return;
  }

  const userId = auth.user.id;
  console.log('Logged in as admin, userId:', userId);

  // 2. Insert/Upsert progress record online
  const testQId = 'problems-on-trains_q1';
  const { data: upsertData, error: upsertErr } = await supabase
    .from('user_progress')
    .upsert({
      user_id: userId,
      question_id: testQId,
      selected_option: 'A',
      is_correct: true,
      topic_slug: 'problems-on-trains',
      attempted_at: new Date().toISOString()
    }, { onConflict: 'user_id,question_id' })
    .select();

  console.log('Online progress upsert result:', upsertData, 'Error:', upsertErr);

  // 3. Query all progress for teacher/admin view
  const { data: allProgress, error: selectErr } = await supabase
    .from('user_progress')
    .select('*');

  console.log('All online progress records in Supabase:', allProgress?.length, 'records. Error:', selectErr);
}

testOnlineProgress();
