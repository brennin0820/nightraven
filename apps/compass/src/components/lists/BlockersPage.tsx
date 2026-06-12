import { AlertTriangle } from 'lucide-react'
import { useCompassData } from '../../context/ProjectContext'
import { BlockerCard } from '../dashboard/BlockerCard'

export function BlockersPage() {
  const { snapshot } = useCompassData()
  const blockers = snapshot?.blockers ?? []

  return (
    <section className="list-page" aria-labelledby="blockers-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--rose">
            <AlertTriangle size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Blockers</p>
            <h2 id="blockers-title">What is stopping forward motion</h2>
          </div>
        </div>
      </article>

      <div className="list-page__grid">
        {blockers.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No blockers detected — handoff looks actionable.</p>
          </article>
        ) : (
          blockers.map((blocker) => <BlockerCard key={blocker.id} blocker={blocker} />)
        )}
      </div>
    </section>
  )
}
