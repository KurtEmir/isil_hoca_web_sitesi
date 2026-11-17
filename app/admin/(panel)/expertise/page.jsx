'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyItem = { title: '', description: '' }

export default function ExpertiseEditor() {
  const { data, update, save, saving, msg } = useSectionContent('expertise')
  if (!data) return <Loading />

  const set   = (key, value) => update({ [key]: value })
  const items = data.items ?? []

  return (
    <>
      <EditorTopbar icon="◆" title="Uzmanlık Alanları" previewHref="/#expertise" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Başlık">
            <Field label="Bölüm Başlığı">
              <input className="admin-input" value={data.title ?? ''} onChange={e => set('title', e.target.value)} />
            </Field>
          </Section>

          <Section title="Konular">
            <div className="admin-array">
              {items.map((item, i) => (
                <ArrayItem key={i} label={`Konu ${i + 1}`} onRemove={items.length > 1 ? () => set('items', removeAt(items, i)) : undefined}>
                  <Field label="Başlık">
                    <input className="admin-input" value={item.title ?? ''} onChange={e => set('items', updateAt(items, i, { title: e.target.value }))} />
                  </Field>
                  <Field label="Açıklama">
                    <textarea className="admin-textarea" value={item.description ?? ''} onChange={e => set('items', updateAt(items, i, { description: e.target.value }))} rows={2} />
                  </Field>
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('items', [...items, emptyItem])}>Konu Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
