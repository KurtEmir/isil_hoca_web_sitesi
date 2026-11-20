'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, replaceAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyStop = { year: '', track: '', title: '', text: '' }

export default function JourneyEditor() {
  const { data, update, save, saving, msg } = useSectionContent('journey')
  if (!data) return <Loading />

  const set    = (key, value) => update({ [key]: value })
  const items  = data.items ?? []
  const tracks = data.tracks ?? []

  return (
    <>
      <EditorTopbar icon="⟶" title="Yolculuk (Hat Haritası)" previewHref="/#journey" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Başlık">
            <Field label="Bölüm Başlığı">
              <input className="admin-input" value={data.title ?? ''} onChange={e => set('title', e.target.value)} />
            </Field>
            <Field label="Giriş Metni" hint="Başlığın altında, haritanın üstünde gösterilir. Boş bırakılabilir.">
              <textarea className="admin-textarea" value={data.intro ?? ''} onChange={e => set('intro', e.target.value)} rows={3} />
            </Field>
          </Section>

          <Section title="Hatlar">
            <p className="admin-field-hint">Haritadaki yatay hatlar. Sırayla siyah, kırmızı ve çift çizgili gösterilir; en fazla üç hat önerilir. Hat adını değiştirirsen duraklardaki hat seçimini de güncelle.</p>
            <div className="admin-array">
              {tracks.map((track, i) => (
                <ArrayItem key={i} label={`Hat ${i + 1}`} onRemove={() => set('tracks', removeAt(tracks, i))}>
                  <input className="admin-input" value={track} onChange={e => set('tracks', replaceAt(tracks, i, e.target.value))} />
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('tracks', [...tracks, ''])}>Hat Ekle</AddButton>
            </div>
          </Section>

          <Section title="Duraklar">
            <p className="admin-field-hint">Eskiden yeniye sırala. Aynı yıldaki duraklar haritada aynı sütunda, listede aynı yılın altında toplanır.</p>
            <div className="admin-array">
              {items.map((item, i) => (
                <ArrayItem key={i} label={`Durak ${i + 1}`} onRemove={() => set('items', removeAt(items, i))}>
                  <div className="admin-row">
                    <Field label="Yıl">
                      <input className="admin-input" value={item.year ?? ''} onChange={e => set('items', updateAt(items, i, { year: e.target.value }))} placeholder="2020" />
                    </Field>
                    <Field label="Hat">
                      <select className="admin-input" value={item.track ?? ''} onChange={e => set('items', updateAt(items, i, { track: e.target.value }))}>
                        <option value="">Hatsız (yalnızca listede)</option>
                        {tracks.filter(Boolean).map(track => <option key={track} value={track}>{track}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Field label="Başlık" hint="Haritada durağın altında da yazar; kısa tut.">
                    <input className="admin-input" value={item.title ?? ''} onChange={e => set('items', updateAt(items, i, { title: e.target.value }))} />
                  </Field>
                  <Field label="Açıklama">
                    <textarea className="admin-textarea" value={item.text ?? ''} onChange={e => set('items', updateAt(items, i, { text: e.target.value }))} rows={2} />
                  </Field>
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('items', [...items, emptyStop])}>Durak Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
