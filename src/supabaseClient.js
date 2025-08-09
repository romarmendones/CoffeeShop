import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ygtjpbgzialkiuapcirf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndGpwYmd6aWFsa2l1YXBjaXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3Mzc1NDQsImV4cCI6MjA3MDMxMzU0NH0.r0iH21RNeQH_iNmqPuboEZWjRiJ_-GeOEgJG3XV8eWo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
