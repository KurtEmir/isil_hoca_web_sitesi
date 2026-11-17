import { createBrowserClient } from '@supabase/ssr'
import { supabaseUrl, supabaseAnonKey } from './config'

export function createBrowserSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
