'use client'
import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '../../../lib/supabase/client'
import { saveContent } from '../actions'
import * as staticData from '../../../content/data'

export default function HeroEditor() {
  const [data,    setData]    = useState(null)
  const [saving,  setSaving]  = useState(false)
  const [msg,     setMsg]     = useState(null)

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()
    supabase.from('content').select('data').eq('section', 'hero').single()
      .then(({ data: row }) => setData(row?.data ?? staticData.hero))
  }, [])

  const set = (key, value) => setData(prev => ({ ...prev, [key]: value }))
  const setCta = (i, key, value) => {
    const cta = [...data.cta]
    cta[i] = { ...cta[i], [key]: value }
    setData(prev => ({ ...prev, cta }))
  }

  const handleSave = async () => {
    setSaving(true)
    setMsg(null)
    try {
      await saveContent('hero', data)
      setMsg({ type: 'success', text: '✓ Kaydedildi' })
    } catch (e) {
      setMsg({ type: 'error', text: 'Hata: ' + e.message })
    } finally {
      setSaving(false)
    }
  }

  if (!data) return <div className="admin-loading">Yükleniyor…</div>

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar__title">◈ Hero Bölümü</span>
        <a className="admin-topbar__view-link" href="/#home" target="_blank">Önizleme ↗</a>
      </div>

      <div className="admin-content">
        <div className="admin-form">
          <div className="admin-form__section">
            <div className="admin-form__section-header">Üst Bilgi</div>
            <div className="admin-form__body">
              <div className="admin-field">
                <label className="admin-label">Eyebrow Metni</label>
                <input className="admin-input" value={data.eyebrow} onChange={e => set('eyebrow', e.target.value)} />
                <span className="admin-field-hint">Nav'ın altındaki küçük başlık (· ile ayrılmış ünvanlar)</span>
              </div>
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">Slogan</div>
            <div className="admin-form__body">
              <div className="admin-field">
                <label className="admin-label">Tagline (satır başı için \n kullan)</label>
                <textarea className="admin-textarea" value={data.tagline} onChange={e => set('tagline', e.target.value)} rows={3} />
              </div>
              <div className="admin-field">
                <label className="admin-label">Alıntı / Quote</label>
                <textarea className="admin-textarea" value={data.quote} onChange={e => set('quote', e.target.value)} rows={3} />
              </div>
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">Butonlar (CTA)</div>
            <div className="admin-form__body">
              {data.cta.map((c, i) => (
                <div key={i} className="admin-array-item">
                  <div className="admin-array-item__header">
                    <span className="admin-array-item__label">Buton {i + 1}</span>
                  </div>
                  <div className="admin-row">
                    <div className="admin-field">
                      <label className="admin-label">Metin</label>
                      <input className="admin-input" value={c.text} onChange={e => setCta(i, 'text', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Link (href)</label>
                      <input className="admin-input" value={c.href} onChange={e => setCta(i, 'href', e.target.value)} placeholder="#contact" />
                    </div>
                  </div>
                </div>
              ))}
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
