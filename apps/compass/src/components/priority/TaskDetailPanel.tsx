import { X } from 'lucide-react'
import type { Task } from '../../types/project'
import { getScopeWarnings } from '../../utils/scopeWarnings'

type TaskDetailPanelProps = {
  task: Task
  onClose: () => void
}

export function TaskDetailPanel({ task, onClose }: TaskDetailPanelProps) {
  const warnings = getScopeWarnings(task)

  return (
    <aside className="task-detail-panel dashboard-card" aria-labelledby="task-detail-title">
      <div className="task-detail-panel__head">
        <div>
          <p className="eyebrow">Task detail</p>
          <h2 id="task-detail-title">{task.title}</h2>
        </div>
        <button className="task-detail-panel__close" onClick={onClose} type="button" aria-label="Close">
          <X size={16} />
        </button>
      </div>

      <p className="card-copy">{task.description}</p>
      <p className="card-copy">
        <strong>Why:</strong> {task.why}
      </p>

      <div className="meta-grid meta-grid--two">
        <span>
          <strong>Lane</strong>
          {task.lane.replaceAll('_', ' ')}
        </span>
        <span>
          <strong>State</strong>
          {task.state}
        </span>
        <span>
          <strong>Owner</strong>
          {task.owner.replaceAll('_', ' ')}
        </span>
        <span>
          <strong>Type</strong>
          {task.type}
        </span>
        <span>
          <strong>Priority</strong>
          {task.priority}
        </span>
        <span>
          <strong>Audit required</strong>
          {task.auditRequired ? 'Yes' : 'No'}
        </span>
      </div>

      <div className="split-list">
        <div>
          <h4>Acceptance criteria</h4>
          <ul>
            {task.acceptanceCriteria.length > 0 ? (
              task.acceptanceCriteria.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>None listed.</li>
            )}
          </ul>
        </div>
        <div>
          <h4>Not allowed</h4>
          <ul>
            {task.notAllowedChanges.length > 0 ? (
              task.notAllowedChanges.map((item) => <li key={item}>{item}</li>)
            ) : (
              <li>None listed.</li>
            )}
          </ul>
        </div>
      </div>

      {task.allowedAreas.length > 0 ? (
        <div className="required-output">
          <h3>Allowed areas</h3>
          <ul>
            {task.allowedAreas.map((area) => (
              <li key={area}>{area}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {warnings.length > 0 ? (
        <ul className="warning-list">
          {warnings.map((warning) => (
            <li key={warning}>{warning}</li>
          ))}
        </ul>
      ) : null}
    </aside>
  )
}
