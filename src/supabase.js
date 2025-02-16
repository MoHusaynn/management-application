import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

if (!supabaseUrl) console.warn('Missing VITE_SUPABASE_URL environment variable')
if (!supabaseKey) console.warn('Missing VITE_SUPABASE_KEY environment variable')

export const supabase = createClient(supabaseUrl || 'http://placeholder-url.com', supabaseKey || 'placeholder-key')
