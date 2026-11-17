'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyStop = { year: '', title: '', text: '' }

export default function JourneyEditor() {
  const { data, update, save, saving, msg } = useSectionContent('journey')
  if (!data) return <Loading />

  const set   = (key, value) => update({ [key]: value })
  const items = data.items ?? []

  return (
    <>
      <EditorTopbar icon="⟶" title="Yolculuk (Zaman Çizelgesi)" previewHref="/#journey" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Başlık">
            <Field label="Bölüm Başlığı">
              <input className="admin-input" value={data.title ?? ''} onChange={e => set('title', e.target.value)} />
            </Field>
          </Section>

          <Section title="Duraklar">
            <p className="admin-field-hint">Duraklar sırayla soldan sağa bir hat üzerinde gösterilir; eskiden yeniye sırala.</p>
            <div className="admin-array">
              {items.map((item, i) => (
                <ArrayItem key={i} label={`Durak ${i + 1}`} onRemove={() => set('items', removeAt(items, i))}>
                  <div className="admin-row">
                    <Field label="Yıl">
                      <input className="admin-input" value={item.year ?? ''} onChange={e => set('items', updateAt(items, i, { year: e.target.value }))} placeholder="2020" />
                    </Field>
                    <Field label="Başlık">
                      <input className="admin-input" value={item.title ?? ''} onChange={e => set('items', updateAt(items, i, { title: e.target.value }))} />
                    </Field>
                  </div>
                  <Field label="Kısa Açıklama">
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
