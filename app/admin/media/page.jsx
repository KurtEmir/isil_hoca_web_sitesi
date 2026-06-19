'use client'
import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '../../../lib/supabase/client'
import { saveContent } from '../actions'
import * as staticData from '../../../content/data'

export default function MediaEditor() {
  const [data,   setData]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg,    setMsg]    = useState(null)

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()
    supabase.from('content').select('data').eq('section', 'media').single()
      .then(({ data: row }) => setData(row?.data ?? staticData.media))
  }, [])

  const set           = (k, v) => setData(p => ({ ...p, [k]: v }))
  const setFeatured   = (k, v) => setData(p => ({ ...p, featured: { ...p.featured, [k]: v } }))
  const updatePress   = (i, k, v) => { const a = [...data.press]; a[i] = { ...a[i], [k]: v }; set('press', a) }
  const addPress      = () => set('press', [...data.press, { title: '', source: '', type: '', date: '' }])
  const removePress   = (i) => set('press', data.press.filter((_, j) => j !== i))

  const handleSave = async () => {
    setSaving(true); setMsg(null)
    try { await saveContent('media', data); setMsg({ type: 'success', text: '✓ Kaydedildi' }) }
    catch (e) { setMsg({ type: 'error', text: 'Hata: ' + e.message }) }
    finally { setSaving(false) }
  }

  if (!data) return <div className="admin-loading">Yükleniyor…</div>

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar__title">▶ Medya & Basın</span>
        <a className="admin-topbar__view-link" href="/#media" target="_blank">Önizleme ↗</a>
      </div>
      <div className="admin-content">
        <div className="admin-form">

          <div className="admin-form__section">
            <div className="admin-form__section-header">Öne Çıkan Video</div>
            <div className="admin-form__body">
              <div className="admin-field">
                <label className="admin-label">YouTube Video ID</label>
                <input className="admin-input" value={data.featured.videoId ?? ''} onChange={e => setFeatured('videoId', e.target.value || null)} placeholder="dQw4w9WgXcQ" />
                <span className="admin-field-hint">YouTube URL'sinden v= parametresi. Boş bırakırsan placeholder gösterilir.</span>
              </div>
              <div className="admin-field">
                <label className="admin-label">Başlık</label>
                <input className="admin-input" value={data.featured.title} onChange={e => setFeatured('title', e.target.value)} />
              </div>
              <div className="admin-row">
                <div className="admin-field">
                  <label className="admin-label">Kaynak / Program</label>
                  <input className="admin-input" value={data.featured.source} onChange={e => setFeatured('source', e.target.value)} placeholder="Bloomberg HT" />
                </div>
                <div className="admin-field">
                  <label className="admin-label">Sunucu</label>
                  <input className="admin-input" value={data.featured.host} onChange={e => setFeatured('host', e.target.value)} placeholder="Melis Yaşar ile" />
                </div>
              </div>
              <div className="admin-field">
                <label className="admin-label">Açıklama</label>
                <textarea className="admin-textarea" value={data.featured.description} onChange={e => setFeatured('description', e.target.value)} rows={3} />
              </div>
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">Basın Kartları</div>
            <div className="admin-form__body">
              <div className="admin-array">
                {data.press.map((p, i) => (
                  <div key={i} className="admin-array-item">
                    <div className="admin-array-item__header">
                      <span className="admin-array-item__label">Basın {i + 1}</span>
                      <button className="admin-remove-btn" onClick={() => removePress(i)}>Sil</button>
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Başlık</label>
                      <input className="admin-input" value={p.title} onChange={e => updatePress(i, 'title', e.target.value)} />
                    </div>
                    <div className="admin-row">
                      <div className="admin-field">
                        <label className="admin-label">Kaynak</label>
                        <input className="admin-input" value={p.source} onChange={e => updatePress(i, 'source', e.target.value)} />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Tür</label>
                        <input className="admin-input" value={p.type} onChange={e => updatePress(i, 'type', e.target.value)} placeholder="Video Röportaj" />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Tarih</label>
                        <input className="admin-input" value={p.date} onChange={e => updatePress(i, 'date', e.target.value)} placeholder="2025" />
                      </div>
                    </div>
                  </div>
                ))}
                <button className="admin-add-btn" onClick={addPress}>+ Basın Ekle</button>
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
