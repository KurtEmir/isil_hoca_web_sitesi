'use client'
import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '../../../lib/supabase/client'
import { saveContent } from '../actions'
import * as staticData from '../../../content/data'

export default function InsightsEditor() {
  const [data,   setData]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg,    setMsg]    = useState(null)

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()
    supabase.from('content').select('data').eq('section', 'insights').single()
      .then(({ data: row }) => setData(row?.data ?? staticData.insights))
  }, [])

  const set           = (k, v) => setData(p => ({ ...p, [k]: v }))
  const updateArticle = (i, k, v) => { const a = [...data.articles]; a[i] = { ...a[i], [k]: v }; set('articles', a) }
  const addArticle    = () => set('articles', [...data.articles, { category: '', title: '', excerpt: '', date: '', readTime: '' }])
  const removeArticle = (i) => set('articles', data.articles.filter((_, j) => j !== i))

  const handleSave = async () => {
    setSaving(true); setMsg(null)
    try { await saveContent('insights', data); setMsg({ type: 'success', text: '✓ Kaydedildi' }) }
    catch (e) { setMsg({ type: 'error', text: 'Hata: ' + e.message }) }
    finally { setSaving(false) }
  }

  if (!data) return <div className="admin-loading">Yükleniyor…</div>

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar__title">✦ Görüşler & Makaleler</span>
        <a className="admin-topbar__view-link" href="/#insights" target="_blank">Önizleme ↗</a>
      </div>
      <div className="admin-content">
        <div className="admin-form">
          <div className="admin-form__section">
            <div className="admin-form__section-header">Makaleler</div>
            <div className="admin-form__body">
              <div className="admin-array">
                {data.articles.map((a, i) => (
                  <div key={i} className="admin-array-item">
                    <div className="admin-array-item__header">
                      <span className="admin-array-item__label">Makale {i + 1}</span>
                      <button className="admin-remove-btn" onClick={() => removeArticle(i)}>Sil</button>
                    </div>
                    <div className="admin-row">
                      <div className="admin-field">
                        <label className="admin-label">Kategori</label>
                        <input className="admin-input" value={a.category} onChange={e => updateArticle(i, 'category', e.target.value)} placeholder="Yapay Zeka" />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Tarih</label>
                        <input className="admin-input" value={a.date} onChange={e => updateArticle(i, 'date', e.target.value)} placeholder="Haziran 2025" />
                      </div>
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Başlık</label>
                      <input className="admin-input" value={a.title} onChange={e => updateArticle(i, 'title', e.target.value)} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Özet</label>
                      <textarea className="admin-textarea" value={a.excerpt} onChange={e => updateArticle(i, 'excerpt', e.target.value)} rows={3} />
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Okuma Süresi</label>
                      <input className="admin-input" value={a.readTime} onChange={e => updateArticle(i, 'readTime', e.target.value)} placeholder="6 dk" style={{ maxWidth: 100 }} />
                    </div>
                  </div>
                ))}
                <button className="admin-add-btn" onClick={addArticle}>+ Makale Ekle</button>
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
