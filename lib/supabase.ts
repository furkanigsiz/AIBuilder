import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rojnshuaczieadjrqnxa.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvam5zaHVhY3ppZWFkanJxbnhhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NTk0ODQsImV4cCI6MjA1NDUzNTQ4NH0.itVJC0JFbZcKMjtchAXyJg5k9uIgQ7H-iQJBDNxRJ1Q'

export const supabase = createClient(supabaseUrl, supabaseKey) 