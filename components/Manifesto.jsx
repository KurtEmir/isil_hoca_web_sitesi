import { getContent } from '@/lib/content'

export default async function Manifesto() {
  const manifesto = await getContent('manifesto')
  const items     = (manifesto.items ?? []).filter(item => item.title)
  if (items.length === 0) return null

  return (
    <section className="section surface-black manifesto" id="manifesto" aria-labelledby="manifesto-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="manifesto-title">{manifesto.title}</h2>
        </div>

        <ul className="manifesto__list" role="list">
          {items.map((item, i) => (
            <li key={i} className="grid-12 manifesto__item">
              <h3 className="manifesto__statement">{item.title}</h3>
              {item.text && <p className="manifesto__text">{item.text}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
