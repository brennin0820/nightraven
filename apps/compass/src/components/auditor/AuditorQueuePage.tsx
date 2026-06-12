import { ShieldCheck } from 'lucide-react'
import { useCompassData } from '../../context/ProjectContext'
import type { ProjectSnapshot } from '../../types/snapshot'
import { buildTaskScopeReport, detectScopeCreep } from '../../utils/scopeMonitor'
import { getScopeWarnings } from '../../utils/scopeWarnings'

type AuditRow = {
  id: string
  taskTitle: string
  status: string
  scopeWarnings: string[]
  creepFindings: string[]
  canMoveForward: boolean
}

function buildAuditRows(snapshot: ProjectSnapshot): AuditRow[] {
  const { auditItems: items, tasks, notNowItems } = snapshot
  const notNowTitles = notNowItems.map((item) => item.title)

  return items.map((audit) => {
    const task = tasks.find((entry) => entry.id === audit.taskId)
    if (!task) {
      return {
        id: audit.id,
        taskTitle: audit.taskId,
        status: audit.status,
        scopeWarnings: ['Linked task not found.'],
        creepFindings: [],
        canMoveForward: false,
      }
    }

    const scopeWarnings = getScopeWarnings(task)
    const creepFindings = detectScopeCreep(task, notNowTitles)
    const report = buildTaskScopeReport(task)
    const blocked = scopeWarnings.length > 0 || creepFindings.length > 0 || !report.readyToBuild

    return {
      id: audit.id,
      taskTitle: task.title,
      status: blocked ? 'scope_review' : audit.status,
      scopeWarnings,
      creepFindings,
      canMoveForward: !blocked && audit.canMoveForward,
    }
  })
}

export function AuditorQueuePage() {
  const { snapshot } = useCompassData()

  if (!snapshot) return null

  const rows = buildAuditRows(snapshot)
  const pending = rows.filter((row) => !row.canMoveForward).length

  return (
    <section className="auditor-page" aria-labelledby="auditor-queue-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--green">
            <ShieldCheck size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Auditor queue</p>
            <h2 id="auditor-queue-title">Scope & readiness checks</h2>
          </div>
        </div>
        <p className="card-copy">
          Pre-build scope gate — acceptance criteria, not-allowed lists, Not Now collisions, and
          phase-order risks before marking work done.
        </p>
        <div className="scope-stats">
          <span>
            <strong>Queue items</strong>
            {rows.length}
          </span>
          <span>
            <strong>Needs scope cleanup</strong>
            {pending}
          </span>
        </div>
      </article>

      <div className="auditor-list">
        {rows.length === 0 ? (
          <article className="dashboard-card">
            <p className="card-copy">No audit-required tasks in the now lane.</p>
          </article>
        ) : (
          rows.map((row) => (
            <article className="dashboard-card auditor-card" key={row.id}>
              <div className="auditor-card__head">
                <h3>{row.taskTitle}</h3>
                <span className="auditor-status" data-forward={row.canMoveForward}>
                  {row.canMoveForward ? 'Can move forward' : 'Hold — scope review'}
                </span>
              </div>
              {row.scopeWarnings.length > 0 ? (
                <div className="auditor-findings">
                  <strong>Scope warnings</strong>
                  <ul>
                    {row.scopeWarnings.map((warning) => (
                      <li key={warning}>{warning}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {row.creepFindings.length > 0 ? (
                <div className="auditor-findings auditor-findings--creep">
                  <strong>Scope creep signals</strong>
                  <ul>
                    {row.creepFindings.map((finding) => (
                      <li key={finding}>{finding}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {row.scopeWarnings.length === 0 && row.creepFindings.length === 0 ? (
                <p className="auditor-clean">All scope checks passed for this task.</p>
              ) : null}
            </article>
          ))
        )}
      </div>
    </section>
  )
}
