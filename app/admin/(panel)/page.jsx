import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { CONTENT_SECTIONS } from '@/lib/content'
import SeedBanner from '@/components/admin/SeedBanner'

const cards = [
  { href: '/admin/site',      icon: '⚙', title: 'Site Ayarları', desc: 'İsim, menü butonu, sosyal medya' },
  { href: '/admin/hero',      icon: '◈', title: 'Hero',          desc: 'Slogan, fotoğraf, rakamlar' },
  { href: '/admin/about',     icon: '◉', title: 'Hakkımda',      desc: 'Biyografi, roller, kurumlar listesi' },
  { href: '/admin/journey',   icon: '⟶', title: 'Yolculuk',      desc: 'Zaman çizelgesi durakları' },
  { href: '/admin/spotlight', icon: '▣', title: 'Human+ Bandı',  desc: 'Duotone portre, denklem şeması' },
  { href: '/admin/expertise', icon: '◆', title: 'Uzmanlık',      desc: 'Konu listesi' },
  { href: '/admin/platforms', icon: '◫', title: 'Platformlar',   desc: 'Ekosistem şeması, platform kartları' },
  { href: '/admin/offers',    icon: '◇', title: 'Davet Seçenekleri', desc: 'Konuşma, eğitim, danışmanlık' },
  { href: '/admin/media',     icon: '▶', title: 'Medya',         desc: 'Öne çıkan video, basın' },
  { href: '/admin/manifesto', icon: '¶', title: 'Manifesto',     desc: 'Neye inanıyorum? ilkeleri' },
  { href: '/admin/insights',  icon: '✦', title: 'Görüşler',      desc: 'Makaleler ve yazılar' },
  { href: '/admin/contact',   icon: '✉', title: 'İletişim',      desc: 'E-posta, başlık, form metinleri' },
  { href: '/admin/messages',  icon: '▤', title: 'Mesajlar',      desc: 'İletişim formundan gelenler' },
]

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient()
  const { count, error } = await supabase
    .from('content')
    .select('section', { count: 'exact', head: true })

  const needsSeed = !error && (count ?? 0) < CONTENT_SECTIONS.length

  return (
    <div className="admin-dashboard">
      <div className="admin-topbar" style={{ marginBottom: 0 }}>
        <span className="admin-topbar__title">Dashboard</span>
        <a className="admin-topbar__view-link" href="/" target="_blank" rel="noopener">Siteyi Gör ↗</a>
      </div>

      <div style={{ padding: '32px' }}>
        <div className="admin-dashboard__welcome">
          <h1>Hoş geldiniz</h1>
          <p>Aşağıdaki bölümlerden site içeriklerini düzenleyebilirsiniz.</p>
        </div>

        {error && (
          <div className="admin-setup-banner admin-setup-banner--error">
            <p>
              Supabase "content" tablosuna erişilemedi: {error.message}. supabase/schema.sql dosyasının
              Supabase SQL Editor'da çalıştırıldığından emin olun.
            </p>
          </div>
        )}

        {needsSeed && <SeedBanner />}

        <div className="admin-cards">
          {cards.map(card => (
            <Link key={card.href} href={card.href} className="admin-card">
              <span className="admin-card__icon">{card.icon}</span>
              <div>
                <p className="admin-card__title">{card.title}</p>
                <p className="admin-card__desc">{card.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
