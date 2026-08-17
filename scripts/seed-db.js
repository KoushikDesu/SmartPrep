import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEED_QUESTIONS } from '../src/data/seed-questions.js';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const connectionString = "postgresql://postgres.uvqbwsyrxdsgrmzrzpdm:Kingofstates1119@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

async function main() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');

    // 1. Run Schema Migration
    const sqlPath = path.join(__dirname, '../supabase-schema.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log('Running Schema setup...');
    await client.query(sql);
    console.log('Schema setup complete!');

    // 2. Fetch Topics Map (slug -> id)
    const topicsRes = await client.query(`SELECT id, slug FROM topics;`);
    const topicMap = new Map();
    topicsRes.rows.forEach(r => topicMap.set(r.slug, r.id));

    console.log(`Found ${topicMap.size} topics in DB.`);

    // 3. Insert Seed Questions
    let inserted = 0;
    for (const [topicSlug, questions] of Object.entries(SEED_QUESTIONS)) {
      const topicId = topicMap.get(topicSlug);
      if (!topicId) {
        console.warn(`Topic slug "${topicSlug}" not found in DB, skipping questions.`);
        continue;
      }

      for (const q of questions) {
        // Check if question exists for this topic & number
        const check = await client.query(
          `SELECT id FROM questions WHERE topic_id = $1 AND question_number = $2;`,
          [topicId, q.question_number]
        );

        if (check.rows.length === 0) {
          await client.query(
            `INSERT INTO questions (topic_id, question_number, question_text, option_a, option_b, option_c, option_d, correct_option, explanation)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
            [
              topicId,
              q.question_number,
              q.question_text,
              q.option_a,
              q.option_b,
              q.option_c,
              q.option_d,
              q.correct_option,
              q.explanation
            ]
          );
          inserted++;
        }
      }
    }

    console.log(`Seeded ${inserted} questions into the questions table!`);

    // 4. Update topic question counts
    await client.query(`
      UPDATE topics t
      SET question_count = (
        SELECT COUNT(*) FROM questions q WHERE q.topic_id = t.id
      );
    `);
    console.log('Topic question counts updated!');

    // 5. Check if admin user exists in profiles, if not create default admin in auth
    const adminCheck = await client.query(`SELECT id FROM profiles WHERE role = 'admin' OR username = 'admin';`);
    console.log(`Found ${adminCheck.rows.length} admin profile(s).`);

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

main();
