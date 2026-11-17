'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { replaceAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

export default function SpotlightEditor() {
  const { data, update, save, saving, msg } = useSectionContent('spotlight')
  if (!data) return <Loading />

  const set   = (key, value) => update({ [key]: value })
  const terms = data.equation ?? []

  return (
    <>
      <EditorTopbar icon="▣" title="Human+ Bandı" previewHref="/#spotlight" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Fotoğraf">
            <Field
              label="Görsel"
              hint="Kırmızı-siyah baskı (duotone) efektiyle dikey bir çerçevede gösterilir. public/images altındaki bir yol ya da https görsel linki. Boş bırakılabilir."
            >
              <input
                className="admin-input"
                value={data.image ?? ''}
                onChange={e => set('image', e.target.value)}
                placeholder="/images/isil-boy-ergul-dekupe.webp"
              />
            </Field>
            {data.image && (
              <div className="admin-photo-preview">
                <img
                  src={data.image}
                  alt=""
                  onError={e => { e.currentTarget.style.visibility = 'hidden' }}
                  onLoad={e => { e.currentTarget.style.visibility = 'visible' }}
                />
              </div>
            )}
            <Field label="Alt Metin (erişilebilirlik)">
              <input className="admin-input" value={data.alt ?? ''} onChange={e => set('alt', e.target.value)} />
            </Field>
          </Section>

          <Section title="Yazılar">
            <Field label="Büyük Kelime" hint="Bandın başlığı; dev puntoyla gösterilir. Tek kısa kelime en iyi sonucu verir.">
              <input className="admin-input" value={data.backdrop ?? ''} onChange={e => set('backdrop', e.target.value)} placeholder="Human+" />
            </Field>
            <Field label="Açıklama" hint="Büyük kelimenin altında gösterilir.">
              <textarea className="admin-textarea" value={data.caption ?? ''} onChange={e => set('caption', e.target.value)} rows={2} />
            </Field>
            <Field label="Kaynak / İmza" hint="En altta küçük gösterilir.">
              <input className="admin-input" value={data.captionSource ?? ''} onChange={e => set('captionSource', e.target.value)} />
            </Field>
          </Section>

          <Section title="Denklem Şeması">
            <p className="admin-field-hint">Terimler arasına + konur; son terim = işaretinden sonra sonuç olarak vurgulanır. En az iki terim gerekir.</p>
            <div className="admin-array">
              {terms.map((term, i) => (
                <ArrayItem key={i} label={i === terms.length - 1 ? 'Sonuç' : `Terim ${i + 1}`} onRemove={() => set('equation', removeAt(terms, i))}>
                  <input className="admin-input" value={term} onChange={e => set('equation', replaceAt(terms, i, e.target.value))} />
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('equation', [...terms, ''])}>Terim Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
