// auth.js
// This script initializes the Supabase client.
// It assumes the Supabase JS library is included via CDN in your HTML,
// making `supabaseJs` globally available.
// For this script to work as an ES6 module (imported by assets/script.js),
// ensure your <script> tag for auth.js in index.html has type="module".

// --- Supabase Configuration ---
// IMPORTANT:
// Replace the placeholder values below with your actual Supabase Project URL and Anon Key.
// In a typical development workflow with a build system, these would be sourced
// from a .env file and injected during the build process.
// For this static HTML/CSS/JS setup, you need to manually set them here.

const SUPABASE_URL = 'YOUR_SUPABASE_URL_FROM_ENV'; // <-- REPLACE THIS with your actual Supabase URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_FROM_ENV'; // <-- REPLACE THIS with your actual Supabase Anon Key

let supabaseInstance;

// Check if the Supabase JS library is loaded
if (typeof supabaseJs === 'undefined' || typeof supabaseJs.createClient !== 'function') {
    console.error("Supabase JS library (supabaseJs) not found or createClient is not a function. Make sure it's included in your HTML before this script and auth.js.");
} else if (!SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_URL_FROM_ENV') {
    console.error("Supabase URL is not configured in auth.js. Please replace 'YOUR_SUPABASE_URL_FROM_ENV' with your actual URL.");
} else if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_FROM_ENV') {
    console.error("Supabase Anon Key is not configured in auth.js. Please replace 'YOUR_SUPABASE_ANON_KEY_FROM_ENV' with your actual key.");
} else {
    // Initialize the Supabase client
    supabaseInstance = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase client initialized in auth.js");
}

// Export the initialized client (it will be undefined if initialization failed)
export const supabase = supabaseInstance;
