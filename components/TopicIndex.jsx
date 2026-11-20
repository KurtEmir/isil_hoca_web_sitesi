'use client'
import { useEffect, useRef, useState } from 'react'

export default function TopicIndex({ items }) {
  const [active, setActive] = useState(0)
  const rowsRef = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) setActive(Number(entry.target.dataset.index))
      }),
      { rootMargin: '-45% 0px -54% 0px' }
    )
    rowsRef.current.forEach(row => row && observer.observe(row))
    return () => observer.disconnect()
  }, [items.length])

  return (
    <div className="grid-12 topics">
      <div className="topics__panel" aria-hidden="true">
        <p className="topics__count">
          <span className="topics__count-now">{String(active + 1).padStart(2, '0')}</span>
          <span className="topics__count-total">/ {String(items.length).padStart(2, '0')}</span>
        </p>
        <div className="topics__panel-texts">
          {items.map((item, i) => (
            <p key={i} className={`topics__panel-text${i === active ? ' is-active' : ''}`}>{item.description}</p>
          ))}
        </div>
        <div className="topics__meter">
          <span className="topics__meter-fill" style={{ '--topic-progress': (active + 1) / items.length }} />
        </div>
      </div>

      <ul className="topics__list" role="list">
        {items.map((item, i) => (
          <li
            key={i}
            ref={el => { rowsRef.current[i] = el }}
            data-index={i}
            className={`topics__item${i === active ? ' is-active' : ''}`}
            onMouseEnter={() => setActive(i)}
          >
            <h3 className="topics__title">{item.title}</h3>
            {item.description && <p className="topics__desc">{item.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}
