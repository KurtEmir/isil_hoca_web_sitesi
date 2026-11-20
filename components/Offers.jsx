import { getContent } from '@/lib/content'
import ArrowIcon from '@/components/ArrowIcon'
import Icon from '@/components/Icon'

export default async function Offers() {
  const offers = await getContent('offers')
  const items  = (offers.items ?? []).filter(item => item.title)
  if (items.length === 0) return null

  return (
    <section className="section offers" id="offers" aria-labelledby="offers-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="offers-title">{offers.title}</h2>
        </div>

        <ul className="offers__list" role="list">
          {items.map((item, i) => {
            const cta = item.cta ?? {}
            return (
              <li key={i} className="offers__item">
                <Icon name={item.icon} className="offers__icon" />
                <h3 className="offers__title">{item.title}</h3>
                {item.description && <p className="offers__desc">{item.description}</p>}
                {item.audience && <p className="offers__audience">{item.audience}</p>}
                {cta.text && cta.href && (
                  <a className="link offers__cta" href={cta.href} data-topic={item.topic || undefined}>{cta.text}<ArrowIcon /></a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
