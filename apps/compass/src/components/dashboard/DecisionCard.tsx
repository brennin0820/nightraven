import { GitBranch } from 'lucide-react'
import type { Decision } from '../../types/project'

type DecisionCardProps = {
  decision: Decision
}

export function DecisionCard({ decision }: DecisionCardProps) {
  return (
    <article className="dashboard-card">
      <div className="card-heading">
        <span className="card-icon card-icon--green">
          <GitBranch size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow">Decision</p>
          <h2>{decision.question}</h2>
        </div>
      </div>
      <div className="decision-stack">
        <p>
          <strong>Recommendation</strong>
          {decision.recommendation}
        </p>
        <p>
          <strong>Final choice</strong>
          {decision.finalChoice ?? 'Open'}
        </p>
      </div>
      <div className="action-strip">
        <span>{decision.status}</span>
        <span>{decision.impact} impact</span>
      </div>
    </article>
  )
}
