-- ============================================================
-- SmartPrep — Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  roll_number TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  icon TEXT,
  color TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Subcategories
CREATE TABLE IF NOT EXISTS subcategories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Topics
CREATE TABLE IF NOT EXISTS topics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  subcategory_id UUID REFERENCES subcategories(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  question_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Questions
CREATE TABLE IF NOT EXISTS questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE NOT NULL,
  question_number INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_option TEXT NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. User Progress
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  selected_option TEXT NOT NULL CHECK (selected_option IN ('A', 'B', 'C', 'D')),
  is_correct BOOLEAN NOT NULL,
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- 8. Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  target_type TEXT NOT NULL DEFAULT 'all' CHECK (target_type IN ('all', 'specific')),
  target_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security (RLS) Policies
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE subcategories ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to allow re-runs
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Admin can update any profile" ON profiles;
DROP POLICY IF EXISTS "Admin can delete any profile" ON profiles;

CREATE POLICY "Profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Admin can update any profile" ON profiles FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "Admin can delete any profile" ON profiles FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Categories, Subcategories, Topics
DROP POLICY IF EXISTS "Categories are viewable by everyone" ON categories;
DROP POLICY IF EXISTS "Subcategories are viewable by everyone" ON subcategories;
DROP POLICY IF EXISTS "Topics are viewable by everyone" ON topics;
DROP POLICY IF EXISTS "Teachers can manage categories" ON categories;
DROP POLICY IF EXISTS "Teachers can manage subcategories" ON subcategories;
DROP POLICY IF EXISTS "Teachers can manage topics" ON topics;

CREATE POLICY "Categories are viewable by everyone" ON categories FOR SELECT USING (true);
CREATE POLICY "Subcategories are viewable by everyone" ON subcategories FOR SELECT USING (true);
CREATE POLICY "Topics are viewable by everyone" ON topics FOR SELECT USING (true);

CREATE POLICY "Teachers can manage categories" ON categories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);
CREATE POLICY "Teachers can manage subcategories" ON subcategories FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);
CREATE POLICY "Teachers can manage topics" ON topics FOR ALL USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);

-- Questions
DROP POLICY IF EXISTS "Questions are viewable by everyone" ON questions;
DROP POLICY IF EXISTS "Teachers can insert questions" ON questions;
DROP POLICY IF EXISTS "Teachers can update questions" ON questions;
DROP POLICY IF EXISTS "Teachers can delete questions" ON questions;

CREATE POLICY "Questions are viewable by everyone" ON questions FOR SELECT USING (true);
CREATE POLICY "Teachers can insert questions" ON questions FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);
CREATE POLICY "Teachers can update questions" ON questions FOR UPDATE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);
CREATE POLICY "Teachers can delete questions" ON questions FOR DELETE USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);

-- User Progress
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can insert own progress" ON user_progress;
DROP POLICY IF EXISTS "Users can update own progress" ON user_progress;
DROP POLICY IF EXISTS "Teachers can view all progress" ON user_progress;

CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Teachers can view all progress" ON user_progress FOR SELECT USING (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);

-- Notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
DROP POLICY IF EXISTS "Users can update own notifications (mark read)" ON notifications;
DROP POLICY IF EXISTS "Teachers can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Teachers can view sent notifications" ON notifications;
DROP POLICY IF EXISTS "Teachers can delete notifications" ON notifications;

CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (
  target_type = 'all' OR target_user_id = auth.uid() OR sender_id = auth.uid()
);
CREATE POLICY "Users can update own notifications (mark read)" ON notifications FOR UPDATE USING (
  target_user_id = auth.uid() OR target_type = 'all'
);
CREATE POLICY "Teachers can insert notifications" ON notifications FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin'))
);
CREATE POLICY "Teachers can view sent notifications" ON notifications FOR SELECT USING (sender_id = auth.uid());
CREATE POLICY "Teachers can delete notifications" ON notifications FOR DELETE USING (
  sender_id = auth.uid() OR
  EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- ============================================================
-- Functions & Triggers
-- ============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name, roll_number, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.raw_user_meta_data->>'roll_number',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    full_name = EXCLUDED.full_name,
    roll_number = EXCLUDED.roll_number;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- RPC for admin password reset
CREATE OR REPLACE FUNCTION admin_update_user_password(target_user_id UUID, new_password TEXT)
RETURNS VOID AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Only admins can change user passwords';
  END IF;

  UPDATE auth.users 
  SET encrypted_password = crypt(new_password, gen_salt('bf'))
  WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC for admin delete user
CREATE OR REPLACE FUNCTION admin_delete_user(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Only admins can delete users';
  END IF;

  DELETE FROM auth.users WHERE id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RPC for admin create user (teacher)
CREATE OR REPLACE FUNCTION admin_create_user(
  user_email TEXT,
  user_password TEXT,
  user_full_name TEXT,
  user_username TEXT,
  user_roll_number TEXT,
  user_role TEXT DEFAULT 'teacher'
)
RETURNS JSON AS $$
DECLARE
  new_user_id UUID;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RAISE EXCEPTION 'Only admins can create teacher accounts';
  END IF;

  new_user_id := uuid_generate_v4();

  INSERT INTO auth.users (
    id,
    instance_id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    role,
    aud
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    user_email,
    crypt(user_password, gen_salt('bf')),
    NOW(),
    '{"provider":"email","providers":["email"]}',
    json_build_object(
      'full_name', user_full_name,
      'username', user_username,
      'roll_number', user_roll_number,
      'role', user_role
    ),
    NOW(),
    NOW(),
    'authenticated',
    'authenticated'
  );

  INSERT INTO profiles (id, username, full_name, roll_number, role)
  VALUES (new_user_id, user_username, user_full_name, user_roll_number, user_role)
  ON CONFLICT (id) DO UPDATE SET
    username = EXCLUDED.username,
    full_name = EXCLUDED.full_name,
    role = EXCLUDED.role;

  RETURN json_build_object('id', new_user_id, 'username', user_username);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- Seed Data: Categories
-- ============================================================

INSERT INTO categories (name, slug, icon, color, sort_order) VALUES
  ('General Aptitude', 'general-aptitude', 'mdi-chart-donut-variant', '#2a9d8f', 1),
  ('Verbal & Reasoning', 'verbal-reasoning', 'mdi-checkbox-marked-circle-outline', '#e76f51', 2),
  ('Current Affairs & GK', 'current-affairs-gk', 'mdi-earth', '#264653', 3),
  ('Interview', 'interview', 'mdi-account-supervisor', '#f4a261', 4),
  ('Engineering', 'engineering', 'mdi-cogs', '#6c5ce7', 5),
  ('Programming', 'programming', 'mdi-code-braces', '#00b894', 6),
  ('Online Tests', 'online-tests', 'mdi-clipboard-list', '#0984e3', 7),
  ('Technical MCQs', 'technical-mcqs', 'mdi-code-braces-box', '#fd79a8', 8),
  ('Medical Science', 'medical-science', 'mdi-dna', '#e17055', 9),
  ('Puzzles', 'puzzles', 'mdi-puzzle', '#a29bfe', 10)
ON CONFLICT (slug) DO NOTHING;

-- Subcategories
INSERT INTO subcategories (category_id, name, slug, sort_order) VALUES
  ((SELECT id FROM categories WHERE slug = 'general-aptitude'), 'Arithmetic Aptitude', 'arithmetic-aptitude', 1),
  ((SELECT id FROM categories WHERE slug = 'general-aptitude'), 'Data Interpretation', 'data-interpretation', 2),
  ((SELECT id FROM categories WHERE slug = 'verbal-reasoning'), 'Verbal Ability', 'verbal-ability', 1),
  ((SELECT id FROM categories WHERE slug = 'verbal-reasoning'), 'Logical Reasoning', 'logical-reasoning', 2),
  ((SELECT id FROM categories WHERE slug = 'verbal-reasoning'), 'Verbal Reasoning', 'verbal-reasoning-sub', 3),
  ((SELECT id FROM categories WHERE slug = 'verbal-reasoning'), 'Nonverbal Reasoning', 'nonverbal-reasoning', 4),
  ((SELECT id FROM categories WHERE slug = 'current-affairs-gk'), 'Current Affairs', 'current-affairs', 1),
  ((SELECT id FROM categories WHERE slug = 'current-affairs-gk'), 'Basic General Knowledge', 'basic-gk', 2),
  ((SELECT id FROM categories WHERE slug = 'current-affairs-gk'), 'General Science', 'general-science', 3),
  ((SELECT id FROM categories WHERE slug = 'interview'), 'Placement Papers', 'placement-papers', 1),
  ((SELECT id FROM categories WHERE slug = 'interview'), 'Group Discussion', 'group-discussion', 2),
  ((SELECT id FROM categories WHERE slug = 'interview'), 'HR Interview', 'hr-interview', 3),
  ((SELECT id FROM categories WHERE slug = 'engineering'), 'Mechanical Engineering', 'mechanical-engineering', 1),
  ((SELECT id FROM categories WHERE slug = 'engineering'), 'Civil Engineering', 'civil-engineering', 2),
  ((SELECT id FROM categories WHERE slug = 'engineering'), 'ECE', 'ece', 3),
  ((SELECT id FROM categories WHERE slug = 'engineering'), 'EEE', 'eee', 4),
  ((SELECT id FROM categories WHERE slug = 'engineering'), 'CSE', 'cse', 5),
  ((SELECT id FROM categories WHERE slug = 'programming'), 'C Programming', 'c-programming', 1),
  ((SELECT id FROM categories WHERE slug = 'programming'), 'C++ Programming', 'cpp-programming', 2),
  ((SELECT id FROM categories WHERE slug = 'programming'), 'C# Programming', 'csharp-programming', 3),
  ((SELECT id FROM categories WHERE slug = 'programming'), 'Java Programming', 'java-programming', 4),
  ((SELECT id FROM categories WHERE slug = 'online-tests'), 'Aptitude Test', 'aptitude-test', 1),
  ((SELECT id FROM categories WHERE slug = 'online-tests'), 'Verbal Ability Test', 'verbal-ability-test', 2),
  ((SELECT id FROM categories WHERE slug = 'online-tests'), 'Logical Reasoning Test', 'logical-reasoning-test', 3),
  ((SELECT id FROM categories WHERE slug = 'technical-mcqs'), 'Networking', 'networking', 1),
  ((SELECT id FROM categories WHERE slug = 'technical-mcqs'), 'Database', 'database', 2),
  ((SELECT id FROM categories WHERE slug = 'technical-mcqs'), 'Basic Electronics', 'basic-electronics', 3),
  ((SELECT id FROM categories WHERE slug = 'technical-mcqs'), 'Digital Electronics', 'digital-electronics', 4),
  ((SELECT id FROM categories WHERE slug = 'medical-science'), 'Microbiology', 'microbiology', 1),
  ((SELECT id FROM categories WHERE slug = 'medical-science'), 'Biochemistry', 'biochemistry', 2),
  ((SELECT id FROM categories WHERE slug = 'medical-science'), 'Biotechnology', 'biotechnology', 3),
  ((SELECT id FROM categories WHERE slug = 'puzzles'), 'Sudoku', 'sudoku', 1),
  ((SELECT id FROM categories WHERE slug = 'puzzles'), 'Number Puzzles', 'number-puzzles', 2),
  ((SELECT id FROM categories WHERE slug = 'puzzles'), 'Logical Puzzles', 'logical-puzzles', 3)
ON CONFLICT (slug) DO NOTHING;

-- Topics for Arithmetic Aptitude (all 35)
INSERT INTO topics (subcategory_id, name, slug, sort_order) VALUES
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Problems on Trains', 'problems-on-trains', 1),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Time and Work', 'time-and-work', 2),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Time and Distance', 'time-and-distance', 3),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Height and Distance', 'height-and-distance', 4),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Simple Interest', 'simple-interest', 5),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Compound Interest', 'compound-interest', 6),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Profit and Loss', 'profit-and-loss', 7),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Partnership', 'partnership', 8),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Percentage', 'percentage', 9),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Problems on Ages', 'problems-on-ages', 10),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Calendar', 'calendar', 11),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Clock', 'clock', 12),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Average', 'average', 13),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Area', 'area', 14),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Volume and Surface Area', 'volume-and-surface-area', 15),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Permutation and Combination', 'permutation-and-combination', 16),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Numbers', 'numbers', 17),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Problems on Numbers', 'problems-on-numbers', 18),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'HCF and LCM', 'hcf-and-lcm', 19),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Decimal Fraction', 'decimal-fraction', 20),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Simplification', 'simplification', 21),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Square Root and Cube Root', 'square-root-and-cube-root', 22),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Surds and Indices', 'surds-and-indices', 23),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Ratio and Proportion', 'ratio-and-proportion', 24),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Chain Rule', 'chain-rule', 25),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Pipes and Cistern', 'pipes-and-cistern', 26),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Boats and Streams', 'boats-and-streams', 27),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Alligation or Mixture', 'alligation-or-mixture', 28),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Logarithm', 'logarithm', 29),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Races and Games', 'races-and-games', 30),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Stocks and Shares', 'stocks-and-shares', 31),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Probability', 'probability', 32),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'True Discount', 'true-discount', 33),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Bankers Discount', 'bankers-discount', 34),
  ((SELECT id FROM subcategories WHERE slug = 'arithmetic-aptitude'), 'Odd Man Out and Series', 'odd-man-out-and-series', 35)
ON CONFLICT (slug) DO NOTHING;

-- Topics for other subcategories
INSERT INTO topics (subcategory_id, name, slug, sort_order) VALUES
  ((SELECT id FROM subcategories WHERE slug = 'data-interpretation'), 'Table Charts', 'table-charts', 1),
  ((SELECT id FROM subcategories WHERE slug = 'data-interpretation'), 'Pie Charts', 'pie-charts', 2),
  ((SELECT id FROM subcategories WHERE slug = 'data-interpretation'), 'Bar Charts', 'bar-charts', 3),
  ((SELECT id FROM subcategories WHERE slug = 'data-interpretation'), 'Line Charts', 'line-charts', 4),
  ((SELECT id FROM subcategories WHERE slug = 'verbal-ability'), 'Spotting Errors', 'spotting-errors', 1),
  ((SELECT id FROM subcategories WHERE slug = 'verbal-ability'), 'Synonyms', 'synonyms', 2),
  ((SELECT id FROM subcategories WHERE slug = 'verbal-ability'), 'Antonyms', 'antonyms', 3),
  ((SELECT id FROM subcategories WHERE slug = 'verbal-ability'), 'Sentence Completion', 'sentence-completion', 4),
  ((SELECT id FROM subcategories WHERE slug = 'logical-reasoning'), 'Number Series', 'number-series', 1),
  ((SELECT id FROM subcategories WHERE slug = 'logical-reasoning'), 'Analogies', 'analogies', 2),
  ((SELECT id FROM subcategories WHERE slug = 'logical-reasoning'), 'Blood Relations', 'blood-relations', 3),
  ((SELECT id FROM subcategories WHERE slug = 'logical-reasoning'), 'Coding-Decoding', 'coding-decoding', 4),
  ((SELECT id FROM subcategories WHERE slug = 'c-programming'), 'C Basics', 'c-programming-basics', 1),
  ((SELECT id FROM subcategories WHERE slug = 'c-programming'), 'Pointers', 'c-pointers', 2),
  ((SELECT id FROM subcategories WHERE slug = 'c-programming'), 'Arrays', 'c-arrays', 3),
  ((SELECT id FROM subcategories WHERE slug = 'networking'), 'OSI Model', 'osi-model', 1),
  ((SELECT id FROM subcategories WHERE slug = 'networking'), 'TCP/IP', 'tcp-ip', 2),
  ((SELECT id FROM subcategories WHERE slug = 'database'), 'SQL Basics', 'sql-basics', 1),
  ((SELECT id FROM subcategories WHERE slug = 'database'), 'Normalization', 'normalization', 2)
ON CONFLICT (slug) DO NOTHING;
