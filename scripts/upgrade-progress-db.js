import pg from 'pg';
const { Client } = pg;
const connectionString = "postgresql://postgres.uvqbwsyrxdsgrmzrzpdm:Kingofstates1119@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

async function upgradeProgressTable() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log('PG connected');

    // 1. Drop foreign key constraint on question_id so string/seeded IDs can be saved
    await client.query(`
      ALTER TABLE public.user_progress DROP CONSTRAINT IF EXISTS user_progress_question_id_fkey;
    `);

    // 2. Change question_id to TEXT to accept any question ID seamlessly
    await client.query(`
      ALTER TABLE public.user_progress ALTER COLUMN question_id TYPE TEXT USING question_id::text;
    `);

    // 3. Add topic_slug column if not exists
    await client.query(`
      ALTER TABLE public.user_progress ADD COLUMN IF NOT EXISTS topic_slug TEXT;
    `);

    // 4. Ensure RLS policies are permissive for authenticated users and teachers/admins
    await client.query(`
      DROP POLICY IF EXISTS "Users can insert own progress" ON public.user_progress;
      DROP POLICY IF EXISTS "Users can update own progress" ON public.user_progress;
      DROP POLICY IF EXISTS "Users can view own progress" ON public.user_progress;
      DROP POLICY IF EXISTS "Teachers can view all progress" ON public.user_progress;

      CREATE POLICY "Allow authenticated insert progress" 
        ON public.user_progress FOR INSERT 
        TO authenticated 
        WITH CHECK (true);

      CREATE POLICY "Allow authenticated update progress" 
        ON public.user_progress FOR UPDATE 
        TO authenticated 
        USING (true);

      CREATE POLICY "Allow users and teachers select progress" 
        ON public.user_progress FOR SELECT 
        TO authenticated 
        USING (true);

      CREATE POLICY "Allow anon select progress" 
        ON public.user_progress FOR SELECT 
        TO anon 
        USING (true);
    `);

    // 5. Grant permissions to anon, authenticated, service_role
    await client.query(`
      GRANT ALL ON TABLE public.user_progress TO anon, authenticated, service_role;
    `);

    console.log('user_progress table successfully upgraded for seamless online progress tracking!');
  } catch (e) {
    console.error('Upgrade error:', e);
  } finally {
    await client.end();
  }
}

upgradeProgressTable();
