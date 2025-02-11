import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://klzifxxrckljxgoojoow.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsemlmeHhyY2tsanhnb29qb293Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5MzY0NzcsImV4cCI6MjA1MjUxMjQ3N30.A6y0aIf3jOn-l4EwfauYX4HW659r91e0cxuCLmG7bfQ'

export const supabase = createClient(supabaseUrl, supabaseKey)
