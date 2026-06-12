import { BookOpen } from 'lucide-react'
import { useCompassData } from '../../hooks/useCompassData'

export function MemoryFeedPage() {
  const { snapshot } = useCompassData()
  const memoryFeed = snapshot?.memoryFeed ?? []

  return (
    <section className="memory-page" aria-labelledby="memory-feed-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--green">
            <BookOpen size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Memory feed</p>
            <h2 id="memory-feed-title">Recent sessions from handoff</h2>
          </div>
        </div>
        <p className="card-copy">
          Append-only session history parsed from <code>docs/14_SESSION_HANDOFF.md</code>.
        </p>
        <div className="scope-stats">
          <span>
            <strong>Entries</strong>
            {memoryFeed.length}
          </span>
        </div>
      </article>

      <div className="memory-feed">
        {memoryFeed.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No recent sessions found in handoff.</p>
          </article>
        ) : (
          memoryFeed.map((item) => (
            <article className="dashboard-card memory-entry" key={item.id}>
              <p className="eyebrow">{item.date}</p>
              <p className="memory-entry__text">{item.text}</p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
