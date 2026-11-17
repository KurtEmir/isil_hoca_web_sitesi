import { createClient } from '@supabase/supabase-js'
import { supabaseUrl, supabaseAnonKey, isSupabaseConfigured } from './config'

let publicClient = null

export function createPublicSupabaseClient() {
  if (!isSupabaseConfigured) return null

  if (!publicClient) {
    publicClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    })
  }

  return publicClient
}
