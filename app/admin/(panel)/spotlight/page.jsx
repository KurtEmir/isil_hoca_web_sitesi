'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { replaceAt, updateAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyPhoto = { src: '', alt: '', caption: '', position: '' }

export default function SpotlightEditor() {
  const { data, update, save, saving, msg } = useSectionContent('spotlight')
  if (!data) return <Loading />

  const set   = (key, value) => update({ [key]: value })
  const terms  = data.equation ?? []
  const photos = data.photos ?? []

  return (
    <>
      <EditorTopbar icon="▣" title="Human+ Bandı" previewHref="/#spotlight" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Fotoğraflar">
            <p className="admin-field-hint">En fazla üç fotoğraf: ilki büyük, diğer ikisi yanında üst üste gösterilir. Yatay, iş ortamında çekilmiş fotoğraflar en iyi sonucu verir. public/images altındaki bir yol ya da https görsel linki.</p>
            <div className="admin-array">
              {photos.map((photo, i) => (
                <ArrayItem key={i} label={i === 0 ? 'Büyük Fotoğraf' : `Fotoğraf ${i + 1}`} onRemove={() => set('photos', removeAt(photos, i))}>
                  <Field label="Görsel">
                    <input className="admin-input" value={photo.src ?? ''} onChange={e => set('photos', updateAt(photos, i, { src: e.target.value }))} placeholder="/images/spotlight/..." />
                  </Field>
                  {photo.src && (
                    <div className="admin-photo-preview">
                      <img
                        src={photo.src}
                        alt=""
                        onError={e => { e.currentTarget.style.visibility = 'hidden' }}
                        onLoad={e => { e.currentTarget.style.visibility = 'visible' }}
                      />
                    </div>
                  )}
                  <Field label="Alt Metin (erişilebilirlik)">
                    <input className="admin-input" value={photo.alt ?? ''} onChange={e => set('photos', updateAt(photos, i, { alt: e.target.value }))} />
                  </Field>
                  <div className="admin-row">
                    <Field label="Alt Yazı" hint="Fotoğrafın altında küçük gösterilir. Boş bırakılabilir.">
                      <input className="admin-input" value={photo.caption ?? ''} onChange={e => set('photos', updateAt(photos, i, { caption: e.target.value }))} />
                    </Field>
                    <Field label="Odak Noktası" hint="Kırpmada korunacak yer, ör. 50% 30%. Boş = orta.">
                      <input className="admin-input" value={photo.position ?? ''} onChange={e => set('photos', updateAt(photos, i, { position: e.target.value }))} />
                    </Field>
                  </div>
                </ArrayItem>
              ))}
              {photos.length < 3 && <AddButton onClick={() => set('photos', [...photos, emptyPhoto])}>Fotoğraf Ekle</AddButton>}
            </div>
          </Section>

          <Section title="Yazılar">
            <Field label="Büyük Kelime" hint="Bandın başlığı; dev puntoyla gösterilir. Tek kısa kelime en iyi sonucu verir.">
              <input className="admin-input" value={data.backdrop ?? ''} onChange={e => set('backdrop', e.target.value)} placeholder="Human+" />
            </Field>
            <Field label="Kısa Açıklama" hint="Büyük kelimenin altında gösterilir.">
              <textarea className="admin-textarea" value={data.caption ?? ''} onChange={e => set('caption', e.target.value)} rows={2} />
            </Field>
            <Field label="Özet" hint="Fotoğrafların altında, sağ sütunda gösterilir. 2-3 cümle önerilir.">
              <textarea className="admin-textarea" value={data.summary ?? ''} onChange={e => set('summary', e.target.value)} rows={5} />
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
