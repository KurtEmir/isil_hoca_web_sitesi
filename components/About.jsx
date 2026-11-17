import { getContent } from '@/lib/content'

export default async function About() {
  const about = await getContent('about')
  const [lead, ...rest] = (about.bio ?? []).filter(Boolean)
  const roles = (about.roles ?? []).filter(r => r.org || r.role)

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="about-title">{about.title}</h2>
        </div>

        <div className="grid-12 about__body">
          {lead && <p className="about__lead">{lead}</p>}

          {rest.length > 0 && (
            <div className="about__more">
              {rest.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}

          {roles.length > 0 && (
            <div className="roles">
              {about.rolesTitle && <h3 className="t-subhead">{about.rolesTitle}</h3>}
              <ul className="roles__list" role="list">
                {roles.map((r, i) => (
                  <li key={i} className="grid-12 roles__item">
                    <h4 className="roles__org">{r.org}</h4>
                    {r.role && <p className="roles__role">{r.role}</p>}
                    {r.description && <p className="roles__desc">{r.description}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
