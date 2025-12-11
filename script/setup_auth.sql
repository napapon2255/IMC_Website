-- ============================================
-- Supabase Authentication Setup
-- Run this in Supabase SQL Editor
-- ============================================

-- NOTE: Most Auth settings are configured in Supabase Dashboard
-- Go to: Authentication > Settings

-- ============================================
-- STEP 1: Create Admin User
-- ============================================

-- Option 1: Via Supabase Dashboard (RECOMMENDED)
-- 1. Go to Authentication > Users
-- 2. Click "Add User"
-- 3. Enter email and password
-- 4. Click "Create User"

-- Option 2: Via SQL (if you have service role access)
-- This creates a user directly in auth.users table
-- Note: Password should be hashed - this is just for reference

/*
-- Create admin user (you need to do this via Dashboard or API)
-- Email: admin@imc.co.th
-- Password: (set your secure password)
*/

-- ============================================
-- STEP 2: Create Admin Roles Table (Optional)
-- ============================================

-- Create a table to manage admin users
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can read admin_users
CREATE POLICY "Authenticated users can read admin_users" 
ON admin_users FOR SELECT 
TO authenticated 
USING (true);

-- ============================================
-- STEP 3: Insert Admin Users
-- ============================================

-- After creating user via Dashboard, insert them here
-- Replace with actual user IDs from auth.users

/*
INSERT INTO admin_users (id, email, role) VALUES
    ('your-user-uuid-here', 'admin@imc.co.th', 'admin'),
    ('another-uuid-here', 'imcmetrologyengineers@gmail.com', 'admin');
*/

-- ============================================
-- STEP 4: Create Function to Check Admin Status
-- ============================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM admin_users 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STEP 5: Update RLS Policies for Tables
-- ============================================

-- Allow everyone to read brands (public)
DROP POLICY IF EXISTS "Allow public read on brands" ON brands;
CREATE POLICY "Allow public read on brands" ON brands 
FOR SELECT USING (true);

-- Allow only admins to modify brands
DROP POLICY IF EXISTS "Allow admin write on brands" ON brands;
CREATE POLICY "Allow admin write on brands" ON brands 
FOR ALL TO authenticated 
USING (is_admin()) 
WITH CHECK (is_admin());

-- Same for categories
DROP POLICY IF EXISTS "Allow public read on categories" ON categories;
CREATE POLICY "Allow public read on categories" ON categories 
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin write on categories" ON categories;
CREATE POLICY "Allow admin write on categories" ON categories 
FOR ALL TO authenticated 
USING (is_admin()) 
WITH CHECK (is_admin());

-- Same for products
DROP POLICY IF EXISTS "Allow public read on products" ON products;
CREATE POLICY "Allow public read on products" ON products 
FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow admin write on products" ON products;
CREATE POLICY "Allow admin write on products" ON products 
FOR ALL TO authenticated 
USING (is_admin()) 
WITH CHECK (is_admin());

-- ============================================
-- VERIFICATION
-- ============================================

-- Check admin_users table
SELECT * FROM admin_users;

-- Check if function works (run as authenticated user)
-- SELECT is_admin();
