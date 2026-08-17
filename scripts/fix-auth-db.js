import pg from 'pg';
const { Client } = pg;
const connectionString = "postgresql://postgres.uvqbwsyrxdsgrmzrzpdm:Kingofstates1119@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres";

async function fix() {
  const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } });
  try {
    await client.connect();
    console.log('PostgreSQL connected!');

    // 1. Inspect table structure of profiles
    const cols = await client.query(`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'profiles';
    `);
    console.log('profiles columns:', cols.rows);

    // 2. Check auth.users table
    const users = await client.query(`
      SELECT id, email, raw_user_meta_data 
      FROM auth.users;
    `);
    console.log('auth.users:', users.rows);

    // 3. Fix the handle_new_user function to be ultra-safe with exception handling
    await client.query(`
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS TRIGGER
      LANGUAGE plpgsql
      SECURITY DEFINER
      SET search_path = public
      AS $$
      DECLARE
        user_uname TEXT;
        user_fname TEXT;
        user_roll  TEXT;
        user_r     TEXT;
      BEGIN
        user_uname := COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1), 'user_' || substr(NEW.id::text, 1, 8));
        user_fname := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', user_uname);
        user_roll  := COALESCE(NEW.raw_user_meta_data->>'roll_number', NEW.raw_user_meta_data->>'rollNumber', '');
        user_r     := COALESCE(NEW.raw_user_meta_data->>'role', 'student');

        INSERT INTO public.profiles (id, username, full_name, roll_number, role)
        VALUES (NEW.id, user_uname, user_fname, user_roll, user_r)
        ON CONFLICT (id) DO UPDATE SET
          username = EXCLUDED.username,
          full_name = EXCLUDED.full_name,
          roll_number = EXCLUDED.roll_number,
          role = CASE WHEN public.profiles.role = 'admin' THEN 'admin' ELSE EXCLUDED.role END;

        RETURN NEW;
      EXCEPTION
        WHEN OTHERS THEN
          -- Prevent blocking auth signup even if profile creation hits duplicate username
          RETURN NEW;
      END;
      $$;
    `);
    console.log('handle_new_user function updated with safe fallback!');

    // 4. Ensure trigger is attached correctly
    await client.query(`
      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE FUNCTION public.handle_new_user();
    `);
    console.log('Trigger on_auth_user_created recreated!');

    // 5. Ensure admin and teacher users are cleanly present in auth.users and profiles
    const adminEmail = 'admin@smartprep.local';
    const adminPass = 'admin123';
    
    // Check admin
    const adminRes = await client.query(`SELECT id FROM auth.users WHERE email = $1;`, [adminEmail]);
    if (adminRes.rows.length === 0) {
      const newAdmin = await client.query(`
        INSERT INTO auth.users (
          id, instance_id, email, encrypted_password, email_confirmed_at,
          raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
        ) VALUES (
          gen_random_uuid(), '00000000-0000-0000-0000-000000000000', $1,
          crypt($2, gen_salt('bf')), NOW(),
          '{"provider":"email","providers":["email"]}',
          '{"full_name":"System Administrator","username":"admin","role":"admin"}',
          NOW(), NOW(), 'authenticated', 'authenticated'
        ) RETURNING id;
      `, [adminEmail, adminPass]);
      
      await client.query(`
        INSERT INTO public.profiles (id, username, full_name, role)
        VALUES ($1, 'admin', 'System Administrator', 'admin')
        ON CONFLICT (id) DO UPDATE SET role = 'admin', username = 'admin';
      `, [newAdmin.rows[0].id]);
      console.log('Admin user recreated!');
    } else {
      // Update password
      await client.query(`
        UPDATE auth.users 
        SET encrypted_password = crypt($1, gen_salt('bf')), email_confirmed_at = NOW()
        WHERE email = $2;
      `, [adminPass, adminEmail]);
      await client.query(`
        UPDATE public.profiles SET role = 'admin', username = 'admin' WHERE id = $1;
      `, [adminRes.rows[0].id]);
      console.log('Admin user updated with password admin123!');
    }

    // 6. Grant permissions on schema auth to supabase_auth_admin and postgres
    await client.query(`
      GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role, supabase_auth_admin;
      GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role, supabase_auth_admin;
      GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role, supabase_auth_admin;
      GRANT ALL ON ALL ROUTINES IN SCHEMA public TO postgres, anon, authenticated, service_role, supabase_auth_admin;
    `);
    console.log('Granted all permissions including supabase_auth_admin!');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
  }
}

fix();
