import { useMemo } from 'react'
import { AlertTriangle } from 'lucide-react'
import { useCompassData } from '../../hooks/useCompassData'
import { detectLoopThemes, detectProjectLoops } from '../../utils/loopDetector'

export function LoopDetectorPage() {
  const { snapshot } = useCompassData()

  const { loops, themes } = useMemo(() => {
    if (!snapshot) return { loops: [], themes: [] }
    return {
      loops: detectProjectLoops(snapshot),
      themes: detectLoopThemes(snapshot.memoryFeed),
    }
  }, [snapshot])

  return (
    <section className="loop-page" aria-labelledby="loop-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--amber">
            <AlertTriangle size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Loop detector</p>
            <h2 id="loop-title">Back-and-forth warnings</h2>
          </div>
        </div>
        <p className="card-copy">
          Reopened decisions, future-phase work, planning/audit loops, and zero shipping progress.
        </p>
        <div className="scope-stats">
          <span>
            <strong>Warnings</strong>
            {loops.length}
          </span>
          <span>
            <strong>Memory themes</strong>
            {themes.length}
          </span>
        </div>
      </article>

      <div className="loop-list">
        {loops.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No loop warnings detected.</p>
          </article>
        ) : (
          loops.map((loop) => (
            <article
              className="dashboard-card loop-card"
              data-severity={loop.severity}
              key={loop.id}
            >
              <div className="loop-card__head">
                <h3>{loop.title}</h3>
                <span className="queue-pill">{loop.severity}</span>
              </div>
              <p className="card-copy">{loop.detail}</p>
              <span className="loop-category">{loop.category.replaceAll('_', ' ')}</span>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
