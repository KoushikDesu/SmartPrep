import pg from 'pg';

const { Client } = pg;
const connectionString = "postgresql://postgres.uvqbwsyrxdsgrmzrzpdm:Kingofstates1119@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

async function createAdmin() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL!');

    const adminUsername = 'admin';
    const adminEmail = 'admin@smartprep.local';
    const adminPassword = 'admin123';
    const adminFullName = 'System Administrator';

    // Check if auth user exists
    const existing = await client.query(`SELECT id FROM auth.users WHERE email = $1;`, [adminEmail]);
    
    let userId;
    if (existing.rows.length > 0) {
      userId = existing.rows[0].id;
      console.log('Admin auth user exists with id:', userId);
      // Update password
      await client.query(
        `UPDATE auth.users SET encrypted_password = crypt($1, gen_salt('bf')) WHERE id = $2;`,
        [adminPassword, userId]
      );
    } else {
      const newIdRes = await client.query(`SELECT uuid_generate_v4() as id;`);
      userId = newIdRes.rows[0].id;
      
      await client.query(`
        INSERT INTO auth.users (
          id, instance_id, email, encrypted_password, email_confirmed_at,
          raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
        ) VALUES (
          $1, '00000000-0000-0000-0000-000000000000', $2,
          crypt($3, gen_salt('bf')), NOW(),
          '{"provider":"email","providers":["email"]}',
          '{"full_name":"${adminFullName}","username":"${adminUsername}","role":"admin"}',
          NOW(), NOW(), 'authenticated', 'authenticated'
        );
      `, [userId, adminEmail, adminPassword]);
      console.log('Created admin in auth.users with id:', userId);
    }

    // Insert or update profiles
    await client.query(`
      INSERT INTO profiles (id, username, full_name, role)
      VALUES ($1, $2, $3, 'admin')
      ON CONFLICT (id) DO UPDATE SET
        role = 'admin',
        username = $2,
        full_name = $3;
    `, [userId, adminUsername, adminFullName]);

    console.log('Admin account ready! Username: admin, Password: admin123');

    // Also create a demo teacher account
    const teacherEmail = 'teacher@smartprep.local';
    const teacherPassword = 'teacher123';
    const teacherExisting = await client.query(`SELECT id FROM auth.users WHERE email = $1;`, [teacherEmail]);
    
    let teacherId;
    if (teacherExisting.rows.length > 0) {
      teacherId = teacherExisting.rows[0].id;
      await client.query(
        `UPDATE auth.users SET encrypted_password = crypt($1, gen_salt('bf')) WHERE id = $2;`,
        [teacherPassword, teacherId]
      );
    } else {
      const tIdRes = await client.query(`SELECT uuid_generate_v4() as id;`);
      teacherId = tIdRes.rows[0].id;
      
      await client.query(`
        INSERT INTO auth.users (
          id, instance_id, email, encrypted_password, email_confirmed_at,
          raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
        ) VALUES (
          $1, '00000000-0000-0000-0000-000000000000', $2,
          crypt($3, gen_salt('bf')), NOW(),
          '{"provider":"email","providers":["email"]}',
          '{"full_name":"Professor Sharma","username":"teacher","role":"teacher"}',
          NOW(), NOW(), 'authenticated', 'authenticated'
        );
      `, [teacherId, teacherEmail, teacherPassword]);
    }

    await client.query(`
      INSERT INTO profiles (id, username, full_name, role)
      VALUES ($1, 'teacher', 'Professor Sharma', 'teacher')
      ON CONFLICT (id) DO UPDATE SET
        role = 'teacher',
        username = 'teacher',
        full_name = 'Professor Sharma';
    `, [teacherId]);

    console.log('Demo Teacher account ready! Username: teacher, Password: teacher123');

  } catch (err) {
    console.error('Error creating admin/teacher:', err);
  } finally {
    await client.end();
  }
}

createAdmin();
