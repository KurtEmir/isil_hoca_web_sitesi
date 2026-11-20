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

function MetroMap({ tracks, groups }) {
  const years = groups.map(g => g.year)

  const rows = tracks
    .map((name, trackIndex) => {
      const stops = years.map(year =>
        groups.find(g => g.year === year).items.filter(item => item.track === name)
      )
      const used  = stops.map((s, i) => (s.length ? i : -1)).filter(i => i >= 0)
      if (used.length === 0) return null
      return { name, trackIndex, stops, first: used[0], last: used[used.length - 1] }
    })
    .filter(Boolean)

  if (rows.length === 0) return null

  return (
    <figure className="metro" aria-hidden="true">
      <div className="metro__scroll">
        <div className="metro__grid" style={{ '--cols': years.length }}>
          <span className="metro__corner" />
          {years.map(year => (
            <span key={year} className="metro__year">{year}</span>
          ))}

          {rows.map(row => (
            <div key={row.name} className={`metro__row metro__row--${row.trackIndex % 3}`}>
              <span className="metro__track">
                <span className="metro__swatch" />
                {row.name}
              </span>
              {row.stops.map((stop, i) => {
                const onLine = i >= row.first && i <= row.last
                const classes = [
                  'metro__cell',
                  onLine && 'is-on-line',
                  i === row.first && 'is-first',
                  i === row.last && 'is-last',
                  stop.length > 0 && 'has-stop',
                  stop.length > 1 && 'is-hub',
                ].filter(Boolean).join(' ')

                return (
                  <span key={i} className={classes}>
                    {stop.length > 0 && (
                      <a className="metro__stop" href={`#${yearAnchor(years[i])}`} tabIndex={-1}>
                        <span className="metro__mark">{stop.length > 1 ? stop.length : ''}</span>
                        <span className="metro__names">
                          {stop.map((item, k) => <span key={k} className="metro__name">{item.title}</span>)}
                        </span>
                      </a>
                    )}
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </figure>
  )
}

export default async function Journey() {
  const journey = await getContent('journey')
  const items   = (journey.items ?? []).filter(item => item.year && item.title)
  if (items.length === 0) return null

  const tracks = (journey.tracks ?? []).filter(Boolean)
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

        {tracks.length > 0 && <MetroMap tracks={tracks} groups={groups} />}

        <ol className="chronicle" role="list">
          {groups.map(group => (
            <li key={group.year} className="chronicle__year grid-12" id={yearAnchor(group.year)}>
              <p className="chronicle__label">{group.year}</p>
              <ul className="chronicle__entries" role="list">
                {group.items.map((item, i) => {
                  const trackIndex = tracks.indexOf(item.track)
                  return (
                    <li key={i} className="chronicle__entry">
                      <div className="chronicle__head">
                        <h3 className="chronicle__title">{item.title}</h3>
                        {trackIndex >= 0 && (
                          <span className={`chronicle__track chronicle__track--${trackIndex % 3}`}>{item.track}</span>
                        )}
                      </div>
                      {item.text && <p className="chronicle__text">{item.text}</p>}
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
