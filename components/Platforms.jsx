import Image from 'next/image'
import { getContent } from '@/lib/content'
import { resolveImage } from '@/lib/images'
import ArrowIcon from '@/components/ArrowIcon'
import EcosystemDiagram from '@/components/EcosystemDiagram'

export default async function Platforms() {
  const platforms = await getContent('platforms')
  const items     = (platforms.items ?? []).filter(item => item.name)
  if (items.length === 0) return null

  const showDiagram = items.length >= 3

  return (
    <section className="section surface-black platforms" id="platforms" aria-labelledby="platforms-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="platforms-title">{platforms.title}</h2>
        </div>

        {showDiagram && (
          <div className="grid-12 ecosystem">
            <div className="ecosystem__figure">
              <EcosystemDiagram items={items} center={platforms.center} titleId="ecosystem-title" />
            </div>
            {platforms.intro && <p className="ecosystem__intro">{platforms.intro}</p>}
          </div>
        )}

        <ul className="pcards" role="list">
          {items.map((item, i) => {
            const image = resolveImage(item.image)
            const stats = (item.stats ?? []).filter(s => s.value)
            return (
              <li key={i} className="pcard">
                <div className={`pcard__media${image ? '' : ' pcard__media--type'}`}>
                  {image ? (
                    <Image
                      src={image.src}
                      alt={item.name}
                      fill
                      unoptimized={image.remote}
                      className="pcard__img"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <span className="pcard__mark" aria-hidden="true">{item.short || item.name}</span>
                  )}
                </div>

                <div className="pcard__body">
                  <h3 className="pcard__name">{item.name}</h3>
                  {item.role && <p className="pcard__role">{item.role}</p>}
                  {item.description && <p className="pcard__desc">{item.description}</p>}

                  {(stats.length > 0 || item.url) && (
                    <div className="pcard__foot">
                      {stats.length > 0 && (
                        <ul className="pcard__stats" role="list">
                          {stats.map((s, j) => (
                            <li key={j} className="pcard__stat">
                              <span className="pcard__stat-value">{s.value}</span>
                              <span className="pcard__stat-label">{s.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {item.url && (
                        <a className="link pcard__link" href={item.url} target="_blank" rel="noopener noreferrer">
                          {item.linkLabel || item.url}<ArrowIcon />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
