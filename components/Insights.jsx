import { getContent } from '../lib/content'

export default async function Insights() {
  const insights = await getContent('insights')
  return (
    <section className="section" id="insights" aria-labelledby="insights-title">
      <div className="container">
        <div className="insights__header">
          <div className="reveal">
            <span className="t-eyebrow">{insights.eyebrow}</span>
            <h2 className="t-headline" id="insights-title">{insights.title}</h2>
          </div>
          <a className="btn btn--secondary reveal" href={insights.cta.href}>
            {insights.cta.text}
          </a>
        </div>

        <div className="insights__grid">
          {insights.articles.map((a, i) => (
            <article key={a.title} className={`insights__card reveal reveal--delay-${i + 1}`}>
              <div className="insights__card-image" aria-hidden="true">✦</div>
              <div className="insights__card-body">
                <span className="insights__category">{a.category}</span>
                <h3 className="insights__card-title">{a.title}</h3>
                <p className="insights__card-excerpt">{a.excerpt}</p>
                <div className="insights__card-footer">
                  <span className="insights__card-meta">{a.date} · {a.readTime} okuma</span>
                  <a href="#" className="insights__read-more">Oku →</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
