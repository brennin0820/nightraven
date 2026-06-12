import type { Task } from '../../types/project'

type TaskCardProps = {
  task: Task
  selected?: boolean
  onSelect: (taskId: string) => void
}

export function TaskCard({ task, selected = false, onSelect }: TaskCardProps) {
  return (
    <li>
      <button
        className="task-card"
        data-lane={task.lane}
        data-selected={selected}
        onClick={() => onSelect(task.id)}
        type="button"
      >
        <div className="task-card__head">
          <strong>{task.title}</strong>
          <span className="queue-pill">{task.priority}</span>
        </div>
        <p className="task-card__meta">
          {task.state} · {task.owner.replaceAll('_', ' ')}
        </p>
      </button>
    </li>
  )
}
