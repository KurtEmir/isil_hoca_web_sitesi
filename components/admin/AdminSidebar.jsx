'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '../../app/admin/actions'

const navItems = [
  { href: '/admin',           icon: '⊞', label: 'Dashboard'  },
  { href: '/admin/hero',      icon: '◈', label: 'Hero'        },
  { href: '/admin/about',     icon: '◉', label: 'Hakkımda'   },
  { href: '/admin/expertise', icon: '◆', label: 'Uzmanlık'   },
  { href: '/admin/media',     icon: '▶', label: 'Medya'       },
  { href: '/admin/insights',  icon: '✦', label: 'Görüşler'   },
  { href: '/admin/contact',   icon: '✉', label: 'İletişim'   },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <p className="admin-sidebar__title">Dr. Işıl Boy Ergül</p>
        <p className="admin-sidebar__sub">Admin Paneli</p>
      </div>

      <nav className="admin-sidebar__nav">
        <p className="admin-sidebar__label">İçerikler</p>
        {navItems.map(item => {
          const isActive = item.href === '/admin'
            ? pathname === '/admin'
            : pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link${isActive ? ' active' : ''}`}
            >
              <span className="admin-nav-link__icon">{item.icon}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="admin-sidebar__footer">
        <form action={logout}>
          <button className="admin-logout-btn" type="submit">
            Çıkış Yap
          </button>
        </form>
      </div>
    </aside>
  )
}
