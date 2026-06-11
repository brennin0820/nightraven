import {
  mockBlockers,
  mockDecisions,
  mockPhases,
  mockProgress,
  mockProject,
  mockPromptCards,
  mockTasks,
  mockNotNowItems,
} from '../../data/mockProject'
import { calculateAuditProgress, calculateBuildProgress, calculateDecisionProgress } from '../../utils/progress'
import { PromptCard } from '../prompts/PromptCard'
import { BlockerCard } from './BlockerCard'
import { CurrentPhaseCard } from './CurrentPhaseCard'
import { DecisionCard } from './DecisionCard'
import { NextBestActionCard } from './NextBestActionCard'
import { NotNowCard } from './NotNowCard'
import { ProgressSummaryCard } from './ProgressSummaryCard'
import { ProjectStatusCard } from './ProjectStatusCard'

export function DashboardPage() {
  const currentPhase =
    mockPhases.find((phase) => phase.id === mockProject.currentPhaseId) ?? mockPhases[0]
  const nextBestTask =
    mockTasks.find((task) => task.lane === 'now' && task.state === 'build') ?? mockTasks[0]
  const blocker = mockBlockers[0]
  const decision = mockDecisions[0]
  const promptCard = mockPromptCards[0]

  const calculatedProgress = {
    ...mockProgress,
    buildProgress: calculateBuildProgress(mockTasks),
    auditProgress: calculateAuditProgress([]),
    decisionProgress: calculateDecisionProgress(mockDecisions),
  }

  return (
    <section className="dashboard">
      <div className="dashboard__summary">
        <ProjectStatusCard project={mockProject} />
        <NextBestActionCard task={nextBestTask} />
      </div>

      <div className="dashboard__grid">
        <CurrentPhaseCard phase={currentPhase} />
        <ProgressSummaryCard progress={calculatedProgress} />
        <BlockerCard blocker={blocker} />
        <DecisionCard decision={decision} />
        <NotNowCard items={mockNotNowItems} />
        <PromptCard promptCard={promptCard} />
      </div>
    </section>
  )
}
