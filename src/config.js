// SmartPrep Configuration
// Uses environment variables with safe fallback for both Vite (Browser) and Node.js (Testing)

const env = (typeof import.meta !== 'undefined' && import.meta.env) ? import.meta.env : {};

export const SUPABASE_URL = env.VITE_SUPABASE_URL || 'https://uvqbwsyrxdsgrmzrzpdm.supabase.co';
export const SUPABASE_ANON_KEY = env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_bTbBeoNv63UxqZ8jalHCeA_2gxKgylg';
export const GEMINI_API_KEY = env.VITE_GEMINI_API_KEY || '';
export const GEMINI_MODEL = env.VITE_GEMINI_MODEL || 'gemini-2.5-flash';
export const APP_NAME = 'SmartPrep';
