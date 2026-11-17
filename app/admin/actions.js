'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { CONTENT_SECTIONS } from '@/lib/content'
import * as staticData from '@/content/data'

export async function saveContent(section, data) {
  if (!CONTENT_SECTIONS.includes(section)) return { ok: false, error: `Geçersiz bölüm: ${section}` }
  if (!data || typeof data !== 'object')   return { ok: false, error: 'Kaydedilecek veri boş.' }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase
    .from('content')
    .upsert({ section, data }, { onConflict: 'section' })

  if (error) return { ok: false, error: error.message }

  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function seedContent() {
  const supabase = await createServerSupabaseClient()
  const rows = CONTENT_SECTIONS.map(section => ({ section, data: staticData[section] }))

  const { error } = await supabase
    .from('content')
    .upsert(rows, { onConflict: 'section', ignoreDuplicates: true })

  if (error) return { ok: false, error: error.message }

  revalidatePath('/', 'layout')
  return { ok: true }
}

export async function logout() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
