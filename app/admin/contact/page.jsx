'use client'
import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '../../../lib/supabase/client'
import { saveContent } from '../actions'
import * as staticData from '../../../content/data'

export default function ContactEditor() {
  const [data,   setData]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg,    setMsg]    = useState(null)

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()
    supabase.from('content').select('data').eq('section', 'contact').single()
      .then(({ data: row }) => setData(row?.data ?? staticData.contact))
  }, [])

  const set = (k, v) => setData(p => ({ ...p, [k]: v }))

  const handleSave = async () => {
    setSaving(true); setMsg(null)
    try { await saveContent('contact', data); setMsg({ type: 'success', text: '✓ Kaydedildi' }) }
    catch (e) { setMsg({ type: 'error', text: 'Hata: ' + e.message }) }
    finally { setSaving(false) }
  }

  if (!data) return <div className="admin-loading">Yükleniyor…</div>

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar__title">✉ İletişim Bölümü</span>
        <a className="admin-topbar__view-link" href="/#contact" target="_blank">Önizleme ↗</a>
      </div>
      <div className="admin-content">
        <div className="admin-form">
          <div className="admin-form__section">
            <div className="admin-form__section-header">Bilgiler</div>
            <div className="admin-form__body">
              <div className="admin-field">
                <label className="admin-label">Bölüm Başlığı</label>
                <textarea className="admin-textarea" value={data.title} onChange={e => set('title', e.target.value)} rows={2} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Açıklama</label>
                <textarea className="admin-textarea" value={data.description} onChange={e => set('description', e.target.value)} rows={3} />
              </div>
              <div className="admin-field">
                <label className="admin-label">E-posta Adresi</label>
                <input className="admin-input" type="email" value={data.email} onChange={e => set('email', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-save-bar">
        {msg && <span className={`admin-save-msg admin-save-msg--${msg.type}`}>{msg.text}</span>}
        <button className="admin-save-btn" onClick={handleSave} disabled={saving}>
          {saving ? 'Kaydediliyor…' : 'Kaydet'}
        </button>
      </div>
    </>
  )
}
