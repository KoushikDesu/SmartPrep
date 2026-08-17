import pg from 'pg';
const { Client } = pg;
const connectionString = "postgresql://postgres.uvqbwsyrxdsgrmzrzpdm:Kingofstates1119@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

async function check() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log('PostgreSQL connected!');

    // Check tables
    const tables = await client.query(`
      SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;
    `);
    console.log('Tables:', tables.rows.map(r => r.table_name));

    // Check profiles
    const profiles = await client.query(`SELECT id, username, role, full_name, roll_number FROM profiles;`);
    console.log('Profiles in DB:', profiles.rows);

    // Check categories count
    const catCount = await client.query(`SELECT count(*) FROM categories;`);
    console.log('Categories count:', catCount.rows[0].count);

    // Check topics count
    const topCount = await client.query(`SELECT count(*) FROM topics;`);
    console.log('Topics count:', topCount.rows[0].count);

    // Check questions count
    const qCount = await client.query(`SELECT count(*) FROM questions;`);
    console.log('Questions count:', qCount.rows[0].count);

    // Ensure RLS permissions for anon and authenticated on all public tables
    await client.query(`
      GRANT USAGE ON SCHEMA public TO anon, authenticated;
      GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
      GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
      GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated;
    `);
    console.log('Granted all schema permissions to anon and authenticated roles!');

  } catch (err) {
    console.error('Check err:', err);
  } finally {
    await client.end();
  }
}

check();
