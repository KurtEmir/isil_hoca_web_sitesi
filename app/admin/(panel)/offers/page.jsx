'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyOffer = { title: '', description: '', audience: '', topic: '', cta: { text: '', href: '#contact' } }

export default function OffersEditor() {
  const { data, update, save, saving, msg } = useSectionContent('offers')
  if (!data) return <Loading />

  const set     = (key, value) => update({ [key]: value })
  const items   = data.items ?? []
  const setItem = (i, patch) => set('items', updateAt(items, i, patch))
  const setCta  = (i, key, value) => setItem(i, { cta: { ...items[i]?.cta, [key]: value } })

  return (
    <>
      <EditorTopbar icon="◇" title="Davet Seçenekleri" previewHref="/#offers" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Başlık">
            <Field label="Bölüm Başlığı" hint="Satır başı için Enter'a bas.">
              <textarea className="admin-textarea" value={data.title ?? ''} onChange={e => set('title', e.target.value)} rows={2} />
            </Field>
          </Section>

          <Section title="Seçenekler">
            <div className="admin-array">
              {items.map((item, i) => (
                <ArrayItem key={i} label={`Seçenek ${i + 1}`} onRemove={items.length > 1 ? () => set('items', removeAt(items, i)) : undefined}>
                  <Field label="Başlık">
                    <input className="admin-input" value={item.title ?? ''} onChange={e => setItem(i, { title: e.target.value })} />
                  </Field>
                  <Field label="Açıklama">
                    <textarea className="admin-textarea" value={item.description ?? ''} onChange={e => setItem(i, { description: e.target.value })} rows={3} />
                  </Field>
                  <Field label="Kimler İçin" hint="Açıklamanın altında kırmızı gösterilir. · ile ayır.">
                    <input className="admin-input" value={item.audience ?? ''} onChange={e => setItem(i, { audience: e.target.value })} />
                  </Field>
                  <Field label="Form Konusu" hint="Butona basınca iletişim formundaki Konu bununla dolar. İletişim bölümündeki konu seçeneklerinden biriyle birebir aynı yaz.">
                    <input className="admin-input" value={item.topic ?? ''} onChange={e => setItem(i, { topic: e.target.value })} />
                  </Field>
                  <div className="admin-row">
                    <Field label="Buton Metni" hint="Boş bırakılırsa link gösterilmez.">
                      <input className="admin-input" value={item.cta?.text ?? ''} onChange={e => setCta(i, 'text', e.target.value)} />
                    </Field>
                    <Field label="Buton Linki">
                      <input className="admin-input" value={item.cta?.href ?? ''} onChange={e => setCta(i, 'href', e.target.value)} placeholder="#contact" />
                    </Field>
                  </div>
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('items', [...items, emptyOffer])}>Seçenek Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
