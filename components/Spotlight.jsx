import { Fragment } from 'react'
import Image from 'next/image'
import { getContent } from '@/lib/content'
import { resolveImage } from '@/lib/images'
import DuotoneFilter from '@/components/DuotoneFilter'

export default async function Spotlight() {
  const spotlight = await getContent('spotlight')
  const image     = resolveImage(spotlight.image)
  const terms     = (spotlight.equation ?? []).filter(Boolean)
  if (!image && !spotlight.backdrop && !spotlight.caption) return null

  return (
    <section
      className="spotlight surface-red"
      id="spotlight"
      aria-labelledby={spotlight.backdrop ? 'spotlight-title' : undefined}
    >
      <DuotoneFilter id="spotlight-duotone" />

      <div className="container grid-12 spotlight__inner">
        {image && (
          <figure className="spotlight__photo">
            <Image
              src={image.src}
              alt={spotlight.alt || ''}
              fill
              unoptimized={image.remote}
              className="spotlight__photo-img"
              sizes="(max-width: 768px) 70vw, 32vw"
            />
          </figure>
        )}

        <div className="spotlight__body">
          {spotlight.backdrop && <h2 className="spotlight__word" id="spotlight-title">{spotlight.backdrop}</h2>}
          {spotlight.caption && <p className="spotlight__text">{spotlight.caption}</p>}

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
    </section>
  )
}
