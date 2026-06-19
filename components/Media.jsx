import { getContent } from '../lib/content'

export default async function Media() {
  const media = await getContent('media')
  const f = media.featured

  return (
    <section className="section section--tinted" id="media" aria-labelledby="media-title">
      <div className="container">
        <div className="section-header reveal">
          <span className="t-eyebrow">{media.eyebrow}</span>
          <h2 className="t-headline" id="media-title">{media.title}</h2>
        </div>

        <div className="media__featured reveal">
          <div className="media__video-frame">
            {f.videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${f.videoId}`}
                allowFullScreen
                title={f.title}
              />
            ) : (
              <div className="media__video-placeholder">
                <div className="media__video-play" aria-label="Video yakında eklenecek">▶</div>
                <span className="t-muted">Yakında eklenecek</span>
              </div>
            )}
          </div>

          <div className="media__featured-info">
            <span className="media__featured-badge">Öne Çıkan</span>
            <h3 className="media__featured-title">{f.title}</h3>
            <p className="media__featured-source">{f.source} · {f.host}</p>
            <p className="media__featured-desc">{f.description}</p>
          </div>
        </div>

        <div className="media__press-grid">
          {media.press.map((p, i) => (
            <div key={p.title} className={`media__press-card reveal reveal--delay-${i + 1}`}>
              <span className="media__press-type">{p.type}</span>
              <h4 className="media__press-title">{p.title}</h4>
              <div className="media__press-meta">
                <span className="media__press-source">{p.source}</span>
                <span className="media__press-date">{p.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
