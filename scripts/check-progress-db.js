import pg from 'pg';
const { Client } = pg;
const connectionString = "postgresql://postgres.uvqbwsyrxdsgrmzrzpdm:Kingofstates1119@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

async function checkProgressTable() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log('PG connected');

    // 1. Get columns of user_progress
    const cols = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'user_progress';
    `);
    console.log('user_progress columns:', cols.rows);

    // 2. Check foreign keys and constraints on user_progress
    const constraints = await client.query(`
      SELECT conname, contype, pg_get_constraintdef(oid)
      FROM pg_constraint
      WHERE conrelid = 'user_progress'::regclass;
    `);
    console.log('user_progress constraints:', constraints.rows);

    // 3. Check RLS policies on user_progress
    const policies = await client.query(`
      SELECT * FROM pg_policies WHERE tablename = 'user_progress';
    `);
    console.log('user_progress policies:', policies.rows);

  } catch (e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

checkProgressTable();
