import { getContent } from '@/lib/content'

export default async function Expertise() {
  const expertise = await getContent('expertise')
  const items     = (expertise.items ?? []).filter(item => item.title)

  return (
    <section className="section expertise" id="expertise" aria-labelledby="expertise-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="expertise-title">{expertise.title}</h2>
        </div>

        <ul className="topics" role="list">
          {items.map((item, i) => (
            <li key={i} className="grid-12 topics__item">
              <h3 className="topics__title">{item.title}</h3>
              {item.description && <p className="topics__desc">{item.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
