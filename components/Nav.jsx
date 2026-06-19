'use client'
import { useState, useEffect } from 'react'
import { site } from '../content/data'

const navItems = [
  { text: 'Hakkımda',  href: '#about'     },
  { text: 'Uzmanlık',  href: '#expertise' },
  { text: 'Medya',     href: '#media'     },
  { text: 'Görüşler',  href: '#insights'  },
  { text: 'İletişim',  href: '#contact'   },
]

export default function Nav() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  const toggleMenu = () => {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <header>
      <nav
        className={`nav${scrolled ? ' is-scrolled' : ''}`}
        role="navigation"
        aria-label="Ana navigasyon"
      >
        <div className="nav__inner">
          <a className="nav__logo" href="#" aria-label="Dr. Işıl Boy Ergül — Ana Sayfa">
            Dr. Işıl Boy Ergül
          </a>

          <ul className="nav__links" role="list">
            {navItems.map(item => (
              <li key={item.href}>
                <a className="nav__link" href={item.href}>{item.text}</a>
              </li>
            ))}
          </ul>

          <div className="nav__social" aria-label="Sosyal medya">
            {Object.values(site.social).map(s => (
              <a
                key={s.label}
                className="nav__social-link"
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {s.label}
              </a>
            ))}
          </div>

          <button
            className="nav__menu-btn"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div
        className={`nav__drawer${menuOpen ? ' is-open' : ''}`}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Mobil menü"
      >
        {navItems.map(item => (
          <a
            key={item.href}
            className="nav__drawer-link"
            href={item.href}
            onClick={closeMenu}
          >
            {item.text}
          </a>
        ))}
      </div>
    </header>
  )
}
