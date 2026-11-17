import Nav          from '@/components/Nav'
import Hero         from '@/components/Hero'
import About        from '@/components/About'
import Journey      from '@/components/Journey'
import Spotlight    from '@/components/Spotlight'
import Expertise    from '@/components/Expertise'
import Platforms    from '@/components/Platforms'
import Offers       from '@/components/Offers'
import Affiliations from '@/components/Affiliations'
import Media        from '@/components/Media'
import Manifesto    from '@/components/Manifesto'
import Insights     from '@/components/Insights'
import Contact      from '@/components/Contact'
import Footer       from '@/components/Footer'
import { getContent } from '@/lib/content'

export const revalidate = 3600

export default async function HomePage() {
  const [site, contact] = await Promise.all([getContent('site'), getContent('contact')])

  return (
    <>
      <Nav site={site} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Journey />
        <Spotlight />
        <Expertise />
        <Platforms />
        <Offers />
        <Affiliations />
        <Media />
        <Insights />
        <Manifesto />
        <Contact contact={contact} site={site} />
      </main>
      <Footer site={site} />
    </>
  )
}
