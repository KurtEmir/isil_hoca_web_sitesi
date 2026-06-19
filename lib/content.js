import * as staticData from '../content/data'
import { createServerSupabaseClient } from './supabase/server'

const supabaseConfigured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)

export async function getContent(section) {
  if (!supabaseConfigured) return staticData[section]

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase
      .from('content')
      .select('data')
      .eq('section', section)
      .single()

    if (error || !data) return staticData[section]
    return data.data
  } catch {
    return staticData[section]
  }
}
