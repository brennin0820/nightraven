import { GitBranch } from 'lucide-react'
import { useCompassData } from '../../context/ProjectContext'
import { DecisionCard } from '../dashboard/DecisionCard'

export function DecisionsPage() {
  const { snapshot } = useCompassData()
  const decisions = snapshot?.decisions ?? []

  return (
    <section className="list-page" aria-labelledby="decisions-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--amber">
            <GitBranch size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Decisions</p>
            <h2 id="decisions-title">Open and pending choices</h2>
          </div>
        </div>
      </article>

      <div className="list-page__grid">
        {decisions.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No decisions tracked for this project.</p>
          </article>
        ) : (
          decisions.map((decision) => <DecisionCard key={decision.id} decision={decision} />)
        )}
      </div>
    </section>
  )
}
