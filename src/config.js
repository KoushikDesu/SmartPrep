// SmartPrep Configuration
// Uses environment variables with fallbacks

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://uvqbwsyrxdsgrmzrzpdm.supabase.co';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_bTbBeoNv63UxqZ8jalHCeA_2gxKgylg';
export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
export const GEMINI_MODEL = import.meta.env.VITE_GEMINI_MODEL || 'gemini-2.0-flash';
export const APP_NAME = 'SmartPrep';
