import { navItems } from '@/content/navigation'

export default function Footer({ site }) {
  const socials = Object.values(site.social ?? {}).filter(s => s.url)

  return (
    <footer className="footer surface-red">
      <div className="container">
        <div className="grid-12 footer__top">
          <div className="footer__brand">
            <p className="footer__name">{site.name}</p>
            {site.tagline && <p className="footer__tagline">{site.tagline}</p>}
          </div>

          <div className="footer__col">
            {site.footerMenuLabel && <p className="footer__heading">{site.footerMenuLabel}</p>}
            <nav className="footer__links" aria-label="Alt bilgi navigasyonu">
              {navItems.map(l => (
                <a key={l.href} className="footer__link" href={l.href}>{l.text}</a>
              ))}
            </nav>
          </div>

          {socials.length > 0 && (
            <div className="footer__col">
              {site.footerSocialLabel && <p className="footer__heading">{site.footerSocialLabel}</p>}
              <div className="footer__links">
                {socials.map(s => (
                  <a key={s.label} className="footer__link" href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {site.name}
            {site.footerNote && <> · {site.footerNote}</>}
          </p>
          {site.description && <p>{site.description}</p>}
        </div>
      </div>
    </footer>
  )
}
