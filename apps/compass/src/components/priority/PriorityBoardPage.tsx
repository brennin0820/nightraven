import { Columns3 } from 'lucide-react'
import { useCompassData } from '../../context/ProjectContext'
import type { TaskLane } from '../../types/project'

const LANES: TaskLane[] = ['now', 'next', 'later', 'blocked', 'not_now', 'done']

export function PriorityBoardPage() {
  const { snapshot } = useCompassData()
  const tasks = snapshot?.tasks ?? []

  return (
    <section className="priority-page" aria-labelledby="priority-title">
      <article className="dashboard-card dashboard-card--wide">
        <div className="card-heading">
          <span className="card-icon card-icon--blue">
            <Columns3 size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="eyebrow">Priority board</p>
            <h2 id="priority-title">Tasks by lane</h2>
          </div>
        </div>
        <p className="card-copy">
          Parsed from handoff <strong>Next:</strong> line and recent sessions.
        </p>
      </article>

      <div className="priority-board">
        {LANES.map((lane) => {
          const laneTasks = tasks.filter((task) => task.lane === lane)
          return (
            <article className="dashboard-card priority-lane" key={lane}>
              <h3>
                {lane.replaceAll('_', ' ')} <span className="lane-count">{laneTasks.length}</span>
              </h3>
              <ul className="priority-lane__list">
                {laneTasks.length === 0 ? (
                  <li className="priority-lane__empty">Empty</li>
                ) : (
                  laneTasks.map((task) => (
                    <li className="priority-task" key={task.id}>
                      <strong>{task.title}</strong>
                      <span>
                        {task.priority} · {task.state} · {task.owner.replaceAll('_', ' ')}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </article>
          )
        })}
      </div>
    </section>
  )
}
