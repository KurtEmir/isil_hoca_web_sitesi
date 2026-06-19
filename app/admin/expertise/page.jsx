'use client'
import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '../../../lib/supabase/client'
import { saveContent } from '../actions'
import * as staticData from '../../../content/data'

export default function ExpertiseEditor() {
  const [data,   setData]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg,    setMsg]    = useState(null)

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()
    supabase.from('content').select('data').eq('section', 'expertise').single()
      .then(({ data: row }) => setData(row?.data ?? staticData.expertise))
  }, [])

  const set       = (k, v) => setData(p => ({ ...p, [k]: v }))
  const updateItem = (i, k, v) => { const a = [...data.items]; a[i] = { ...a[i], [k]: v }; set('items', a) }
  const addItem    = () => set('items', [...data.items, { icon: '✦', title: '', description: '' }])
  const removeItem = (i) => set('items', data.items.filter((_, j) => j !== i))

  const handleSave = async () => {
    setSaving(true); setMsg(null)
    try { await saveContent('expertise', data); setMsg({ type: 'success', text: '✓ Kaydedildi' }) }
    catch (e) { setMsg({ type: 'error', text: 'Hata: ' + e.message }) }
    finally { setSaving(false) }
  }

  if (!data) return <div className="admin-loading">Yükleniyor…</div>

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar__title">◆ Uzmanlık Alanları</span>
        <a className="admin-topbar__view-link" href="/#expertise" target="_blank">Önizleme ↗</a>
      </div>
      <div className="admin-content">
        <div className="admin-form">
          <div className="admin-form__section">
            <div className="admin-form__section-header">Başlık</div>
            <div className="admin-form__body">
              <div className="admin-field">
                <label className="admin-label">Bölüm Başlığı</label>
                <input className="admin-input" value={data.title} onChange={e => set('title', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">Uzmanlık Kartları</div>
            <div className="admin-form__body">
              <div className="admin-array">
                {data.items.map((item, i) => (
                  <div key={i} className="admin-array-item">
                    <div className="admin-array-item__header">
                      <span className="admin-array-item__label">Kart {i + 1}</span>
                      {data.items.length > 1 && <button className="admin-remove-btn" onClick={() => removeItem(i)}>Sil</button>}
                    </div>
                    <div className="admin-row">
                      <div className="admin-field">
                        <label className="admin-label">İkon (emoji/sembol)</label>
                        <input className="admin-input" value={item.icon} onChange={e => updateItem(i, 'icon', e.target.value)} style={{ maxWidth: 80 }} />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Başlık</label>
                        <input className="admin-input" value={item.title} onChange={e => updateItem(i, 'title', e.target.value)} />
                      </div>
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Açıklama</label>
                      <textarea className="admin-textarea" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} rows={2} />
                    </div>
                  </div>
                ))}
                <button className="admin-add-btn" onClick={addItem}>+ Kart Ekle</button>
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
