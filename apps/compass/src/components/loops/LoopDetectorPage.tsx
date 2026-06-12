import { AlertTriangle } from 'lucide-react'
import { useCompassData } from '../../context/ProjectContext'
import { detectLoopThemes } from '../../utils/loopDetector'

export function LoopDetectorPage() {
  const { snapshot } = useCompassData()
  const memoryFeed = snapshot?.memoryFeed ?? []
  const loops = detectLoopThemes(memoryFeed)

  return (
    <section className="loop-page" aria-labelledby="loop-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--amber">
            <AlertTriangle size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Loop detector</p>
            <h2 id="loop-title">Repeated themes in memory feed</h2>
          </div>
        </div>
        <p className="card-copy">
          Surfaces topics that appear across multiple recent sessions — possible back-and-forth loops.
        </p>
        <div className="scope-stats">
          <span>
            <strong>Themes</strong>
            {loops.length}
          </span>
          <span>
            <strong>Sessions scanned</strong>
            {memoryFeed.length}
          </span>
        </div>
      </article>

      <div className="loop-list">
        {loops.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No repeated themes detected in recent sessions.</p>
          </article>
        ) : (
          loops.map((loop) => (
            <article className="dashboard-card loop-card" key={loop.theme}>
              <div className="loop-card__head">
                <h3>{loop.theme}</h3>
                <span className="queue-pill">{loop.count} sessions</span>
              </div>
              <p className="card-copy">Seen on: {loop.sessions.join(', ')}</p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
