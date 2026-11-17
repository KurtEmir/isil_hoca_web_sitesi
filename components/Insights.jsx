import { getContent } from '@/lib/content'
import ArrowIcon from '@/components/ArrowIcon'

const isExternal = (href) => /^https?:\/\//i.test(href)
const linkProps  = (href) => (isExternal(href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})

export default async function Insights() {
  const insights = await getContent('insights')
  const cta      = insights.cta
  const hasCta   = Boolean(cta?.href && cta.href !== '#' && cta.text)
  const articles = (insights.articles ?? []).filter(a => a.title)

  return (
    <section className="section" id="insights" aria-labelledby="insights-title">
      <div className="container">
        <div className="section-head insights__head">
          <h2 className="t-heading" id="insights-title">{insights.title}</h2>
          {hasCta && (
            <a className="link" href={cta.href} {...linkProps(cta.href)}>
              {cta.text}<ArrowIcon />
            </a>
          )}
        </div>

        <ul className="grid-12 essays" role="list">
          {articles.map((a, i) => (
            <li key={i} className="essays__item">
              <h3 className="essays__title">
                {a.url ? <a href={a.url} {...linkProps(a.url)}>{a.title}</a> : a.title}
              </h3>
              {a.excerpt && <p className="essays__excerpt">{a.excerpt}</p>}
              <p className="essays__meta">
                {a.category && <span className="essays__category">{a.category}</span>}
                <span>{[a.date, a.readTime ? `${a.readTime} okuma` : null].filter(Boolean).join(' · ')}</span>
              </p>
              {a.url && (
                <a
                  className="link essays__more"
                  href={a.url}
                  {...linkProps(a.url)}
                  aria-label={`${a.title} — ${insights.readMoreLabel}`}
                >
                  {insights.readMoreLabel}<ArrowIcon />
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
