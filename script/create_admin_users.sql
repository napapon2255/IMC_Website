-- ============================================
-- Create Admin Users Table
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Disable RLS for admin_users (server uses service role key)
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Step 3: Insert initial admin users
INSERT INTO admin_users (email, name) VALUES
    ('admin@imc.co.th', 'Admin IMC'),
    ('imcmetrologyengineers@gmail.com', 'IMC Metrology Engineers')
ON CONFLICT (email) DO NOTHING;

-- Step 4: Verify data
SELECT * FROM admin_users;

-- ============================================
-- To add more admins, just INSERT:
-- INSERT INTO admin_users (email, name) VALUES ('newemail@example.com', 'New Admin');
-- ============================================
