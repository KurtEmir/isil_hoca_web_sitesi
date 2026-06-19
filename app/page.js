import Nav            from '../components/Nav'
import Hero           from '../components/Hero'
import About          from '../components/About'
import Expertise      from '../components/Expertise'
import Media          from '../components/Media'
import Insights       from '../components/Insights'
import Contact        from '../components/Contact'
import Footer         from '../components/Footer'
import RevealObserver from '../components/RevealObserver'
import { getContent } from '../lib/content'

export default async function HomePage() {
  const contact = await getContent('contact')

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Media />
        <Insights />
        <Contact contact={contact} />
      </main>
      <Footer />
      <RevealObserver />
    </>
  )
}
