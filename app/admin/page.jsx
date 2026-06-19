'use client'
import { useState } from 'react'
import Link from 'next/link'
import { seedContent } from './actions'

const sections = [
  { href: '/admin/hero',      icon: '◈', title: 'Hero',       desc: 'Başlık, slogan, fotoğraf' },
  { href: '/admin/about',     icon: '◉', title: 'Hakkımda',   desc: 'Biyografi, istatistikler, roller' },
  { href: '/admin/expertise', icon: '◆', title: 'Uzmanlık',   desc: '6 uzmanlık alanı kartı' },
  { href: '/admin/media',     icon: '▶', title: 'Medya',       desc: 'Öne çıkan video, basın' },
  { href: '/admin/insights',  icon: '✦', title: 'Görüşler',   desc: 'Makaleler ve yazılar' },
  { href: '/admin/contact',   icon: '✉', title: 'İletişim',   desc: 'E-posta, başlık, açıklama' },
]

export default function AdminDashboard() {
  const [seeding, setSeeding] = useState(false)
  const [seeded,  setSeeded]  = useState(false)

  const handleSeed = async () => {
    setSeeding(true)
    await seedContent()
    setSeeded(true)
    setSeeding(false)
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-topbar" style={{ marginBottom: 0 }}>
        <span className="admin-topbar__title">Dashboard</span>
        <a className="admin-topbar__view-link" href="/" target="_blank" rel="noopener">
          Siteyi Gör ↗
        </a>
      </div>

      <div style={{ padding: '32px' }}>
        <div className="admin-dashboard__welcome">
          <h1>Hoş geldiniz</h1>
          <p>Aşağıdaki bölümlerden site içeriklerini düzenleyebilirsiniz.</p>
        </div>

        {!seeded && (
          <div className="admin-setup-banner">
            <p>Supabase'e ilk kez bağlandıysanız, statik verileri veritabanına yüklemek için "İlk Kurulum"u çalıştırın.</p>
            <button className="admin-seed-btn" onClick={handleSeed} disabled={seeding}>
              {seeding ? '⏳ Yükleniyor…' : '⚡ İlk Kurulum'}
            </button>
          </div>
        )}

        {seeded && (
          <div className="admin-setup-banner" style={{ background: '#f0fdf4', borderColor: '#86efac' }}>
            <p style={{ color: '#166534' }}>✓ Veriler başarıyla Supabase'e yüklendi. Artık düzenlemeye başlayabilirsiniz.</p>
          </div>
        )}

        <div className="admin-cards">
          {sections.map(s => (
            <Link key={s.href} href={s.href} className="admin-card">
              <span className="admin-card__icon">{s.icon}</span>
              <div>
                <p className="admin-card__title">{s.title}</p>
                <p className="admin-card__desc">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
