import { getContent } from '@/lib/content'
import ArrowIcon from '@/components/ArrowIcon'

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' }

export default async function Media() {
  const media = await getContent('media')
  const f     = media.featured ?? {}
  const press = (media.press ?? []).filter(p => p.title)

  return (
    <section className="section surface-black media" id="media" aria-labelledby="media-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="media-title">{media.title}</h2>
        </div>

        <div className="grid-12 media__featured">
          <div className="media__screen">
            {media.featuredBadge && <p className="media__badge">{media.featuredBadge}</p>}

            <div className="media__video">
              {f.videoId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(f.videoId)}`}
                  title={f.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="media__video-placeholder">
                  <div className="media__video-play" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
                      <path d="M8 5.5v13l11-6.5z" />
                    </svg>
                  </div>
                  <span>{media.videoPlaceholder}</span>
                </div>
              )}
            </div>
          </div>

          <div className="media__info">
            <h3 className="media__featured-title">{f.title}</h3>
            <p className="media__featured-source">{[f.source, f.host].filter(Boolean).join(' · ')}</p>
            <p className="media__featured-desc">{f.description}</p>
          </div>
        </div>

        {press.length > 0 && (
          <div className="media__press">
            {media.listTitle && <h3 className="t-subhead">{media.listTitle}</h3>}
            <ul className="press" role="list">
              {press.map((p, i) => {
                const Row      = p.url ? 'a' : 'div'
                const rowProps = p.url ? { href: p.url, ...externalLinkProps } : {}
                return (
                  <li key={i}>
                    <Row className="grid-12 press__item" {...rowProps}>
                      <span className="press__date">{p.date}</span>
                      <h4 className="press__title">{p.title}</h4>
                      <span className="press__meta">{[p.source, p.type].filter(Boolean).join(' · ')}</span>
                      {p.url && <ArrowIcon />}
                    </Row>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
