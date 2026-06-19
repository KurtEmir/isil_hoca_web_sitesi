import { getContent } from '../lib/content'

export default async function Expertise() {
  const expertise = await getContent('expertise')
  return (
    <section className="section" id="expertise" aria-labelledby="expertise-title">
      <div className="container">
        <div className="section-header section-header--center reveal">
          <span className="t-eyebrow">{expertise.eyebrow}</span>
          <h2 className="t-headline" id="expertise-title">{expertise.title}</h2>
        </div>

        <div className="expertise__grid">
          {expertise.items.map((item, i) => (
            <article
              key={item.title}
              className={`expertise__card reveal reveal--delay-${(i % 3) + 1}`}
            >
              <span className="expertise__icon" aria-hidden="true">{item.icon}</span>
              <h3 className="expertise__card-title">{item.title}</h3>
              <p className="expertise__card-desc">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
