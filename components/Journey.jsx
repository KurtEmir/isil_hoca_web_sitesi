import { getContent } from '@/lib/content'

export default async function Journey() {
  const journey = await getContent('journey')
  const items   = (journey.items ?? []).filter(item => item.year || item.title)
  if (items.length === 0) return null

  return (
    <section className="section journey" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="journey-title">{journey.title}</h2>
        </div>

        <ol className="journey__line" role="list">
          {items.map((item, i) => (
            <li key={i} className="journey__stop">
              <span className="journey__year">{item.year}</span>
              <span className="journey__mark" aria-hidden="true" />
              <h3 className="journey__title">{item.title}</h3>
              {item.text && <p className="journey__text">{item.text}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
