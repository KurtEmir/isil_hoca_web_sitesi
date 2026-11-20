import { getContent } from '@/lib/content'
import TopicIndex from '@/components/TopicIndex'

export default async function Expertise() {
  const expertise = await getContent('expertise')
  const items     = (expertise.items ?? []).filter(item => item.title)

  return (
    <section className="section expertise" id="expertise" aria-labelledby="expertise-title">
      <div className="container">
        <div className="section-head">
          <h2 className="t-heading" id="expertise-title">{expertise.title}</h2>
        </div>

        {items.length > 0 && <TopicIndex items={items} />}
      </div>
    </section>
  )
}
