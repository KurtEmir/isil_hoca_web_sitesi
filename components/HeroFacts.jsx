'use client'
import { useEffect, useRef, useState } from 'react'

const COUNT_DURATION = 1600
const COUNT_STEP     = 140

function parseValue(value) {
  const match = String(value).match(/^(\D*)(\d+)(.*)$/)
  if (!match) return null
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] }
}

function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

function CountingValue({ value, state, delay }) {
  const parsed = parseValue(value)
  const [current, setCurrent] = useState(null)

  useEffect(() => {
    if (state !== 'run' || !parsed) return
    let frame
    let start
    const tick = (now) => {
      start ??= now + delay
      const progress = Math.max(0, (now - start) / COUNT_DURATION)
      setCurrent(Math.round(parsed.target * easeOutExpo(progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [state])

  if (!parsed || state === 'idle') return value
  if (current === null) return `${parsed.prefix}0${parsed.suffix}`
  return `${parsed.prefix}${current}${parsed.suffix}`
}

export default function HeroFacts({ stats }) {
  const listRef = useRef(null)
  const [state, setState] = useState('idle')

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const list = listRef.current
    setState('armed')
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      setState('run')
      observer.disconnect()
    }, { threshold: 0.4 })
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  return (
    <ul ref={listRef} className={`hero__facts is-${state}`} role="list">
      {stats.map((s, i) => (
        <li key={i} className="hero__fact" style={{ '--i': i }}>
          <span className="hero__fact-value">
            <span className="sr-only">{s.value}</span>
            <span aria-hidden="true">
              <CountingValue value={s.value} state={state} delay={i * COUNT_STEP} />
            </span>
          </span>
          <span className="hero__fact-label">{s.label}</span>
        </li>
      ))}
    </ul>
  )
}
