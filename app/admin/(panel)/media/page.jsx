'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, removeAt } from '@/lib/admin/arrays'
import { extractYouTubeId } from '@/lib/admin/youtube'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyPress = { title: '', source: '', type: '', date: '', url: '' }

export default function MediaEditor() {
  const { data, update, save, saving, msg } = useSectionContent('media')
  if (!data) return <Loading />

  const set         = (key, value) => update({ [key]: value })
  const setFeatured = (key, value) => update(prev => ({ featured: { ...prev.featured, [key]: value } }))
  const featured    = data.featured ?? {}
  const press       = data.press ?? []

  return (
    <>
      <EditorTopbar icon="▶" title="Medya & Basın" previewHref="/#media" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Başlık">
            <Field label="Bölüm Başlığı" hint="Satır başı için Enter'a bas.">
              <textarea className="admin-textarea" value={data.title ?? ''} onChange={e => set('title', e.target.value)} rows={2} />
            </Field>
          </Section>

          <Section title="Öne Çıkan Video">
            <Field label="YouTube Video" hint="Video linkini olduğu gibi yapıştırabilirsin; ID otomatik ayıklanır. Boş bırakırsan yer tutucu gösterilir.">
              <input
                className="admin-input"
                value={featured.videoId ?? ''}
                onChange={e => setFeatured('videoId', extractYouTubeId(e.target.value))}
                placeholder="https://www.youtube.com/watch?v=…"
              />
            </Field>
            <div className="admin-row">
              <Field label="Rozet Metni" hint="Videonun sol üst köşesinde kırmızı etiket olarak gösterilir. Boş bırakılabilir.">
                <input className="admin-input" value={data.featuredBadge ?? ''} onChange={e => set('featuredBadge', e.target.value)} />
              </Field>
              <Field label="Video Yoksa Gösterilecek Metin">
                <input className="admin-input" value={data.videoPlaceholder ?? ''} onChange={e => set('videoPlaceholder', e.target.value)} />
              </Field>
            </div>
            <Field label="Başlık">
              <input className="admin-input" value={featured.title ?? ''} onChange={e => setFeatured('title', e.target.value)} />
            </Field>
            <div className="admin-row">
              <Field label="Kaynak / Program">
                <input className="admin-input" value={featured.source ?? ''} onChange={e => setFeatured('source', e.target.value)} placeholder="Bloomberg HT" />
              </Field>
              <Field label="Sunucu">
                <input className="admin-input" value={featured.host ?? ''} onChange={e => setFeatured('host', e.target.value)} placeholder="Melis Yaşar ile" />
              </Field>
            </div>
            <Field label="Açıklama">
              <textarea className="admin-textarea" value={featured.description ?? ''} onChange={e => setFeatured('description', e.target.value)} rows={3} />
            </Field>
          </Section>

          <Section title="Basın Listesi">
            <div className="admin-array">
              {press.map((p, i) => (
                <ArrayItem key={i} label={`Basın ${i + 1}`} onRemove={() => set('press', removeAt(press, i))}>
                  <Field label="Başlık">
                    <input className="admin-input" value={p.title ?? ''} onChange={e => set('press', updateAt(press, i, { title: e.target.value }))} />
                  </Field>
                  <div className="admin-row">
                    <Field label="Kaynak">
                      <input className="admin-input" value={p.source ?? ''} onChange={e => set('press', updateAt(press, i, { source: e.target.value }))} />
                    </Field>
                    <Field label="Tür">
                      <input className="admin-input" value={p.type ?? ''} onChange={e => set('press', updateAt(press, i, { type: e.target.value }))} placeholder="Video Röportaj" />
                    </Field>
                  </div>
                  <div className="admin-row">
                    <Field label="Tarih">
                      <input className="admin-input" value={p.date ?? ''} onChange={e => set('press', updateAt(press, i, { date: e.target.value }))} placeholder="2025" />
                    </Field>
                    <Field label="Link (opsiyonel)" hint="Doluysa satır tıklanabilir olur.">
                      <input className="admin-input" type="url" value={p.url ?? ''} onChange={e => set('press', updateAt(press, i, { url: e.target.value }))} placeholder="https://…" />
                    </Field>
                  </div>
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('press', [...press, emptyPress])}>Basın Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
