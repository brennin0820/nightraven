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
} from '../types/project'

export const mockProject: Project = {
  id: 'project-nr-compass',
  name: 'NightRaven Compass',
  concept:
    'A GE + NR guidance app that helps a non-coder builder see project scope, progress, priorities, blockers, audits, and the next best prompt.',
  status: 'building',
  currentPhaseId: 'phase-1',
  scopeLocked: true,
  createdAt: '2026-06-11',
  updatedAt: '2026-06-11',
}

export const mockPhases: Phase[] = [
  {
    id: 'phase-0',
    projectId: 'project-nr-compass',
    name: 'Scope Foundation',
    goal: 'Define the app clearly before coding.',
    order: 0,
    status: 'done',
    doneCriteria: [
      'Project purpose is clear',
      'MVP scope is clear',
      'GE and NR roles are clear',
      'Out-of-scope list exists',
    ],
    notAllowedYet: [],
  },
  {
    id: 'phase-1',
    projectId: 'project-nr-compass',
    name: 'Static Dashboard',
    goal: 'Create the first visible version of the app using mock data.',
    order: 1,
    status: 'active',
    doneCriteria: [
      'Dashboard opens',
      'Project status is visible',
      'Current phase is visible',
      'Next best action is visible',
      'Progress summary is visible',
      'Blockers are visible',
      'Not Now items are visible',
    ],
    notAllowedYet: [
      'Do not add cloud sync',
      'Do not add full autonomous AI execution',
      'Do not add plugin marketplace',
      'Do not add repo auto-editing',
    ],
  },
  {
    id: 'phase-2',
    projectId: 'project-nr-compass',
    name: 'Roadmap and Priority Board',
    goal: 'Show what needs to be done and in what order.',
    order: 2,
    status: 'not_started',
    doneCriteria: [
      'Roadmap exists',
      'Priority lanes exist',
      'Task cards show owner, state, priority, and criteria',
    ],
    notAllowedYet: ['Do not add real AI integration yet'],
  },
]

export const mockTasks: Task[] = [
  {
    id: 'task-app-shell',
    projectId: 'project-nr-compass',
    phaseId: 'phase-1',
    title: 'Create App Shell',
    description: 'Create the base layout with sidebar and main content area.',
    why: 'The app needs a stable visual frame before pages are added.',
    type: 'frontend',
    priority: 'P0',
    lane: 'now',
    state: 'done',
    owner: 'nightraven_builder',
    dependencies: [],
    acceptanceCriteria: [
      'App shell exists',
      'Sidebar exists',
      'Main content area exists',
      'App title is visible',
    ],
    allowedAreas: ['src/app', 'src/components/layout', 'src/index.css'],
    notAllowedChanges: [
      'Do not add cloud sync',
      'Do not add database',
      'Do not add real AI integration',
    ],
    auditRequired: true,
  },
  {
    id: 'task-dashboard',
    projectId: 'project-nr-compass',
    phaseId: 'phase-1',
    title: 'Create Dashboard Page',
    description: 'Create the main page that shows project status and next action.',
    why: 'The user needs one screen that points them forward.',
    type: 'frontend',
    priority: 'P0',
    lane: 'now',
    state: 'build',
    owner: 'nightraven_builder',
    dependencies: ['task-app-shell'],
    acceptanceCriteria: [
      'Dashboard page exists',
      'Project name is visible',
      'Current phase is visible',
      'Next best action is visible',
      'Progress summary is visible',
    ],
    allowedAreas: ['src/components/dashboard', 'src/data', 'src/types'],
    notAllowedChanges: [
      'Do not build future-phase pages',
      'Do not add backend',
      'Do not change project scope',
    ],
    auditRequired: true,
  },
  {
    id: 'task-roadmap',
    projectId: 'project-nr-compass',
    phaseId: 'phase-2',
    title: 'Create Phase Roadmap',
    description: 'Show phases in order with status and done criteria.',
    why: 'The user needs to know where the project is in the build path.',
    type: 'frontend',
    priority: 'P1',
    lane: 'next',
    state: 'delay',
    owner: 'nightraven_builder',
    dependencies: ['task-dashboard'],
    acceptanceCriteria: [
      'Roadmap page exists',
      'Phases are shown in order',
      'Current phase is highlighted',
    ],
    allowedAreas: ['src/components/roadmap'],
    notAllowedChanges: ['Do not start before Phase 1 passes audit'],
    auditRequired: true,
  },
]

export const mockDecisions: Decision[] = [
  {
    id: 'decision-storage',
    projectId: 'project-nr-compass',
    question: 'Should MVP use mock data, local JSON, or SQLite?',
    options: ['Mock data first', 'Local JSON first', 'SQLite immediately'],
    recommendation: 'Use mock data first.',
    status: 'decided',
    impact: 'high',
    finalChoice: 'Mock data first',
    unlocksTaskIds: ['task-dashboard'],
  },
]

export const mockBlockers: Blocker[] = [
  {
    id: 'blocker-storage',
    projectId: 'project-nr-compass',
    title: 'Persistent storage not ready',
    reason:
      'The MVP should prove the dashboard and workflow before adding storage complexity.',
    severity: 'medium',
    blockedTaskIds: [],
    owner: 'gods_eye',
    resolutionNeeded: 'Use mock data for Phase 1 and revisit storage after Phase 3.',
    status: 'open',
  },
]

export const mockNotNowItems: NotNowItem[] = [
  {
    id: 'notnow-cloud-sync',
    projectId: 'project-nr-compass',
    title: 'Cloud Sync',
    reasonDelayed: 'Not needed for MVP and adds complexity.',
    earliestPhaseAllowed: 'Post-MVP',
    riskIfBuiltTooEarly: 'Distracts from building the core guidance workflow.',
    revisitCondition: 'After local project storage works.',
  },
  {
    id: 'notnow-auto-agents',
    projectId: 'project-nr-compass',
    title: 'Full Autonomous Agent Execution',
    reasonDelayed: 'Too advanced for the first version.',
    earliestPhaseAllowed: 'Post-MVP',
    riskIfBuiltTooEarly: 'Could cause unsafe repo changes or scope creep.',
    revisitCondition: 'After prompts, audits, and reports are stable.',
  },
]

export const mockProgress: ProgressSnapshot = {
  projectId: 'project-nr-compass',
  scopeProgress: 85,
  buildProgress: 15,
  auditProgress: 0,
  decisionProgress: 60,
  shippingProgress: 0,
  learningProgress: 40,
}

export const mockPromptCards: PromptCard[] = [
  {
    id: 'prompt-builder-phase-1',
    projectId: 'project-nr-compass',
    taskId: 'task-dashboard',
    target: 'nightraven_builder',
    prompt:
      'Implement Phase 1 only. Build the app shell and dashboard using mock data. Do not add future-phase features, cloud sync, real AI integration, or repo auto-editing. Return a build report with files changed, completed acceptance criteria, assumptions, and next recommended step.',
    requiredOutput: [
      'Files changed',
      'What was built',
      'Acceptance criteria completed',
      'Assumptions',
      'Next recommended task',
    ],
  },
]

export const mockAuditItems: AuditItem[] = [
  {
    id: 'audit-phase-1-dashboard',
    projectId: 'project-nr-compass',
    taskId: 'task-dashboard',
    status: 'pending',
    findings: [],
    requiredFixes: [],
    canMoveForward: false,
  },
]
