import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://pnorvxmagvucopoxcshn.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBub3J2eG1hZ3Z1Y29wb3hjc2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwNzQ5MTYsImV4cCI6MjA3MjY1MDkxNn0.kDexMlW5XEQ9B9Xo619HtfUEEmOMEy9wRCxFen5EgA0"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)