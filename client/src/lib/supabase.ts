import { createClient } from '@supabase/supabase-js'

// JSON Data Imports
import brandsJson from '@/data/brands.json';
import brandProductsJson from '@/data/brand_products.json';

const supabaseUrl = 'https://edoacebqsbisjfqqeshn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkb2FjZWJxc2Jpc2pmcXFlc2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNDA1NDgsImV4cCI6MjA4MDkxNjU0OH0.wCXrfUjN1TukoF3AxuaV6GcpqmKHIm22pGRjvepK4ZU'

export const supabase = createClient(supabaseUrl, supabaseKey);

// Toggle: use JSON or Database (via Server API)
export const USE_JSON_DATA = false;

// Types
export interface Brand {
    id: string;
    name: string;
    logo: string | null;
    cover_image: string | null;
    description_th: string | null;
    description_en: string | null;
    created_at?: string;
}

export interface Category {
    id: number;
    brand_id: string;
    title_en: string;
    title_th: string | null;
    items_en: string | null;
    items_th: string | null;
}

export interface UploadedImage {
    id: number;
    url: string;
    alt_text: string | null;
    page: string | null;
    created_at?: string;
}

// Product Types
export interface Product {
    id: number;
    brand_id?: string;
    category_id: number;
    name_en: string;
    name_th: string | null;
    description_en: string | null;
    description_th: string | null;
    image: string | null;
    price: string | null;
    created_at?: string;
}

// ============================================
// API Functions - Use Server API for security
// Server uses service role key (hidden from client)
// ============================================

// ---------- BRANDS ----------
export async function getBrands(): Promise<Brand[]> {
    if (USE_JSON_DATA) {
        return brandsJson as Brand[];
    }
    const res = await fetch('/api/brands');
    if (!res.ok) throw new Error('Failed to fetch brands');
    return res.json();
}

export async function getBrand(id: string): Promise<Brand | null> {
    if (USE_JSON_DATA) {
        return (brandsJson as Brand[]).find(b => b.id === id) || null;
    }
    const res = await fetch(`/api/brands/${id}`);
    if (!res.ok) return null;
    return res.json();
}

export async function createBrand(brand: Partial<Brand>): Promise<Brand> {
    const res = await fetch('/api/brands', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(brand)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create brand');
    }
    return res.json();
}

export async function updateBrand(id: string, updates: Partial<Brand>): Promise<Brand> {
    const res = await fetch(`/api/brands/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update brand');
    }
    return res.json();
}

export async function deleteBrand(id: string): Promise<void> {
    const res = await fetch(`/api/brands/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete brand');
    }
}

// ---------- CATEGORIES ----------
export async function getCategoriesByBrand(brandId: string): Promise<Category[]> {
    if (USE_JSON_DATA) {
        const brandData = (brandProductsJson as any)[brandId];
        if (!brandData) return [];
        return brandData.categories.map((cat: any, index: number) => ({
            id: index + 1,
            brand_id: brandId,
            title_en: cat.title_en,
            title_th: cat.title_th,
            items_en: cat.items_en,
            items_th: cat.items_th
        }));
    }
    const res = await fetch(`/api/brands/${brandId}/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
}

export async function createCategory(category: Partial<Category>): Promise<Category> {
    const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create category');
    }
    return res.json();
}

export async function updateCategory(id: number, updates: Partial<Category>): Promise<Category> {
    const res = await fetch(`/api/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update category');
    }
    return res.json();
}

export async function deleteCategory(id: number): Promise<void> {
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete category');
    }
}

// ---------- PRODUCTS ----------
export async function getProducts(): Promise<Product[]> {
    if (USE_JSON_DATA) {
        const res = await fetch('/api/json/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    }
    const res = await fetch('/api/products');
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}

export async function getProductsByBrand(brandId: string): Promise<Product[]> {
    if (USE_JSON_DATA) {
        const allProducts = await getProducts();
        return allProducts.filter(p => p.brand_id === brandId);
    }
    // Server doesn't have this endpoint, so get all and filter
    const allProducts = await getProducts();
    return allProducts.filter(p => p.brand_id === brandId);
}

export async function getProductsByCategory(categoryId: number, brandId?: string): Promise<Product[]> {
    if (USE_JSON_DATA) {
        let products = await getProducts();
        if (brandId) {
            products = products.filter(p => p.brand_id === brandId);
        }
        return products.filter(p => p.category_id === categoryId);
    }
    const res = await fetch(`/api/categories/${categoryId}/products`);
    if (!res.ok) throw new Error('Failed to fetch products');
    let products: Product[] = await res.json();

    // Also filter by brand_id if provided
    if (brandId) {
        products = products.filter(p => p.brand_id === brandId);
    }
    return products;
}

export async function createProduct(product: Partial<Product>): Promise<Product> {
    if (USE_JSON_DATA) {
        const res = await fetch('/api/json/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        });
        if (!res.ok) throw new Error('Failed to create product');
        return res.json();
    }
    const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to create product');
    }
    return res.json();
}

export async function updateProduct(id: number, updates: Partial<Product>): Promise<Product> {
    if (USE_JSON_DATA) {
        const res = await fetch(`/api/json/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates)
        });
        if (!res.ok) throw new Error('Failed to update product');
        return res.json();
    }
    const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to update product');
    }
    return res.json();
}

export async function deleteProduct(id: number): Promise<void> {
    if (USE_JSON_DATA) {
        const res = await fetch(`/api/json/products/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error('Failed to delete product');
        return;
    }
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to delete product');
    }
}
