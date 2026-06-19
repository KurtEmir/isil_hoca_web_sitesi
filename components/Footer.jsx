const links = [
  { text: 'Hakkımda',  href: '#about'     },
  { text: 'Uzmanlık',  href: '#expertise' },
  { text: 'Medya',     href: '#media'     },
  { text: 'Görüşler',  href: '#insights'  },
  { text: 'İletişim',  href: '#contact'   },
]

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">
          <p className="footer__brand">
            Dr. <span>Işıl</span> Boy Ergül
          </p>

          <nav className="footer__links" aria-label="Footer navigasyon">
            {links.map(l => (
              <a key={l.href} className="footer__link" href={l.href}>{l.text}</a>
            ))}
          </nav>

          <p className="footer__copy">
            © {new Date().getFullYear()} Dr. Işıl Boy Ergül · <span>TeacherX</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
