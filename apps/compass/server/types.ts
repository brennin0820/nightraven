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
} from '../src/types/project'

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
