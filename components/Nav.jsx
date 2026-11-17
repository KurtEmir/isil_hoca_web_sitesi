'use client'
import { useState, useEffect, useCallback, useRef } from 'react'
import { navItems, skipLink } from '@/content/navigation'

export default function Nav({ site }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuBtnRef = useRef(null)
  const drawerRef  = useRef(null)
  const cta    = site.navCta ?? {}
  const hasCta = Boolean(cta.text && cta.href)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    if (!menuOpen) return

    const focusables = () => [menuBtnRef.current, ...drawerRef.current.querySelectorAll('a')].filter(Boolean)
    focusables()[1]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        menuBtnRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables()
      const index = items.indexOf(document.activeElement)
      const next  = e.shiftKey
        ? (index <= 0 ? items.length - 1 : index - 1)
        : (index === -1 || index === items.length - 1 ? 0 : index + 1)
      e.preventDefault()
      items[next].focus()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const followLink = useCallback((event) => {
    setMenuOpen(false)
    const target = document.querySelector(event.currentTarget.getAttribute('href'))
    if (!target) return
    target.setAttribute('tabindex', '-1')
    target.setAttribute('data-focus-target', '')
    target.focus({ preventScroll: true })
  }, [])
  const toggleMenu = useCallback(() => setMenuOpen(open => !open), [])

  return (
    <header>
      <a className="skip-link" href={skipLink.href}>{skipLink.text}</a>
      <nav
        className={`nav${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-open surface-red' : ''}`}
        aria-label="Ana navigasyon"
      >
        <div className="nav__inner">
          <a className="nav__logo" href="#home" aria-label={`${site.name} — Ana Sayfa`}>
            {site.name}
          </a>

          <ul className="nav__links" role="list">
            {navItems.map(item => (
              <li key={item.href}>
                <a className="nav__link" href={item.href}>{item.text}</a>
              </li>
            ))}
          </ul>

          <div className="nav__actions">
            {hasCta && (
              <a className="btn btn--sm nav__cta" href={cta.href}>{cta.text}</a>
            )}

            <button
              ref={menuBtnRef}
              className={`nav__menu-btn${menuOpen ? ' is-open' : ''}`}
              onClick={toggleMenu}
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div
        ref={drawerRef}
        id="mobile-menu"
        className={`nav__drawer surface-red${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        aria-modal={menuOpen || undefined}
        role="dialog"
        aria-label="Mobil menü"
      >
        {navItems.map(item => (
          <a
            key={item.href}
            className="nav__drawer-link"
            href={item.href}
            onClick={followLink}
            tabIndex={menuOpen ? 0 : -1}
          >
            {item.text}
          </a>
        ))}

        {hasCta && (
          <a
            className="btn btn--light nav__drawer-cta"
            href={cta.href}
            onClick={followLink}
            tabIndex={menuOpen ? 0 : -1}
          >
            {cta.text}
          </a>
        )}
      </div>
    </header>
  )
}
