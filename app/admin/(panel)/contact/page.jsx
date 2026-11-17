'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { EditorTopbar, Section, Field, SaveBar, Loading } from '@/components/admin/EditorShell'

export default function ContactEditor() {
  const { data, update, save, saving, msg } = useSectionContent('contact')
  if (!data) return <Loading />

  const set         = (key, value) => update({ [key]: value })
  const setFeedback = (key, value) => update(prev => ({ feedback: { ...prev.feedback, [key]: value } }))
  const feedback    = data.feedback ?? {}
  const setFieldError = (key, value) => update(prev => ({ fieldErrors: { ...prev.fieldErrors, [key]: value } }))
  const fieldErrors   = data.fieldErrors ?? {}
  const subjectsText  = (data.subjects ?? []).join('\n')

  return (
    <>
      <EditorTopbar icon="✉" title="İletişim Bölümü" previewHref="/#contact" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Bilgiler">
            <Field label="Bölüm Başlığı" hint="Kırmızı kapanıştaki dev başlık. Satır başı için Enter'a bas.">
              <textarea className="admin-textarea" value={data.title ?? ''} onChange={e => set('title', e.target.value)} rows={2} />
            </Field>
            <Field label="Açıklama">
              <textarea className="admin-textarea" value={data.description ?? ''} onChange={e => set('description', e.target.value)} rows={3} />
            </Field>
            <div className="admin-row">
              <Field label="E-posta Adresi">
                <input className="admin-input" type="email" value={data.email ?? ''} onChange={e => set('email', e.target.value)} />
              </Field>
              <Field label="Sosyal Medya Başlığı">
                <input className="admin-input" value={data.socialLabel ?? ''} onChange={e => set('socialLabel', e.target.value)} />
              </Field>
            </div>
          </Section>

          <Section title="Form">
            <Field label="Formun Üstündeki Bilgi Satırı" hint="Ziyaretçiye mesajında neyi yazması gerektiğini söyler. Boş bırakılırsa gizlenir.">
              <textarea className="admin-textarea" value={data.formHint ?? ''} onChange={e => set('formHint', e.target.value)} rows={2} />
            </Field>
            <Field label="Konu Seçenekleri" hint="Her satır bir seçenek. Davet Seçenekleri'ndeki “Form Konusu” bunlardan biriyle birebir aynı olmalı.">
              <textarea className="admin-textarea" value={subjectsText} onChange={e => set('subjects', e.target.value.split('\n'))} rows={5} />
            </Field>
          </Section>

          <Section title="Alan Hata Mesajları">
            <div className="admin-row">
              <Field label="Ad Soyad">
                <input className="admin-input" value={fieldErrors.name ?? ''} onChange={e => setFieldError('name', e.target.value)} />
              </Field>
              <Field label="E-posta">
                <input className="admin-input" value={fieldErrors.email ?? ''} onChange={e => setFieldError('email', e.target.value)} />
              </Field>
            </div>
            <div className="admin-row">
              <Field label="Konu">
                <input className="admin-input" value={fieldErrors.subject ?? ''} onChange={e => setFieldError('subject', e.target.value)} />
              </Field>
              <Field label="Mesaj">
                <input className="admin-input" value={fieldErrors.message ?? ''} onChange={e => setFieldError('message', e.target.value)} />
              </Field>
            </div>
          </Section>

          <Section title="Form Geri Bildirim Metinleri">
            <Field label="Başarılı Gönderim">
              <input className="admin-input" value={feedback.success ?? ''} onChange={e => setFeedback('success', e.target.value)} />
            </Field>
            <Field label="Eksik / Hatalı Alan">
              <input className="admin-input" value={feedback.invalid ?? ''} onChange={e => setFeedback('invalid', e.target.value)} />
            </Field>
            <Field label="Gönderim Hatası" hint="Sonuna e-posta adresi otomatik eklenir.">
              <input className="admin-input" value={feedback.error ?? ''} onChange={e => setFeedback('error', e.target.value)} />
            </Field>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
