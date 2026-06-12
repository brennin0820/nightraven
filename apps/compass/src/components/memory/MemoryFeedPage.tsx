import { useMemo } from 'react'
import { BookOpen } from 'lucide-react'
import { buildActivityFeed } from '../../data/mockSnapshot'
import { useCompassData } from '../../hooks/useCompassData'

export function MemoryFeedPage() {
  const { snapshot } = useCompassData()

  const feed = useMemo(() => {
    if (!snapshot) return []
    return buildActivityFeed(snapshot)
  }, [snapshot])

  return (
    <section className="memory-page" aria-labelledby="memory-feed-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--green">
            <BookOpen size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Memory feed</p>
            <h2 id="memory-feed-title">Recent project activity</h2>
          </div>
        </div>
        <p className="card-copy">
          Tasks, decisions, audits, blockers, and session notes from mock snapshot.
        </p>
        <div className="scope-stats">
          <span>
            <strong>Entries</strong>
            {feed.length}
          </span>
        </div>
      </article>

      <div className="memory-feed">
        {feed.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No activity entries yet.</p>
          </article>
        ) : (
          feed.map((item) => (
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
