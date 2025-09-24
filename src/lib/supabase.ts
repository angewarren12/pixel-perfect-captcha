import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://enhgdrtnzophdjxyvznt.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuaGdkcnRuem9waGRqeHl2em50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MjY2NTEsImV4cCI6MjA3NDMwMjY1MX0.RRM1Xwu-wIg65MILxm1aZCo5B-sAAodflgEelQuqPKs'

export const supabase = createClient(supabaseUrl, supabaseKey)
