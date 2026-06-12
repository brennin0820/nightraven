import type { MemoryFeedItem, ProjectSnapshot } from '../types/snapshot'
import { mockPhase2Tasks } from './mockPhase2'
import {
  mockPhase56AuditItems,
  mockPhase56Progress,
  mockPhase56Tasks,
} from './mockPhase56'
import {
  mockBlockers,
  mockDecisions,
  mockNotNowItems,
  mockPhases,
  mockProject,
  mockPromptCards,
  mockTasks,
} from './mockProject'

function buildMemoryFeed(): MemoryFeedItem[] {
  return [
    {
      id: 'mem-1',
      date: '2026-06-11',
      text: 'Phase 1 dashboard and app shell marked done. Mock data wired via ProjectContext.',
    },
    {
      id: 'mem-2',
      date: '2026-06-11',
      text: 'Decision: mock data first for MVP storage — SQLite deferred to post-MVP.',
    },
    {
      id: 'mem-3',
      date: '2026-06-10',
      text: 'Auditor flagged dashboard — App.tsx still routing placeholders for future pages.',
    },
    {
      id: 'mem-4',
      date: '2026-06-10',
      text: 'Blocker opened: routing decision still open — blocks priority board detail panel.',
    },
    {
      id: 'mem-5',
      date: '2026-06-09',
      text: 'Reopened storage decision briefly — superseded; keep mock data until Phases 2–3 ship.',
    },
    {
      id: 'mem-6',
      date: '2026-06-09',
      text: 'Scope locked. Cloud sync and autonomous agents on Not Now list.',
    },
    {
      id: 'mem-7',
      date: '2026-06-08',
      text: 'Planning session on roadmap phases — 8 phases defined in build packet.',
    },
    {
      id: 'mem-8',
      date: '2026-06-08',
      text: 'Audit backlog: Phase 1 dashboard pending scope review before marking done.',
    },
  ]
}

export function buildMockSnapshot(): ProjectSnapshot {
  return {
    registry: [],
    project: mockProject,
    phases: mockPhases,
    tasks: [...mockTasks, ...mockPhase2Tasks, ...mockPhase56Tasks],
    decisions: mockDecisions,
    blockers: mockBlockers,
    notNowItems: mockNotNowItems,
    auditItems: mockPhase56AuditItems,
    promptCards: mockPromptCards,
    progress: mockPhase56Progress,
    memoryFeed: buildMemoryFeed(),
    meta: {
      projectPath: 'mock://nightraven-compass',
      handoffFound: false,
      overlayFound: false,
      artifactCount: 0,
      artifactTotal: 8,
      loadedAt: new Date().toISOString(),
    },
  }
}

export function buildActivityFeed(snapshot: ProjectSnapshot): MemoryFeedItem[] {
  const fromMemory = snapshot.memoryFeed
  const fromTasks: MemoryFeedItem[] = snapshot.tasks
    .filter((task) => task.state === 'done' || task.lane === 'now')
    .slice(0, 4)
    .map((task) => ({
      id: `task-${task.id}`,
      date: snapshot.project.updatedAt,
      text: `Task "${task.title}" — ${task.state} in ${task.lane} lane (${task.owner.replaceAll('_', ' ')}).`,
    }))

  const fromDecisions: MemoryFeedItem[] = snapshot.decisions.slice(0, 3).map((decision) => ({
    id: `decision-${decision.id}`,
    date: snapshot.project.updatedAt,
    text: `Decision: ${decision.question} → ${decision.status}${decision.finalChoice ? ` (${decision.finalChoice})` : ''}.`,
  }))

  const fromAudits: MemoryFeedItem[] = snapshot.auditItems.slice(0, 3).map((audit) => {
    const task = snapshot.tasks.find((entry) => entry.id === audit.taskId)
    return {
      id: `audit-${audit.id}`,
      date: snapshot.project.updatedAt,
      text: `Audit for "${task?.title ?? audit.taskId}": ${audit.status.replaceAll('_', ' ')}${audit.canMoveForward ? ' — can move forward' : ' — hold'}.`,
    }
  })

  const fromBlockers: MemoryFeedItem[] = snapshot.blockers
    .filter((blocker) => blocker.status === 'open' || blocker.status === 'in_progress')
    .map((blocker) => ({
      id: `blocker-${blocker.id}`,
      date: snapshot.project.updatedAt,
      text: `Blocker (${blocker.severity}): ${blocker.title} — ${blocker.status.replaceAll('_', ' ')}.`,
    }))

  return [...fromMemory, ...fromTasks, ...fromDecisions, ...fromAudits, ...fromBlockers]
}
