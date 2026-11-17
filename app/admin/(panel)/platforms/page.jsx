'use client'
import { useSectionContent } from '@/lib/admin/useSectionContent'
import { updateAt, removeAt } from '@/lib/admin/arrays'
import { EditorTopbar, Section, Field, ArrayItem, AddButton, SaveBar, Loading } from '@/components/admin/EditorShell'

const emptyPlatform = { name: '', short: '', focus: '', role: '', description: '', image: '', stats: [], url: '', linkLabel: '' }
const emptyStat     = { value: '', label: '' }

export default function PlatformsEditor() {
  const { data, update, save, saving, msg } = useSectionContent('platforms')
  if (!data) return <Loading />

  const set      = (key, value) => update({ [key]: value })
  const items    = data.items ?? []
  const setItem  = (i, patch) => set('items', updateAt(items, i, patch))
  const setStats = (i, stats) => setItem(i, { stats })

  return (
    <>
      <EditorTopbar icon="◫" title="Platformlar" previewHref="/#platforms" />

      <div className="admin-content">
        <div className="admin-form">
          <Section title="Başlık ve Şema">
            <Field label="Bölüm Başlığı" hint="Satır başı için Enter'a bas.">
              <textarea className="admin-textarea" value={data.title ?? ''} onChange={e => set('title', e.target.value)} rows={2} />
            </Field>
            <Field label="Şemanın Ortasındaki Metin" hint="Ekosistem döngüsünün ortasında gösterilir. İlk satır ince, ikinci satır kalın yazılır; satır başı için Enter'a bas.">
              <textarea className="admin-textarea" value={data.center ?? ''} onChange={e => set('center', e.target.value)} rows={2} />
            </Field>
            <Field label="Şema Açıklaması" hint="Şemanın yanında gösterilir. Şema en az 3 platform olduğunda görünür.">
              <textarea className="admin-textarea" value={data.intro ?? ''} onChange={e => set('intro', e.target.value)} rows={3} />
            </Field>
          </Section>

          <Section title="Platformlar">
            <div className="admin-array">
              {items.map((item, i) => {
                const stats = item.stats ?? []
                return (
                  <ArrayItem key={i} label={`Platform ${i + 1}`} onRemove={() => set('items', removeAt(items, i))}>
                    <div className="admin-row">
                      <Field label="İsim">
                        <input className="admin-input" value={item.name ?? ''} onChange={e => setItem(i, { name: e.target.value })} />
                      </Field>
                      <Field label="Rol / Yıl" hint="İsmin altında kırmızı gösterilir.">
                        <input className="admin-input" value={item.role ?? ''} onChange={e => setItem(i, { role: e.target.value })} placeholder="Kurucu · 2020" />
                      </Field>
                    </div>
                    <div className="admin-row">
                      <Field label="Şemadaki Kısa Ad" hint="Döngü şemasındaki kutuda yazar. Boşsa isim kullanılır.">
                        <input className="admin-input" value={item.short ?? ''} onChange={e => setItem(i, { short: e.target.value })} placeholder="ETZ" />
                      </Field>
                      <Field label="Şemadaki Rolü" hint="Kutunun altındaki kısa ifade.">
                        <input className="admin-input" value={item.focus ?? ''} onChange={e => setItem(i, { focus: e.target.value })} placeholder="Öğretmen gelişir" />
                      </Field>
                    </div>
                    <Field label="Açıklama">
                      <textarea className="admin-textarea" value={item.description ?? ''} onChange={e => setItem(i, { description: e.target.value })} rows={4} />
                    </Field>
                    <Field label="Kart Görseli" hint="/images/... yolu ya da https görsel linki. Boşsa kartta platformun adı büyük yazılır.">
                      <input className="admin-input" value={item.image ?? ''} onChange={e => setItem(i, { image: e.target.value })} placeholder="/images/platforms/teacherx.webp" />
                    </Field>
                    {item.image && (
                      <div className="admin-photo-preview">
                        <img
                          src={item.image}
                          alt=""
                          onError={e => { e.currentTarget.style.visibility = 'hidden' }}
                          onLoad={e => { e.currentTarget.style.visibility = 'visible' }}
                        />
                      </div>
                    )}
                    <div className="admin-row">
                      <Field label="Link (opsiyonel)" hint="Boş bırakılırsa link gösterilmez.">
                        <input className="admin-input" type="url" value={item.url ?? ''} onChange={e => setItem(i, { url: e.target.value })} placeholder="https://…" />
                      </Field>
                      <Field label="Link Metni" hint="Boşsa linkin kendisi yazılır.">
                        <input className="admin-input" value={item.linkLabel ?? ''} onChange={e => setItem(i, { linkLabel: e.target.value })} />
                      </Field>
                    </div>

                    <div className="admin-array">
                      {stats.map((s, j) => (
                        <ArrayItem key={j} label={`Rakam ${j + 1}`} onRemove={() => setStats(i, removeAt(stats, j))}>
                          <div className="admin-row">
                            <Field label="Değer">
                              <input className="admin-input" value={s.value ?? ''} onChange={e => setStats(i, updateAt(stats, j, { value: e.target.value }))} placeholder="50.000+" />
                            </Field>
                            <Field label="Etiket">
                              <input className="admin-input" value={s.label ?? ''} onChange={e => setStats(i, updateAt(stats, j, { label: e.target.value }))} />
                            </Field>
                          </div>
                        </ArrayItem>
                      ))}
                      <AddButton onClick={() => setStats(i, [...stats, emptyStat])}>Rakam Ekle</AddButton>
                    </div>
                  </ArrayItem>
                )
              })}
              <AddButton onClick={() => set('items', [...items, emptyPlatform])}>Platform Ekle</AddButton>
            </div>
          </Section>
        </div>
      </div>

      <SaveBar onSave={save} saving={saving} msg={msg} />
    </>
  )
}
