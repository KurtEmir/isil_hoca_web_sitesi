'use server'
import { revalidatePath } from 'next/cache'
import { redirect }       from 'next/navigation'
import { createServerSupabaseClient } from '../../lib/supabase/server'
import * as staticData from '../../content/data'

export async function saveContent(section, data) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase
    .from('content')
    .upsert({ section, data, updated_at: new Date().toISOString() }, { onConflict: 'section' })

  if (error) throw new Error(error.message)

  revalidatePath('/')
}

export async function seedContent() {
  const supabase = await createServerSupabaseClient()
  const sections = ['site', 'hero', 'about', 'expertise', 'media', 'insights', 'contact']

  for (const section of sections) {
    await supabase
      .from('content')
      .upsert({ section, data: staticData[section] }, { onConflict: 'section', ignoreDuplicates: true })
  }

  revalidatePath('/')
}

export async function logout() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/admin/login')
}
