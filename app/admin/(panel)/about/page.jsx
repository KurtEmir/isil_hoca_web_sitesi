'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, replaceAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyRole        = { org: '', role: '', description: '' }
const emptyAffiliation = { name: '', url: '', image: '' }

export default function AboutEditor() {
  const { data, update, save, saving, msg } = useSectionContent('about')
  if (!data) return <Loading />

  const set = (key, value) => update({ [key]: value })
  const setAffiliations = (patch) => update(prev => ({ affiliations: { ...prev.affiliations, ...patch } }))

  const bio          = data.bio   ?? []
  const roles        = data.roles ?? []
  const affiliations = data.affiliations ?? {}
  const affItems     = affiliations.items ?? []

  return (
    <>
      <EditorTopbar icon="◉" title="Hakkımda Bölümü" previewHref="/#about" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Başlık">
            <Field label="Bölüm Başlığı" hint="Satır başı için Enter'a bas.">
              <textarea className="admin-textarea" value={data.title ?? ''} onChange={e => set('title', e.target.value)} rows={2} />
            </Field>
          </Section>

          <Section title="Biyografi Paragrafları">
            <div className="admin-array">
              {bio.map((p, i) => (
                <ArrayItem key={i} label={i === 0 ? 'Giriş Paragrafı (büyük gösterilir)' : `Paragraf ${i + 1}`} onRemove={bio.length > 1 ? () => set('bio', removeAt(bio, i)) : undefined}>
                  <textarea className="admin-textarea" value={p} onChange={e => set('bio', replaceAt(bio, i, e.target.value))} rows={3} />
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('bio', [...bio, ''])}>Paragraf Ekle</AddButton>
            </div>
          </Section>

          <Section title="Roller">
            <Field label="Roller Başlığı">
              <input className="admin-input" value={data.rolesTitle ?? ''} onChange={e => set('rolesTitle', e.target.value)} />
            </Field>
            <div className="admin-array">
              {roles.map((r, i) => (
                <ArrayItem key={i} label={`Rol ${i + 1}`} onRemove={() => set('roles', removeAt(roles, i))}>
                  <div className="admin-row">
                    <Field label="Kurum / Platform">
                      <input className="admin-input" value={r.org ?? ''} onChange={e => set('roles', updateAt(roles, i, { org: e.target.value }))} />
                    </Field>
                    <Field label="Rol / Ünvan">
                      <input className="admin-input" value={r.role ?? ''} onChange={e => set('roles', updateAt(roles, i, { role: e.target.value }))} />
                    </Field>
                  </div>
                  <Field label="Açıklama">
                    <textarea className="admin-textarea" value={r.description ?? ''} onChange={e => set('roles', updateAt(roles, i, { description: e.target.value }))} rows={2} />
                  </Field>
                </ArrayItem>
              ))}
              <AddButton onClick={() => set('roles', [...roles, emptyRole])}>Rol Ekle</AddButton>
            </div>
          </Section>

          <Section title="Kurumlar & Yayınlar">
            <Field label="Liste Başlığı" hint="Uzmanlık bölümünün altındaki kurum listesinin solunda gösterilir.">
              <input className="admin-input" value={affiliations.label ?? ''} onChange={e => setAffiliations({ label: e.target.value })} />
            </Field>
            <div className="admin-array">
              {affItems.map((item, i) => (
                <ArrayItem key={i} label={`Kurum ${i + 1}`} onRemove={() => setAffiliations({ items: removeAt(affItems, i) })}>
                  <div className="admin-row">
                    <Field label="İsim" hint="Logo görseli yoksa bu isim yazı olarak gösterilir; logo varsa görselin alt metni olur.">
                      <input className="admin-input" value={item.name ?? ''} onChange={e => setAffiliations({ items: updateAt(affItems, i, { name: e.target.value }) })} />
                    </Field>
                    <Field label="Link (opsiyonel)">
                      <input className="admin-input" type="url" value={item.url ?? ''} onChange={e => setAffiliations({ items: updateAt(affItems, i, { url: e.target.value }) })} placeholder="https://…" />
                    </Field>
                  </div>
                  <Field label="Logo Görseli (opsiyonel)" hint="/images/logo.svg gibi bir yol ya da https görsel linki. Doluysa isim yerine logo gösterilir.">
                    <input className="admin-input" value={item.image ?? ''} onChange={e => setAffiliations({ items: updateAt(affItems, i, { image: e.target.value }) })} placeholder="/images/kurum-logo.svg" />
                  </Field>
                </ArrayItem>
              ))}
              <AddButton onClick={() => setAffiliations({ items: [...affItems, emptyAffiliation] })}>Kurum Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
