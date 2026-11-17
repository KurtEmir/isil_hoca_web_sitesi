import { cache } from 'react'
import * as staticData from '@/content/data'
import { createPublicSupabaseClient } from '@/lib/supabase/public'

export const CONTENT_SECTIONS = ['site', 'hero', 'about', 'journey', 'spotlight', 'expertise', 'platforms', 'offers', 'media', 'manifesto', 'insights', 'contact']

export const getContent = cache(async function getContent(section) {
  const fallback = staticData[section]
  const supabase = createPublicSupabaseClient()
  if (!supabase) return fallback

  try {
    const { data, error } = await supabase
      .from('content')
      .select('data')
      .eq('section', section)
      .maybeSingle()

    if (error || !data?.data) return fallback
    return { ...fallback, ...data.data }
  } catch {
    return fallback
  }
})
