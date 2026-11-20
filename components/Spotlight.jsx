import { Fragment } from 'react'
import Image from 'next/image'
import { getContent } from '@/lib/content'
import { resolveImage } from '@/lib/images'

function collectPhotos(spotlight) {
  const list = (spotlight.photos ?? []).filter(p => p?.src)
  const source = list.length > 0 ? list : spotlight.image ? [{ src: spotlight.image, alt: spotlight.alt }] : []
  return source
    .map(p => ({ ...p, image: resolveImage(p.src) }))
    .filter(p => p.image)
    .slice(0, 3)
}

export default async function Spotlight() {
  const spotlight = await getContent('spotlight')
  const photos    = collectPhotos(spotlight)
  const terms     = (spotlight.equation ?? []).filter(Boolean)
  if (photos.length === 0 && !spotlight.backdrop && !spotlight.summary) return null

  return (
    <section
      className="spotlight surface-red"
      id="spotlight"
      aria-labelledby={spotlight.backdrop ? 'spotlight-title' : undefined}
    >
      <div className="container">
        {photos.length > 0 && (
          <div className={`gallery gallery--${photos.length}`}>
            {photos.map((photo, i) => (
              <figure key={i} className="gallery__item">
                <div className="gallery__frame">
                  <Image
                    src={photo.image.src}
                    alt={photo.alt || ''}
                    fill
                    unoptimized={photo.image.remote}
                    className="gallery__img"
                    style={photo.position ? { objectPosition: photo.position } : undefined}
                    sizes={i === 0 ? '(max-width: 768px) 100vw, 58vw' : '(max-width: 768px) 50vw, 40vw'}
                  />
                </div>
                {photo.caption && <figcaption className="gallery__caption">{photo.caption}</figcaption>}
              </figure>
            ))}
          </div>
        )}

        <div className="grid-12 spotlight__body">
          <div className="spotlight__lead">
            {spotlight.backdrop && <h2 className="spotlight__word" id="spotlight-title">{spotlight.backdrop}</h2>}
            {spotlight.caption && <p className="spotlight__text">{spotlight.caption}</p>}
          </div>

          <div className="spotlight__about">
            {spotlight.summary && <p className="spotlight__summary">{spotlight.summary}</p>}

            {terms.length > 1 && (
              <p className="equation">
                {terms.map((term, i) => {
                  const isResult = i === terms.length - 1
                  const termEl = <span className={`equation__term${isResult ? ' equation__term--result' : ''}`}>{term}</span>
                  return i === 0
                    ? <Fragment key={i}>{termEl}</Fragment>
                    : (
                      <span key={i} className="equation__pair">
                        <span className="equation__op">{isResult ? '=' : '+'}</span>
                        {termEl}
                      </span>
                    )
                })}
              </p>
            )}

            {spotlight.captionSource && <p className="spotlight__source">{spotlight.captionSource}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
