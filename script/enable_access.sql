-- ============================================
-- SQL Script: Enable Public Access for Admin
-- Run this in Supabase SQL Editor
-- ============================================

-- Option 1: Disable RLS (for development/testing - NOT recommended for production)
-- This allows all operations without authentication

ALTER TABLE brands DISABLE ROW LEVEL SECURITY;
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE images DISABLE ROW LEVEL SECURITY;

-- ============================================
-- OR Option 2: Enable RLS with public policies (RECOMMENDED)
-- Uncomment below if you want to use RLS with public access
-- ============================================

/*
-- Enable RLS
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Brands policies
CREATE POLICY "Allow public read on brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow public insert on brands" ON brands FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on brands" ON brands FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on brands" ON brands FOR DELETE USING (true);

-- Categories policies
CREATE POLICY "Allow public read on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public insert on categories" ON categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on categories" ON categories FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on categories" ON categories FOR DELETE USING (true);

-- Products policies
CREATE POLICY "Allow public read on products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert on products" ON products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on products" ON products FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on products" ON products FOR DELETE USING (true);

-- Images policies
CREATE POLICY "Allow public read on images" ON images FOR SELECT USING (true);
CREATE POLICY "Allow public insert on images" ON images FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on images" ON images FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow public delete on images" ON images FOR DELETE USING (true);
*/

-- ============================================
-- Verify tables exist
-- ============================================

SELECT table_name, 
       (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public' 
  AND table_name IN ('brands', 'categories', 'products', 'images');
