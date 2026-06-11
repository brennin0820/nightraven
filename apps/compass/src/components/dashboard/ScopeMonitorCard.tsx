import { Map } from 'lucide-react'
import type { NavItemId } from '../layout/navigation'
import {
  mockNotNowItems,
  mockPhases,
  mockProject,
  mockTasks,
} from '../../data/mockProject'
import { buildScopeMonitorSnapshot } from '../../utils/scopeMonitor'

type ScopeMonitorCardProps = {
  onOpenScopeMap: (view: NavItemId) => void
}

export function ScopeMonitorCard({ onOpenScopeMap }: ScopeMonitorCardProps) {
  const snapshot = buildScopeMonitorSnapshot(
    mockProject,
    mockPhases,
    mockTasks,
    mockNotNowItems,
  )
  const issues = snapshot.tasksWarn + snapshot.tasksBlock

  return (
    <article className="dashboard-card">
      <div className="card-heading">
        <span className="card-icon card-icon--blue">
          <Map size={18} aria-hidden="true" />
        </span>
        <div>
          <p className="eyebrow">Scope monitor</p>
          <h2>{snapshot.healthScore}% healthy</h2>
        </div>
      </div>
      <p className="card-copy">
        {issues === 0
          ? 'All tracked tasks pass scope rules.'
          : `${issues} task(s) need scope cleanup before build.`}
      </p>
      <button className="scope-link-btn" onClick={() => onOpenScopeMap('scope-map')} type="button">
        Open Scope Map
      </button>
    </article>
  )
}
