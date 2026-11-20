import Image from 'next/image'
import { getContent } from '@/lib/content'
import { resolveImage } from '@/lib/images'
import ArrowIcon from '@/components/ArrowIcon'
import HeroFacts from '@/components/HeroFacts'

const WEIGHT_FROM = 300
const WEIGHT_TO   = 800

function splitTitle(title, grow) {
  if (!grow || !title.includes(grow)) return null
  const index = title.indexOf(grow)
  return { start: title.slice(0, index), grow, end: title.slice(index + grow.length) }
}

function GrowingWord({ text }) {
  const letters = Array.from(text)
  const steps   = Math.max(letters.length - 1, 1)

  return (
    <span className="grow">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {letters.map((letter, i) => (
          <span
            key={i}
            className="grow__letter"
            style={{ '--w': Math.round(WEIGHT_FROM + ((WEIGHT_TO - WEIGHT_FROM) * i) / steps), '--i': i }}
          >
            {letter}
          </span>
        ))}
      </span>
    </span>
  )
}

export default async function Hero() {
  const hero  = await getContent('hero')
  const photo = resolveImage(hero.photo?.src)
  const ctas  = (hero.cta ?? []).filter(c => c.text && c.href)
  const stats = (hero.stats ?? []).filter(s => s.value)
  const title = hero.tagline || hero.name
  const parts = splitTitle(title, hero.taglineHighlight)
  const roles = (hero.eyebrow ?? '').split('·').map(r => r.trim()).filter(Boolean)

  return (
    <section className={`hero surface-red${photo ? '' : ' hero--no-photo'}`} id="home" aria-labelledby="hero-title">
      <div className="container grid-12 hero__stage">
        <div className="hero__copy">
          <div className="hero__poster">
            <p className="hero__title">
              {parts ? (
                <>
                  {parts.start && <span className="hero__title-start">{parts.start}</span>}
                  <GrowingWord text={parts.grow} />
                  {parts.end && <span className="hero__title-end">{parts.end}</span>}
                </>
              ) : title}
            </p>
          </div>

          {hero.lead && <p className="hero__lead">{hero.lead}</p>}

          <div className="hero__side">
            <div className="hero__byline">
              <h1 className="hero__name" id="hero-title">{hero.name}</h1>
              {roles.length > 0 && (
                <p className="hero__roles">
                  {roles.map((role, i) => (
                    <span key={i} className="hero__role">{role}</span>
                  ))}
                </p>
              )}
            </div>

            {ctas.length > 0 && (
              <div className="hero__act">
                {ctas.map((c, i) => (
                  c.variant === 'secondary'
                    ? <a key={i} className="link" href={c.href} data-topic={c.topic || undefined}>{c.text}</a>
                    : <a key={i} className="btn btn--light" href={c.href} data-topic={c.topic || undefined}>{c.text}<ArrowIcon /></a>
                ))}
              </div>
            )}
          </div>
        </div>

        {photo && (
          <figure className="hero__figure">
            <Image
              src={photo.src}
              alt={hero.photo?.alt || hero.name}
              fill
              priority
              unoptimized={photo.remote}
              className="hero__figure-img"
              sizes="(max-width: 768px) 100vw, 45vw"
            />
          </figure>
        )}
      </div>

      {stats.length > 0 && (
        <div className="hero__ground">
          <div className="container">
            <HeroFacts stats={stats} />
          </div>
        </div>
      )}
    </section>
  )
}
