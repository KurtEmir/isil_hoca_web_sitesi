import { navItems, backToTop } from '@/content/navigation'
import { getContent } from '@/lib/content'
import ArrowIcon from '@/components/ArrowIcon'

const externalLinkProps = { target: '_blank', rel: 'noopener noreferrer' }

export default async function Footer({ site }) {
  const [contact, platforms] = await Promise.all([getContent('contact'), getContent('platforms')])
  const socials       = Object.values(site.social ?? {}).filter(s => s.url)
  const platformLinks = (platforms.items ?? []).filter(p => p.url && (p.short || p.name))
  const statement     = site.footerStatement || site.tagline

  return (
    <footer className="footer surface-red">
      <div className="container">
        <div className="grid-12 footer__top">
          <div className="footer__brand">
            <p className="footer__name">{site.name}</p>
            {statement && <p className="footer__statement">{statement}</p>}
            {contact.email && (
              <p className="footer__email">
                <a className="link" href={`mailto:${contact.email}`}>{contact.email}<ArrowIcon /></a>
              </p>
            )}
          </div>

          <div className="footer__col">
            {site.footerMenuLabel && <p className="footer__heading">{site.footerMenuLabel}</p>}
            <nav className="footer__links" aria-label="Alt bilgi navigasyonu">
              {navItems.map(l => (
                <a key={l.href} className="footer__link" href={l.href}>{l.text}</a>
              ))}
            </nav>
          </div>

          {platformLinks.length > 0 && (
            <div className="footer__col">
              {site.footerPlatformsLabel && <p className="footer__heading">{site.footerPlatformsLabel}</p>}
              <div className="footer__links">
                {platformLinks.map((p, i) => (
                  <a key={i} className="footer__link" href={p.url} {...externalLinkProps}>{p.short || p.name}</a>
                ))}
              </div>
            </div>
          )}

          {socials.length > 0 && (
            <div className="footer__col">
              {site.footerSocialLabel && <p className="footer__heading">{site.footerSocialLabel}</p>}
              <div className="footer__links">
                {socials.map(s => (
                  <a key={s.label} className="footer__link" href={s.url} {...externalLinkProps}>{s.label}</a>
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
          <a className="footer__link" href={backToTop.href}>{backToTop.text}</a>
        </div>
      </div>
    </footer>
  )
}
