'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/app/admin/actions'

const groups = [
  {
    label: 'Genel',
    items: [
      { href: '/admin',          icon: '⊞', label: 'Dashboard'     },
      { href: '/admin/site',     icon: '⚙', label: 'Site Ayarları' },
      { href: '/admin/messages', icon: '▤', label: 'Mesajlar'      },
    ],
  },
  {
    label: 'İçerikler',
    items: [
      { href: '/admin/hero',      icon: '◈', label: 'Hero'              },
      { href: '/admin/about',     icon: '◉', label: 'Hakkımda'          },
      { href: '/admin/journey',   icon: '⟶', label: 'Yolculuk'          },
      { href: '/admin/spotlight', icon: '▣', label: 'Human+ Bandı'      },
      { href: '/admin/expertise', icon: '◆', label: 'Uzmanlık'          },
      { href: '/admin/platforms', icon: '◫', label: 'Platformlar'       },
      { href: '/admin/offers',    icon: '◇', label: 'Davet Seçenekleri' },
      { href: '/admin/media',     icon: '▶', label: 'Medya'             },
      { href: '/admin/manifesto', icon: '¶', label: 'Manifesto'         },
      { href: '/admin/insights',  icon: '✦', label: 'Görüşler'          },
      { href: '/admin/contact',   icon: '✉', label: 'İletişim'          },
    ],
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const isActive = (href) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href))

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <p className="admin-sidebar__title">Dr. Işıl Boy Ergül</p>
        <p className="admin-sidebar__sub">Admin Paneli</p>
      </div>

      <nav className="admin-sidebar__nav" aria-label="Admin navigasyonu">
        {groups.map(group => (
          <div key={group.label}>
            <p className="admin-sidebar__label">{group.label}</p>
            {group.items.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`admin-nav-link${isActive(item.href) ? ' active' : ''}`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                <span className="admin-nav-link__icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="admin-sidebar__footer">
        <form action={logout}>
          <button className="admin-logout-btn" type="submit">Çıkış Yap</button>
        </form>
      </div>
    </aside>
  )
}
