import type {
  AuditItem,
  Blocker,
  Decision,
  NotNowItem,
  Phase,
  ProgressSnapshot,
  Project,
  PromptCard,
  Task,
} from './project'

export type RegistryEntry = {
  path: string
  label: string
  role: string
  available: boolean
}

export type MemoryFeedItem = {
  id: string
  date: string
  text: string
}

export type ProjectSnapshot = {
  registry: RegistryEntry[]
  project: Project
  phases: Phase[]
  tasks: Task[]
  decisions: Decision[]
  blockers: Blocker[]
  notNowItems: NotNowItem[]
  auditItems: AuditItem[]
  promptCards: PromptCard[]
  progress: ProgressSnapshot
  memoryFeed: MemoryFeedItem[]
  meta: {
    projectPath: string
    handoffFound: boolean
    overlayFound: boolean
    artifactCount: number
    artifactTotal: number
    loadedAt: string
  }
}

export type CompassData = {
  snapshot: ProjectSnapshot
  nextTask: Task
  currentPhase: Phase
}

export function selectCompassData(snapshot: ProjectSnapshot): CompassData {
  const currentPhase =
    snapshot.phases.find((phase) => phase.id === snapshot.project.currentPhaseId) ??
    snapshot.phases[0]
  const nextTask =
    snapshot.tasks.find((task) => task.lane === 'now' && task.state !== 'done') ??
    snapshot.tasks.find((task) => task.lane === 'now') ??
    snapshot.tasks[0]

  return { snapshot, nextTask, currentPhase }
}
