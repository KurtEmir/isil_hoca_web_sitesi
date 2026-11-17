import { getContent } from '@/lib/content'

export default async function Affiliations() {
  const about = await getContent('about')
  const aff   = about.affiliations ?? {}
  const items = (aff.items ?? []).filter(item => item.name || item.image)

  if (items.length === 0) return null

  return (
    <section
      className="affiliations"
      aria-labelledby={aff.label ? 'affiliations-title' : undefined}
      aria-label={aff.label ? undefined : 'Kurumlar'}
    >
      <div className="container grid-12">
        {aff.label && <h2 className="affiliations__title" id="affiliations-title">{aff.label}</h2>}

        <ul className="affiliations__list" role="list">
          {items.map((item, i) => {
            const content = item.image
              ? <img src={item.image} alt={item.name} loading="lazy" />
              : item.name

            return (
              <li key={i}>
                {item.url ? (
                  <a className="affiliations__item" href={item.url} target="_blank" rel="noopener noreferrer">{content}</a>
                ) : (
                  <span className="affiliations__item">{content}</span>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
