import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm'

// This file is responsible for initializing the Supabase client.
const SUPABASE_URL = 'https://xlaadoethfvzdqvbztrl.supabase.co'; // <-- REPLACE THIS with your actual Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhsYWFkb2V0aGZ2emRxdmJ6dHJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTEwOTUsImV4cCI6MjA1NjcyNzA5NX0.7uojIqXWnND-fvQ-BQpgHR8GgdtMU5_E-XJvHXhIYVs'; // <-- REPLACE THIS with your actual Supabase Anon Key

let supabaseInstance;

// Check if the Supabase JS library is loaded
if (!SUPABASE_URL || SUPABASE_URL === 'YOUR_SUPABASE_URL_FROM_ENV') {
    console.error("Supabase URL is not configured in auth.js. Please replace 'YOUR_SUPABASE_URL_FROM_ENV' with your actual URL.");
} else if (!SUPABASE_ANON_KEY || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_FROM_ENV') {
    console.error("Supabase Anon Key is not configured in auth.js. Please replace 'YOUR_SUPABASE_ANON_KEY_FROM_ENV' with your actual key.");
} else {
    // Initialize the Supabase client
    supabaseInstance = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log("Supabase client initialized in auth.js");
}

// Export the initialized client (it will be undefined if initialization failed)
export const supabase = supabaseInstance;
