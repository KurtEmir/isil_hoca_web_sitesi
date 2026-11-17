import { Host_Grotesk } from 'next/font/google'
import { getContent } from '@/lib/content'
import './globals.css'

const hostGrotesk = Host_Grotesk({
  subsets:  ['latin', 'latin-ext'],
  variable: '--font-host',
  display:  'swap',
})

function safeUrl(value) {
  try { return new URL(value) } catch { return undefined }
}

export async function generateMetadata() {
  const site = await getContent('site')
  const title = `${site.name} — ${site.description}`

  return {
    metadataBase: safeUrl(site.url),
    title,
    description: `${site.name} — ${site.description}. ${site.tagline}.`,
    openGraph: {
      title:       site.name,
      description: site.description,
      type:        'website',
      url:         site.url,
      locale:      'tr_TR',
      siteName:    site.name,
    },
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={hostGrotesk.variable}>
      <body>
        {children}
      </body>
    </html>
  )
}
