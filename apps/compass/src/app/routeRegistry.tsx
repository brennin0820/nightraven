import type { ComponentType, ReactNode } from 'react'
import { AuditorQueuePage } from '../components/auditor/AuditorQueuePage'
import { PriorityBoardPage } from '../components/priority/PriorityBoardPage'
import { ProgressTrackerPage } from '../components/progress/ProgressTrackerPage'
import { TaskQueuePage } from '../components/queues/TaskQueuePage'
import { RoadmapPage } from '../components/roadmap/RoadmapPage'
import type { NavItemId } from '../components/layout/navigation'
import { phase2RouteKeys } from '../data/mockPhase2'

type RouteEntry = {
  component: ComponentType
}

function CoderTasksPage() {
  return <TaskQueuePage queueId="coder-tasks" />
}

export const routeRegistry: Partial<Record<NavItemId, RouteEntry>> = {
  roadmap: { component: RoadmapPage },
  'priority-board': { component: PriorityBoardPage },
  'coder-tasks': { component: CoderTasksPage },
  'auditor-queue': { component: AuditorQueuePage },
  progress: { component: ProgressTrackerPage },
}

export function isRegisteredRoute(activeView: NavItemId): activeView is NavItemId {
  return activeView in routeRegistry
}

export function renderRoute(activeView: NavItemId): ReactNode {
  const entry = routeRegistry[activeView]
  if (!entry) return null

  const Page = entry.component
  return <Page />
}

export { phase2RouteKeys }
