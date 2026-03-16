-- ============================================================
-- Supabase Schema for Portfolio CMS
-- Jalankan SQL ini di Supabase SQL Editor:
-- https://upftnqljvhdpflgczyto.supabase.co → SQL Editor → New Query
-- ============================================================

-- User Profile (replaces Firestore userProfile/general)
CREATE TABLE user_profile (
  id TEXT PRIMARY KEY DEFAULT 'general',
  name TEXT,
  job_title TEXT,
  photo_url TEXT,
  socials JSONB DEFAULT '{}'
);

-- User Description (replaces Firestore userProfile/description)
CREATE TABLE user_description (
  id TEXT PRIMARY KEY DEFAULT 'description',
  name TEXT,
  description JSONB DEFAULT '{}'
);

-- Skills (replaces Firestore userProfile/skills → items array)
CREATE TABLE user_skills (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icons TEXT NOT NULL
);

-- Career (replaces Firestore userProfile/carrer → items array)
CREATE TABLE user_career (
  id TEXT PRIMARY KEY,
  logo TEXT,
  company TEXT NOT NULL,
  position JSONB NOT NULL,
  location TEXT NOT NULL,
  start_month INT NOT NULL,
  start_year INT NOT NULL,
  end_month INT,
  end_year INT,
  description JSONB,
  gallery TEXT[] DEFAULT '{}'
);

-- Achievements (replaces Firestore userProfile/achivement → items array)
CREATE TABLE user_achievements (
  id TEXT PRIMARY KEY,
  title JSONB NOT NULL,
  organization TEXT NOT NULL,
  location TEXT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  category JSONB NOT NULL,
  logo TEXT,
  gallery TEXT[] DEFAULT '{}'
);

-- CV (replaces Firestore userProfile/cv → items array)
CREATE TABLE user_cv (
  id TEXT PRIMARY KEY,
  language TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL
);

-- Projects (replaces Firestore userProfile/projects → items array)
CREATE TABLE user_projects (
  id TEXT PRIMARY KEY,
  title JSONB NOT NULL,
  description JSONB NOT NULL,
  image TEXT,
  month INT NOT NULL,
  year INT NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT
);

-- Certificates (replaces Firestore userProfile/certificates → items array)
CREATE TABLE user_certificates (
  id TEXT PRIMARY KEY,
  name JSONB NOT NULL,
  issuer TEXT NOT NULL,
  month INT NOT NULL,
  year INT NOT NULL,
  image TEXT,
  credential_url TEXT
);

-- Contacts (replaces Firestore contacts collection)
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- Storage Buckets
-- ============================================================
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('cvs', 'cvs', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('projects', 'projects', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('certificates', 'certificates', true);

-- ============================================================
-- Storage Policies (public read, allow all uploads)
-- ============================================================
CREATE POLICY "Public Read" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Allow Upload" ON storage.objects FOR INSERT WITH CHECK (true);

-- ============================================================
-- Row Level Security (RLS) - Disable for CMS (no auth)
-- ============================================================
ALTER TABLE user_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_description ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_career ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_cv ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow all operations (since CMS has its own cookie-based auth)
CREATE POLICY "Allow all" ON user_profile FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON user_description FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON user_skills FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON user_career FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON user_achievements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON user_cv FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON user_projects FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON user_certificates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all" ON contacts FOR ALL USING (true) WITH CHECK (true);
