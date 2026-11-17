'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { EditorTopbar, Section, Field, SaveBar, Loading } from '@/components/admin/EditorShell'

export default function SiteEditor() {
  const { data, update, save, saving, msg } = useSectionContent('site')
  if (!data) return <Loading />

  const set       = (key, value) => update({ [key]: value })
  const setNavCta = (key, value) => update(prev => ({ navCta: { ...prev.navCta, [key]: value } }))
  const setSocial = (key, value) => update(prev => ({
    social: { ...prev.social, [key]: { ...prev.social?.[key], url: value } },
  }))
  const social = data.social ?? {}
  const navCta = data.navCta ?? {}

  return (
    <>
      <EditorTopbar icon="⚙" title="Site Ayarları" previewHref="/" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Kimlik">
            <Field label="İsim" hint="Menü, alt bilgi ve sayfa başlığında kullanılır.">
              <input className="admin-input" value={data.name ?? ''} onChange={e => set('name', e.target.value)} />
            </Field>
            <Field label="Slogan" hint="Alt bilgide isim altında gösterilir.">
              <input className="admin-input" value={data.tagline ?? ''} onChange={e => set('tagline', e.target.value)} />
            </Field>
            <Field label="Kısa Tanım" hint="Sayfa başlığında, paylaşım önizlemelerinde ve alt bilgide kullanılır.">
              <input className="admin-input" value={data.description ?? ''} onChange={e => set('description', e.target.value)} />
            </Field>
          </Section>

          <Section title="Menü Butonu">
            <div className="admin-row">
              <Field label="Buton Metni" hint="Menünün sağındaki buton. Boş bırakılırsa gösterilmez.">
                <input className="admin-input" value={navCta.text ?? ''} onChange={e => setNavCta('text', e.target.value)} placeholder="Konuşmacı Daveti" />
              </Field>
              <Field label="Buton Linki">
                <input className="admin-input" value={navCta.href ?? ''} onChange={e => setNavCta('href', e.target.value)} placeholder="#contact" />
              </Field>
            </div>
          </Section>

          <Section title="Alt Bilgi">
            <div className="admin-row">
              <Field label="Menü Sütunu Başlığı">
                <input className="admin-input" value={data.footerMenuLabel ?? ''} onChange={e => set('footerMenuLabel', e.target.value)} />
              </Field>
              <Field label="Sosyal Medya Sütunu Başlığı">
                <input className="admin-input" value={data.footerSocialLabel ?? ''} onChange={e => set('footerSocialLabel', e.target.value)} />
              </Field>
            </div>
            <Field label="Alt Bilgi Notu" hint="Telif satırının sonunda gösterilir. Boş bırakılabilir.">
              <input className="admin-input" value={data.footerNote ?? ''} onChange={e => set('footerNote', e.target.value)} style={{ maxWidth: 240 }} />
            </Field>
          </Section>

          <Section title="Sosyal Medya">
            {Object.entries(social).map(([key, s]) => (
              <Field key={key} label={s.label ?? key} hint="Boş bırakılırsa link gösterilmez.">
                <input className="admin-input" type="url" value={s.url ?? ''} onChange={e => setSocial(key, e.target.value)} placeholder="https://…" />
              </Field>
            ))}
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
