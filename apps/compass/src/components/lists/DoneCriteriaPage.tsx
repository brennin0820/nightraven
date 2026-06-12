import { Flag } from 'lucide-react'
import { useCompassData } from '../../hooks/useCompassData'

export function DoneCriteriaPage() {
  const { snapshot, currentPhase } = useCompassData()
  const phases = snapshot?.phases ?? []

  return (
    <section className="list-page" aria-labelledby="done-criteria-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--green">
            <Flag size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Done criteria</p>
            <h2 id="done-criteria-title">What done means per phase</h2>
          </div>
        </div>
        <p className="card-copy">
          Current phase: <strong>{currentPhase?.name ?? '—'}</strong>. Mark a phase done only when
          every criterion below is verified.
        </p>
      </article>

      <div className="roadmap-list">
        {phases.map((phase) => {
          const isCurrent = phase.id === snapshot?.project.currentPhaseId
          return (
            <article
              className="dashboard-card roadmap-card"
              data-current={isCurrent}
              data-status={phase.status}
              key={phase.id}
            >
              <div className="roadmap-card__head">
                <h3>
                  {phase.order + 1}. {phase.name}
                </h3>
                <span className="queue-pill">{phase.status.replaceAll('_', ' ')}</span>
              </div>
              <ul className="done-criteria-list">
                {phase.doneCriteria.map((criterion) => (
                  <li key={criterion}>{criterion}</li>
                ))}
              </ul>
              {phase.notAllowedYet.length > 0 ? (
                <div className="required-output">
                  <h3>Not allowed yet</h3>
                  <ul>
                    {phase.notAllowedYet.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          )
        })}
      </div>
    </section>
  )
}
