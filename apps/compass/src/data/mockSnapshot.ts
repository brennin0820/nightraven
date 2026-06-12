import type { ProjectSnapshot } from '../types/snapshot'
import {
  mockAuditItems,
  mockBlockers,
  mockDecisions,
  mockNotNowItems,
  mockPhases,
  mockProgress,
  mockProject,
  mockPromptCards,
  mockTasks,
} from './mockProject'

export function buildMockSnapshot(): ProjectSnapshot {
  return {
    registry: [],
    project: mockProject,
    phases: mockPhases,
    tasks: mockTasks,
    decisions: mockDecisions,
    blockers: mockBlockers,
    notNowItems: mockNotNowItems,
    auditItems: mockAuditItems,
    promptCards: mockPromptCards,
    progress: mockProgress,
    memoryFeed: [],
    meta: {
      projectPath: 'mock://nightraven-compass',
      handoffFound: false,
      overlayFound: false,
      artifactCount: 0,
      artifactTotal: 0,
      loadedAt: new Date().toISOString(),
    },
  }
}
