import { useState } from 'react'
import { Columns3 } from 'lucide-react'
import { useCompassData } from '../../hooks/useCompassData'
import type { TaskLane } from '../../types/project'
import { TaskCard } from './TaskCard'
import { TaskDetailPanel } from './TaskDetailPanel'

const LANES: TaskLane[] = ['now', 'next', 'later', 'blocked', 'not_now', 'done']

export function PriorityBoardPage() {
  const { snapshot } = useCompassData()
  const tasks = snapshot?.tasks ?? []
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const selectedTask = selectedTaskId
    ? tasks.find((task) => task.id === selectedTaskId) ?? null
    : null

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
          Now / Next / Later / Blocked / Not Now / Done — click a task for details.
        </p>
      </article>

      <div className="priority-layout">
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
                      <TaskCard
                        key={task.id}
                        onSelect={setSelectedTaskId}
                        selected={selectedTaskId === task.id}
                        task={task}
                      />
                    ))
                  )}
                </ul>
              </article>
            )
          })}
        </div>

        {selectedTask ? (
          <TaskDetailPanel onClose={() => setSelectedTaskId(null)} task={selectedTask} />
        ) : null}
      </div>
    </section>
  )
}
