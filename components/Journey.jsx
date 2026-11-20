import { getContent } from '@/lib/content'

function groupByYear(items) {
  const groups = []
  for (const item of items) {
    const last = groups[groups.length - 1]
    if (last && last.year === item.year) last.items.push(item)
    else groups.push({ year: item.year, items: [item] })
  }
  return groups
}

function yearAnchor(year) {
  return `journey-${String(year).replace(/[^\w-]/g, '')}`
}

export default async function Journey() {
  const journey = await getContent('journey')
  const items   = (journey.items ?? []).filter(item => item.year && item.title)
  if (items.length === 0) return null

  const groups = groupByYear(items)

  return (
    <section className="section journey" id="journey" aria-labelledby="journey-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="journey-title">{journey.title}</h2>
        </div>

        {journey.intro && (
          <div className="grid-12">
            <p className="journey__intro">{journey.intro}</p>
          </div>
        )}

        <ol className="timeline" role="list">
          {groups.map(group => (
            <li key={group.year} className="timeline__year grid-12" id={yearAnchor(group.year)}>
              <p className="timeline__label">{group.year}</p>
              <ul className="timeline__entries" role="list">
                {group.items.map((item, i) => (
                  <li key={i} className="timeline__entry">
                    <div className="timeline__head">
                      <h3 className="timeline__title">{item.title}</h3>
                      {item.track && <p className="timeline__meta">{item.track}</p>}
                    </div>
                    {item.text && <p className="timeline__text">{item.text}</p>}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
