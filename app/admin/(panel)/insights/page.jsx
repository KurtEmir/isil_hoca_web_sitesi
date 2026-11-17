'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyArticle = { category: '', title: '', excerpt: '', date: '', readTime: '', url: '' }

export default function InsightsEditor() {
  const { data, update, save, saving, msg } = useSectionContent('insights')
  if (!data) return <Loading />

  const set      = (key, value) => update({ [key]: value })
  const setCta   = (key, value) => update(prev => ({ cta: { ...prev.cta, [key]: value } }))
  const cta      = data.cta ?? {}
  const articles = data.articles ?? []

  return (
    <>
      <EditorTopbar icon="✦" title="Görüşler & Makaleler" previewHref="/#insights" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Başlık">
            <Field label="Bölüm Başlığı" hint="Satır başı için Enter'a bas.">
              <textarea className="admin-textarea" value={data.title ?? ''} onChange={e => set('title', e.target.value)} rows={2} />
            </Field>
          </Section>

          <Section title="Linkler">
            <div className="admin-row">
              <Field label="“Tüm Yazılar” Buton Metni">
                <input className="admin-input" value={cta.text ?? ''} onChange={e => setCta('text', e.target.value)} />
              </Field>
              <Field label="“Tüm Yazılar” Linki" hint="Boş bırakılırsa buton gösterilmez.">
                <input className="admin-input" type="url" value={cta.href ?? ''} onChange={e => setCta('href', e.target.value)} placeholder="https://…" />
              </Field>
            </div>
            <Field label="“Oku” Etiketi" hint="Makalenin altındaki link metni.">
              <input className="admin-input" value={data.readMoreLabel ?? ''} onChange={e => set('readMoreLabel', e.target.value)} style={{ maxWidth: 200 }} />
            </Field>
          </Section>

          <Section title="Makaleler">
            <div className="admin-array">
              {articles.map((a, i) => (
                <ArrayItem key={i} label={`Makale ${i + 1}`} onRemove={() => set('articles', removeAt(articles, i))}>
                  <div className="admin-row">
                    <Field label="Kategori">
                      <input className="admin-input" value={a.category ?? ''} onChange={e => set('articles', updateAt(articles, i, { category: e.target.value }))} placeholder="Yapay Zeka" />
                    </Field>
                    <Field label="Tarih">
                      <input className="admin-input" value={a.date ?? ''} onChange={e => set('articles', updateAt(articles, i, { date: e.target.value }))} placeholder="Haziran 2025" />
                    </Field>
                  </div>
                  <Field label="Başlık">
                    <input className="admin-input" value={a.title ?? ''} onChange={e => set('articles', updateAt(articles, i, { title: e.target.value }))} />
                  </Field>
                  <Field label="Özet">
                    <textarea className="admin-textarea" value={a.excerpt ?? ''} onChange={e => set('articles', updateAt(articles, i, { excerpt: e.target.value }))} rows={3} />
                  </Field>
                  <div className="admin-row">
                    <Field label="Okuma Süresi">
                      <input className="admin-input" value={a.readTime ?? ''} onChange={e => set('articles', updateAt(articles, i, { readTime: e.target.value }))} placeholder="6 dk" />
                    </Field>
                    <Field label="Makale Linki" hint="Boş bırakılırsa “Oku” linki gösterilmez.">
                      <input className="admin-input" type="url" value={a.url ?? ''} onChange={e => set('articles', updateAt(articles, i, { url: e.target.value }))} placeholder="https://…" />
                    </Field>
                  </div>
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('articles', [...articles, emptyArticle])}>Makale Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
