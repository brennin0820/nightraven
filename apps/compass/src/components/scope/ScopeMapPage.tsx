import { AlertTriangle, CheckCircle2, LockKeyhole, Map, XCircle } from 'lucide-react'
import {
  mockNotNowItems,
  mockPhases,
  mockProject,
  mockTasks,
} from '../../data/mockProject'
import { buildScopeMonitorSnapshot, type TaskScopeReport } from '../../utils/scopeMonitor'

function SeverityBadge({ severity }: { severity: TaskScopeReport['severity'] }) {
  if (severity === 'ok') {
    return (
      <span className="scope-badge scope-badge--ok">
        <CheckCircle2 size={14} aria-hidden="true" /> OK
      </span>
    )
  }
  if (severity === 'warn') {
    return (
      <span className="scope-badge scope-badge--warn">
        <AlertTriangle size={14} aria-hidden="true" /> Warn
      </span>
    )
  }
  return (
    <span className="scope-badge scope-badge--block">
      <XCircle size={14} aria-hidden="true" /> Block
    </span>
  )
}

export function ScopeMapPage() {
  const snapshot = buildScopeMonitorSnapshot(
    mockProject,
    mockPhases,
    mockTasks,
    mockNotNowItems,
  )

  return (
    <section className="scope-page" aria-labelledby="scope-map-title">
      <div className="scope-page__hero dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--blue">
            <Map size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Scope monitor</p>
            <h2 id="scope-map-title">What is in scope right now</h2>
          </div>
        </div>
        <p className="card-copy">
          Live read of mock project rules — phase constraints, allowed build areas, Not Now
          guardrails, and per-task scope health. Updates when task data changes.
        </p>
        <div className="scope-stats">
          <span>
            <strong>Health</strong>
            {snapshot.healthScore}%
          </span>
          <span>
            <strong>Scope locked</strong>
            {snapshot.scopeLocked ? 'Yes' : 'No'}
            <LockKeyhole size={14} aria-hidden="true" />
          </span>
          <span>
            <strong>Tasks OK</strong>
            {snapshot.tasksOk}
          </span>
          <span>
            <strong>Warnings</strong>
            {snapshot.tasksWarn}
          </span>
          <span>
            <strong>Blocked</strong>
            {snapshot.tasksBlock}
          </span>
        </div>
      </div>

      <div className="scope-page__grid">
        <article className="dashboard-card">
          <h3>In scope</h3>
          <ul className="scope-list scope-list--in">
            {snapshot.inScopeSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="dashboard-card">
          <h3>Out of scope / Not Now</h3>
          <ul className="scope-list scope-list--out">
            {snapshot.outOfScopeSummary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="dashboard-card">
          <h3>Active phase constraints</h3>
          <ul className="scope-list">
            {snapshot.phaseConstraints.length > 0 ? (
              snapshot.phaseConstraints.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>No extra phase constraints.</li>
            )}
          </ul>
        </article>
      </div>

      <article className="dashboard-card scope-table-card">
        <h3>Task scope monitor</h3>
        <div className="scope-table-wrap">
          <table className="scope-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Lane</th>
                <th>State</th>
                <th>Status</th>
                <th>Issues</th>
              </tr>
            </thead>
            <tbody>
              {snapshot.taskReports.map((report) => (
                <tr key={report.taskId} data-severity={report.severity}>
                  <td>{report.title}</td>
                  <td>{report.lane}</td>
                  <td>{report.state}</td>
                  <td>
                    <SeverityBadge severity={report.severity} />
                  </td>
                  <td>
                    {report.warnings.length > 0 ? (
                      <ul className="scope-table-issues">
                        {report.warnings.map((warning) => (
                          <li key={warning}>{warning}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="scope-table-ok">Clean</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}
