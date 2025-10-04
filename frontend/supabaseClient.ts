import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

// Debug sementara untuk memastikan env terbaca
console.log("Supabase URL:", supabaseUrl);
console.log("Supabase Key (first 6 chars):", supabaseAnonKey?.slice(0, 6));

export const supabase = createClient(supabaseUrl, supabaseAnonKey);