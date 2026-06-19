import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  style:    ['normal', 'italic'],
  variable: '--font-display',
  display:  'swap',
})

const inter = Inter({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-body',
  display:  'swap',
})

export const metadata = {
  title:       'Dr. Işıl Boy Ergül — Eğitim Teknolojileri Uzmanı',
  description: 'Dr. Işıl Boy Ergül — Eğitim Teknolojileri Uzmanı, Girişimci & Akademisyen. Öğretmen Gelişir, Toplum Değişir.',
  openGraph: {
    title:       'Dr. Işıl Boy Ergül',
    description: 'Eğitim Teknolojileri Uzmanı, Girişimci & Akademisyen',
    type:        'website',
    url:         'https://teacherx.online',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
