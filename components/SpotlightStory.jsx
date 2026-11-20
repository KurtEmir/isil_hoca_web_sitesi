'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function stateOf(i, active) {
  if (i === active) return ' is-active'
  return i < active ? ' is-past' : ''
}

export default function SpotlightStory({ photos }) {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)
  const count = photos.length

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0

    const update = () => {
      frame = 0
      const stage    = track.firstElementChild
      const pinTop   = parseFloat(getComputedStyle(stage).top) || 0
      const rect     = track.getBoundingClientRect()
      const distance = rect.height - stage.offsetHeight
      const progress = distance > 0 ? Math.min(1, Math.max(0, (pinTop - rect.top) / distance)) : 0
      track.style.setProperty('--story-progress', progress.toFixed(4))
      setActive(Math.min(count - 1, Math.floor(progress * count)))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [count])

  return (
    <div ref={trackRef} className="story" style={{ '--story-count': count }}>
      <div className="story__stage grid-12">
        <div className="story__media">
          {photos.map((photo, i) => (
            <figure key={i} className={`story__photo${stateOf(i, active)}`} style={{ zIndex: i + 1 }}>
              <Image
                src={photo.image.src}
                alt={photo.alt || ''}
                fill
                unoptimized={photo.image.remote}
                className="story__img"
                style={photo.position ? { objectPosition: photo.position } : undefined}
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </figure>
          ))}
        </div>

        <div className="story__copy">
          {count > 1 && (
            <div className="story__progress" aria-hidden="true">
              {photos.map((_, i) => (
                <span key={i} className="story__bar" style={{ '--i': i }} />
              ))}
            </div>
          )}

          <div className="story__texts">
            {photos.map((photo, i) => (
              <div key={i} className={`story__text${stateOf(i, active)}`}>
                {photo.caption && <h3 className="story__caption">{photo.caption}</h3>}
                {photo.text && <p className="story__desc">{photo.text}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
