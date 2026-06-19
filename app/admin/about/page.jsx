'use client'
import { useState, useEffect } from 'react'
import { createBrowserSupabaseClient } from '../../../lib/supabase/client'
import { saveContent } from '../actions'
import * as staticData from '../../../content/data'

export default function AboutEditor() {
  const [data,   setData]   = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg,    setMsg]    = useState(null)

  useEffect(() => {
    const supabase = createBrowserSupabaseClient()
    supabase.from('content').select('data').eq('section', 'about').single()
      .then(({ data: row }) => setData(row?.data ?? staticData.about))
  }, [])

  const set = (key, val) => setData(p => ({ ...p, [key]: val }))

  const updateBio   = (i, val) => { const a = [...data.bio];   a[i] = val; set('bio', a) }
  const addBio      = () => set('bio', [...data.bio, ''])
  const removeBio   = (i) => set('bio', data.bio.filter((_, j) => j !== i))

  const updateStat  = (i, k, v) => { const a = [...data.stats];  a[i] = { ...a[i], [k]: v }; set('stats', a) }
  const updateRole  = (i, k, v) => { const a = [...data.roles];  a[i] = { ...a[i], [k]: v }; set('roles', a) }
  const addRole     = () => set('roles', [...data.roles, { org: '', role: '', description: '' }])
  const removeRole  = (i) => set('roles', data.roles.filter((_, j) => j !== i))

  const handleSave = async () => {
    setSaving(true); setMsg(null)
    try { await saveContent('about', data); setMsg({ type: 'success', text: '✓ Kaydedildi' }) }
    catch (e) { setMsg({ type: 'error', text: 'Hata: ' + e.message }) }
    finally { setSaving(false) }
  }

  if (!data) return <div className="admin-loading">Yükleniyor…</div>

  return (
    <>
      <div className="admin-topbar">
        <span className="admin-topbar__title">◉ Hakkımda Bölümü</span>
        <a className="admin-topbar__view-link" href="/#about" target="_blank">Önizleme ↗</a>
      </div>
      <div className="admin-content">
        <div className="admin-form">

          <div className="admin-form__section">
            <div className="admin-form__section-header">Başlık</div>
            <div className="admin-form__body">
              <div className="admin-field">
                <label className="admin-label">Bölüm Başlığı</label>
                <textarea className="admin-textarea" value={data.title} onChange={e => set('title', e.target.value)} rows={2} />
              </div>
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">Biyografi Paragrafları</div>
            <div className="admin-form__body">
              <div className="admin-array">
                {data.bio.map((p, i) => (
                  <div key={i} className="admin-array-item">
                    <div className="admin-array-item__header">
                      <span className="admin-array-item__label">Paragraf {i + 1}</span>
                      {data.bio.length > 1 && <button className="admin-remove-btn" onClick={() => removeBio(i)}>Sil</button>}
                    </div>
                    <textarea className="admin-textarea" value={p} onChange={e => updateBio(i, e.target.value)} rows={3} />
                  </div>
                ))}
                <button className="admin-add-btn" onClick={addBio}>+ Paragraf Ekle</button>
              </div>
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">İstatistikler</div>
            <div className="admin-form__body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {data.stats.map((s, i) => (
                  <div key={i} className="admin-array-item">
                    <span className="admin-array-item__label">#{i + 1}</span>
                    <div className="admin-row">
                      <div className="admin-field">
                        <label className="admin-label">Değer</label>
                        <input className="admin-input" value={s.value} onChange={e => updateStat(i, 'value', e.target.value)} placeholder="20+" />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Etiket</label>
                        <input className="admin-input" value={s.label} onChange={e => updateStat(i, 'label', e.target.value)} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-form__section">
            <div className="admin-form__section-header">Kuruculuk & Danışmanlık Rolleri</div>
            <div className="admin-form__body">
              <div className="admin-array">
                {data.roles.map((r, i) => (
                  <div key={i} className="admin-array-item">
                    <div className="admin-array-item__header">
                      <span className="admin-array-item__label">Rol {i + 1}</span>
                      <button className="admin-remove-btn" onClick={() => removeRole(i)}>Sil</button>
                    </div>
                    <div className="admin-row">
                      <div className="admin-field">
                        <label className="admin-label">Kurum / Platform</label>
                        <input className="admin-input" value={r.org} onChange={e => updateRole(i, 'org', e.target.value)} />
                      </div>
                      <div className="admin-field">
                        <label className="admin-label">Rol / Ünvan</label>
                        <input className="admin-input" value={r.role} onChange={e => updateRole(i, 'role', e.target.value)} />
                      </div>
                    </div>
                    <div className="admin-field">
                      <label className="admin-label">Açıklama</label>
                      <textarea className="admin-textarea" value={r.description} onChange={e => updateRole(i, 'description', e.target.value)} rows={2} />
                    </div>
                  </div>
                ))}
                <button className="admin-add-btn" onClick={addRole}>+ Rol Ekle</button>
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
