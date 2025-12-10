import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ROLE_KEY;

let supabase: SupabaseClient;

if (supabaseUrl && supabaseKey) {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase connected');
} else {
    console.warn('⚠️ Supabase credentials not found in .env');
    // Create a dummy client
    supabase = createClient('https://placeholder.supabase.co', 'placeholder');
}

export { supabase };

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
