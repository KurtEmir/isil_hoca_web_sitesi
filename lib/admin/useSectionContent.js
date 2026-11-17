'use client'
import { useState, useEffect, useCallback } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase/client'
import { saveContent } from '@/app/admin/actions'
import * as staticData from '@/content/data'

export function useSectionContent(section) {
  const [data,   setData]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg,    setMsg]    = useState(null)

  useEffect(() => {
    let cancelled = false
    const fallback = staticData[section]
    const apply = (row) => { if (!cancelled) setData({ ...fallback, ...(row ?? {}) }) }

    try {
      createBrowserSupabaseClient()
        .from('content')
        .select('data')
        .eq('section', section)
        .maybeSingle()
        .then(({ data: row }) => apply(row?.data))
        .catch(() => apply(null))
    } catch {
      apply(null)
    }

    return () => { cancelled = true }
  }, [section])

  const update = useCallback((patch) => {
    setData(prev => ({ ...prev, ...(typeof patch === 'function' ? patch(prev) : patch) }))
  }, [])

  const save = useCallback(async () => {
    setSaving(true)
    setMsg(null)
    const result = await saveContent(section, data).catch(e => ({ ok: false, error: e.message }))
    setMsg(result.ok
      ? { type: 'success', text: 'Kaydedildi' }
      : { type: 'error',   text: `Hata: ${result.error}` })
    setSaving(false)
  }, [section, data])

  return { data, update, save, saving, msg }
}
