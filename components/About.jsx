import { getContent } from '../lib/content'

export default async function About() {
  const about = await getContent('about')
  return (
    <section className="section section--tinted" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-header reveal">
          <span className="t-eyebrow">{about.eyebrow}</span>
          <h2 className="t-headline" id="about-title">{about.title}</h2>
        </div>

        <div className="about__grid">
          <div className="about__bio reveal">
            {about.bio.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="about__stats">
            {about.stats.map((s, i) => (
              <div key={s.label} className={`about__stat reveal reveal--delay-${i + 1}`}>
                <div className="about__stat-value">{s.value}</div>
                <div className="about__stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="about__roles-title reveal">Kuruculuk &amp; Danışmanlık Rolleri</p>

        <div className="about__roles">
          {about.roles.map((r, i) => (
            <div key={r.org} className={`about__role reveal reveal--delay-${(i % 4) + 1}`}>
              <div className="about__role-label">{r.role}</div>
              <div className="about__role-org">{r.org}</div>
              <p className="about__role-desc">{r.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
