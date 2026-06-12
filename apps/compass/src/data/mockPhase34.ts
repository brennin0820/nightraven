import type { Blocker, Decision, PromptCard, Task } from '../types/project'
import {
  generateAuditorPrompt,
  generateBuilderPrompt,
  generateGodsEyePrompt,
  generateResearchPrompt,
} from '../utils/promptGenerator'
import { mockPhases, mockProject, mockTasks } from './mockProject'

const currentPhase =
  mockPhases.find((phase) => phase.id === mockProject.currentPhaseId) ?? mockPhases[0]

const nextTask =
  mockTasks.find((task) => task.lane === 'now' && task.state !== 'done') ??
  mockTasks.find((task) => task.lane === 'now') ??
  mockTasks[0]

const researchTask: Task = {
  id: 'task-research-priority-ui',
  projectId: mockProject.id,
  phaseId: 'phase-2',
  title: 'Research priority board interaction patterns',
  description:
    'Compare drag-and-drop lanes vs static columns for a non-coder builder workflow.',
  why: 'Priority board UX affects every future task ordering decision.',
  type: 'research',
  priority: 'P1',
  lane: 'next',
  state: 'research',
  owner: 'research',
  dependencies: ['task-dashboard'],
  acceptanceCriteria: [
    'At least two interaction patterns compared',
    'Recommendation includes scope and deferral notes',
    'Risks of building too early are listed',
  ],
  allowedAreas: ['docs', 'research notes'],
  notAllowedChanges: ['Do not implement UI until decision is made'],
  auditRequired: false,
}

export const phase34SupplementalTasks: Task[] = [researchTask]

function buildPromptCard(
  id: string,
  target: PromptCard['target'],
  prompt: string,
  taskId: string,
): PromptCard {
  return {
    id,
    projectId: mockProject.id,
    taskId,
    target,
    prompt,
    requiredOutput:
      target === 'gods_eye'
        ? [
            'Scope verdict',
            'Missing details',
            'Risks',
            'Final refined task',
            'Recommended next step',
          ]
        : target === 'nightraven_builder'
          ? [
              'Files changed',
              'What was built',
              'Acceptance criteria completed',
              'Assumptions',
              'Recommended next step',
            ]
          : target === 'nightraven_auditor'
            ? [
                'Pass / Fix Needed / Blocked / Scope Creep / Needs User Decision',
                'Findings',
                'Required fixes',
                'Can move forward: yes/no',
              ]
            : [
                'Summary of findings',
                'Recommended approach',
                'Risks if we skip research',
                'Recommended next step',
              ],
  }
}

export const phase34PromptCards: PromptCard[] = [
  buildPromptCard(
    'prompt-ge-phase34',
    'gods_eye',
    generateGodsEyePrompt(mockProject, currentPhase, nextTask),
    nextTask.id,
  ),
  buildPromptCard(
    'prompt-builder-phase34',
    'nightraven_builder',
    generateBuilderPrompt(mockProject, currentPhase, nextTask),
    nextTask.id,
  ),
  buildPromptCard(
    'prompt-auditor-phase34',
    'nightraven_auditor',
    generateAuditorPrompt(mockProject, currentPhase, nextTask),
    nextTask.id,
  ),
  buildPromptCard(
    'prompt-research-phase34',
    'research',
    generateResearchPrompt(mockProject, mockPhases[2] ?? currentPhase, researchTask),
    researchTask.id,
  ),
]

export const phase34Decisions: Decision[] = [
  {
    id: 'decision-storage',
    projectId: mockProject.id,
    question: 'Should MVP use mock data, local JSON, or SQLite?',
    options: ['Mock data first', 'Local JSON first', 'SQLite immediately'],
    recommendation: 'Use mock data first.',
    status: 'decided',
    impact: 'high',
    finalChoice: 'Mock data first',
    unlocksTaskIds: ['task-dashboard'],
  },
  {
    id: 'decision-priority-ui',
    projectId: mockProject.id,
    question: 'Should the priority board use drag-and-drop lanes or static columns?',
    options: [
      'Drag-and-drop lanes',
      'Static columns with move buttons',
      'Read-only columns until Phase 3',
    ],
    recommendation: 'Static columns with move buttons for MVP — less scope risk.',
    status: 'open',
    impact: 'high',
    unlocksTaskIds: ['task-roadmap'],
  },
  {
    id: 'decision-audit-gate',
    projectId: mockProject.id,
    question: 'Must every Phase 1 task pass Auditor before Phase 2 starts?',
    options: ['Yes — hard gate', 'Yes — soft gate with exceptions', 'No — parallel phases'],
    recommendation: 'Yes — hard gate for Phase 1 only.',
    status: 'open',
    impact: 'medium',
    unlocksTaskIds: ['task-roadmap', 'task-dashboard'],
  },
  {
    id: 'decision-tailwind',
    projectId: mockProject.id,
    question: 'Should Compass adopt Tailwind CSS?',
    options: ['Yes', 'No — custom CSS only'],
    recommendation: 'No — custom CSS only.',
    status: 'superseded',
    impact: 'low',
    finalChoice: 'No — custom CSS only',
    unlocksTaskIds: [],
  },
]

export const phase34Blockers: Blocker[] = [
  {
    id: 'blocker-audit-gate',
    projectId: mockProject.id,
    title: 'Phase 1 dashboard audit not complete',
    reason:
      'Auditor has not signed off on the dashboard task — Phase 2 roadmap work is frozen.',
    severity: 'high',
    blockedTaskIds: ['task-roadmap'],
    owner: 'nightraven_auditor',
    resolutionNeeded:
      'Run Auditor against Phase 1 dashboard; fix findings or get explicit user bypass.',
    status: 'open',
  },
  {
    id: 'blocker-storage',
    projectId: mockProject.id,
    title: 'Persistent storage not ready',
    reason:
      'The MVP should prove the dashboard and workflow before adding storage complexity.',
    severity: 'medium',
    blockedTaskIds: [],
    owner: 'gods_eye',
    resolutionNeeded: 'Use mock data through Phase 4 and revisit storage after scope lock review.',
    status: 'open',
  },
  {
    id: 'blocker-priority-decision',
    projectId: mockProject.id,
    title: 'Priority board UX undecided',
    reason:
      'Drag-and-drop vs static columns is still open — building lanes now risks rework.',
    severity: 'medium',
    blockedTaskIds: ['task-roadmap'],
    owner: 'user',
    resolutionNeeded: 'Close decision-priority-ui on the Decisions page.',
    status: 'in_progress',
  },
  {
    id: 'blocker-scope-lock',
    projectId: mockProject.id,
    title: 'Scope lock warning — cloud sync mentioned in handoff',
    reason:
      'Recent handoff text references cloud sync, which is Not Now until local storage works.',
    severity: 'low',
    blockedTaskIds: [],
    owner: 'gods_eye',
    resolutionNeeded:
      'Trim handoff to mock-only scope or move cloud sync to Not Now with revisit condition.',
    status: 'open',
  },
  {
    id: 'blocker-legacy-nav',
    projectId: mockProject.id,
    title: 'Duplicate sidebar nav experiment',
    reason: 'Superseded by unified navigation.ts — no longer blocks work.',
    severity: 'low',
    blockedTaskIds: [],
    owner: 'nightraven_builder',
    resolutionNeeded: 'None — archived.',
    status: 'resolved',
  },
]
