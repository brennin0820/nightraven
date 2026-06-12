import { BarChart3 } from 'lucide-react'
import { useCompassData } from '../../hooks/useCompassData'
import {
  calculateAuditProgress,
  calculateBuildProgress,
  calculateDecisionProgress,
} from '../../utils/progress'
import { ProgressSummaryCard } from '../dashboard/ProgressSummaryCard'

export function ProgressPage() {
  const { snapshot } = useCompassData()

  if (!snapshot) return null

  const progress = {
    ...snapshot.progress,
    buildProgress: calculateBuildProgress(snapshot.tasks),
    auditProgress: calculateAuditProgress(snapshot.auditItems),
    decisionProgress: calculateDecisionProgress(snapshot.decisions),
  }

  const { meta } = snapshot

  return (
    <section className="progress-page" aria-labelledby="progress-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--green">
            <BarChart3 size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Progress</p>
            <h2 id="progress-title">Build, memory, and artifact health</h2>
          </div>
        </div>
        <p className="card-copy">
          Loaded {new Date(meta.loadedAt).toLocaleString()} from{' '}
          <code>{meta.projectPath}</code>
        </p>
      </article>

      <div className="progress-page__grid">
        <ProgressSummaryCard progress={progress} />

        <article className="dashboard-card">
          <h3>God&apos;s Eye artifacts</h3>
          <p className="card-copy">
            {meta.artifactCount} of {meta.artifactTotal} chain files present on disk.
          </p>
          <p className="card-copy">
            Tracked artifacts: handoff, overlay, Bible, changelog, learning log, AGENTS, rules,
            hooks.
          </p>
          <div className="meta-grid meta-grid--two">
            <span>
              <strong>Handoff</strong>
              {meta.handoffFound ? 'Found' : 'Missing'}
            </span>
            <span>
              <strong>Overlay</strong>
              {meta.overlayFound ? 'Found' : 'Missing'}
            </span>
          </div>
        </article>
      </div>
    </section>
  )
}
