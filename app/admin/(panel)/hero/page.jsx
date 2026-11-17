'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

export default function HeroEditor() {
  const { data, update, save, saving, msg } = useSectionContent('hero')
  if (!data) return <Loading />

  const photo    = data.photo ?? {}
  const stats    = data.stats ?? []
  const set      = (key, value) => update({ [key]: value })
  const setPhoto = (key, value) => update(prev => ({ photo: { ...prev.photo, [key]: value } }))
  const setCta   = (i, key, value) => update(prev => ({ cta: updateAt(prev.cta, i, { [key]: value }) }))

  return (
    <>
      <EditorTopbar icon="◈" title="Hero Bölümü" previewHref="/#home" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="İmza Satırı">
            <Field label="İsim" hint="Fotoğrafın yanındaki imza satırında gösterilir.">
              <input className="admin-input" value={data.name ?? ''} onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Ünvanlar" hint="İsmin altında gösterilir. Ünvanları · ile ayır.">
              <input className="admin-input" value={data.eyebrow ?? ''} onChange={e => set('eyebrow', e.target.value)} />
            </Field>
          </Section>

          <Section title="Başlık ve Alıntı">
            <Field label="Ana Başlık (Tagline)" hint="Kırmızı afişteki dev slogan. Satır başı için Enter'a bas; site aynı satır kırılımını gösterir. Büyüyen kısımdan öncesi ince, sonrası kalın yazılır.">
              <textarea className="admin-textarea" value={data.tagline ?? ''} onChange={e => set('tagline', e.target.value)} rows={3} />
            </Field>
            <Field label="Büyüyen Kısım" hint="Bu kısmın harfleri inceden kalına doğru büyür (gelişim animasyonu). Başlıkta birebir geçmeli; boş bırakılırsa başlığın tamamı kalın yazılır.">
              <input className="admin-input" value={data.taglineHighlight ?? ''} onChange={e => set('taglineHighlight', e.target.value)} />
            </Field>
            <Field label="Alıntı / Quote" hint="Başlığın altında, fotoğrafın yanında gösterilir. Tırnak işaretleri otomatik eklenir.">
              <textarea className="admin-textarea" value={data.quote ?? ''} onChange={e => set('quote', e.target.value)} rows={3} />
            </Field>
          </Section>

          <Section title="Profil Fotoğrafı">
            <Field
              label="Görsel"
              hint="public/images altındaki bir dosya yolu (/images/foto.jpg) ya da doğrudan görsel dosyasına giden https linki (.jpg, .png, .webp). Hero'nun sağında büyük ve renkli gösterilir. Arka planı silinmiş (dekupe, şeffaf PNG/WebP) dikey bir fotoğraf en iyi sonucu verir; en az 1000px yükseklik önerilir."
            >
              <input
                className="admin-input"
                value={photo.src ?? ''}
                onChange={e => setPhoto('src', e.target.value)}
                placeholder="/images/isil-boy-ergul-dekupe.webp"
              />
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
              <input className="admin-input" value={photo.alt ?? ''} onChange={e => setPhoto('alt', e.target.value)} />
            </Field>
          </Section>

          <Section title="Butonlar (CTA)">
            {(data.cta ?? []).map((c, i) => (
              <ArrayItem key={i} label={i === 0 ? 'Ana Buton' : 'İkincil Link'}>
                <div className="admin-row">
                  <Field label="Metin">
                    <input className="admin-input" value={c.text ?? ''} onChange={e => setCta(i, 'text', e.target.value)} />
                  </Field>
                  <Field label="Link (href)" hint="Boş bırakılırsa gösterilmez.">
                    <input className="admin-input" value={c.href ?? ''} onChange={e => setCta(i, 'href', e.target.value)} placeholder="#contact" />
                  </Field>
                </div>
              </ArrayItem>
            ))}
          </Section>

          <Section title="Rakamlar">
            <div className="admin-array">
              {stats.map((s, i) => (
                <ArrayItem key={i} label={`Rakam ${i + 1}`} onRemove={() => set('stats', removeAt(stats, i))}>
                  <div className="admin-row">
                    <Field label="Değer">
                      <input className="admin-input" value={s.value ?? ''} onChange={e => set('stats', updateAt(stats, i, { value: e.target.value }))} placeholder="20+" />
                    </Field>
                    <Field label="Etiket">
                      <input className="admin-input" value={s.label ?? ''} onChange={e => set('stats', updateAt(stats, i, { label: e.target.value }))} />
                    </Field>
                  </div>
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('stats', [...stats, { value: '', label: '' }])}>Rakam Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
