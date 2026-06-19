import Image from 'next/image'
import { existsSync } from 'fs'
import { join } from 'path'
import { getContent } from '../lib/content'

export default async function Hero() {
  const hero = await getContent('hero')
  const photoPath   = join(process.cwd(), 'public/images/isil-boy-ergul.jpg')
  const photoExists = existsSync(photoPath)

  return (
    <section className="hero" id="home" aria-label="Tanıtım">
      <div className="hero__content">
        <div className="hero__eyebrow">
          <span className="hero__eyebrow-dot" aria-hidden="true" />
          <span className="t-eyebrow">{hero.eyebrow}</span>
        </div>

        <h1 className="hero__name">
          {hero.name.split('Işıl')[0]}
          <em>Işıl</em>
          {hero.name.split('Işıl')[1]}
        </h1>

        <p className="hero__tagline">{hero.tagline}</p>

        <p className="hero__quote">&ldquo;{hero.quote}&rdquo;</p>

        <div className="btn-row">
          {hero.cta.map(c => (
            <a key={c.href} className={`btn btn--${c.variant}`} href={c.href}>
              {c.text}
            </a>
          ))}
        </div>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="hero__photo-frame">
          {photoExists ? (
            <Image
              src="/images/isil-boy-ergul.jpg"
              alt={hero.photo.alt}
              fill
              priority
              className="hero__photo-img"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="hero__photo-placeholder">
              <span className="hero__photo-placeholder-initials">IBE</span>
              <span className="hero__photo-placeholder-label">Dr. Işıl Boy Ergül</span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
