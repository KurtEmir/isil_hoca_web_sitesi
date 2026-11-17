'use server'
import { createPublicSupabaseClient } from '@/lib/supabase/public'
import { invalidContactFields } from '@/lib/contactValidation'

const clip = (value, max) => String(value ?? '').trim().slice(0, max)

export async function sendMessage(_previousState, formData) {
  if (clip(formData.get('website'), 10)) return { status: 'success' }

  const payload = {
    name:         clip(formData.get('name'), 120),
    email:        clip(formData.get('email'), 200),
    organization: clip(formData.get('organization'), 200) || null,
    subject:      clip(formData.get('subject'), 200),
    message:      clip(formData.get('message'), 5000),
  }

  const fields = invalidContactFields(payload)
  if (fields.length > 0) return { status: 'error', code: 'invalid', fields }

  const supabase = createPublicSupabaseClient()
  if (!supabase) return { status: 'error', code: 'unavailable' }

  const { error } = await supabase.from('messages').insert(payload)
  if (error) {
    console.error('[contact] mesaj kaydedilemedi:', error.message)
    return { status: 'error', code: 'unavailable' }
  }

  return { status: 'success' }
}
