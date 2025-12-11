-- ============================================
-- SQL Script: Debug & Check Data
-- Run this in Supabase SQL Editor to check data
-- ============================================

-- 1. Check all categories with their IDs
SELECT id, brand_id, title_en FROM categories ORDER BY brand_id, id;

-- 2. Check all products with their category_id
SELECT id, brand_id, category_id, name_en FROM products ORDER BY brand_id, category_id;

-- 3. Check if products have matching categories
SELECT 
    p.id as product_id,
    p.name_en as product_name,
    p.category_id,
    c.id as cat_id,
    c.title_en as category_name,
    c.brand_id
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
ORDER BY p.brand_id, p.category_id;

-- 4. Find products with no matching category
SELECT * FROM products 
WHERE category_id NOT IN (SELECT id FROM categories);

-- 5. Count products per category
SELECT 
    c.id,
    c.brand_id,
    c.title_en,
    COUNT(p.id) as product_count
FROM categories c
LEFT JOIN products p ON c.id = p.category_id
GROUP BY c.id, c.brand_id, c.title_en
ORDER BY c.brand_id, c.id;
