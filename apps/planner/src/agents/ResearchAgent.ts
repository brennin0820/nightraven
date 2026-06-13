import type { LayoutPlan, ResearchOutput, AgentResult } from '../types/agent.js'
import { logger } from '../utils/logger.js'

export class ResearchAgent {
  readonly role = 'researcher' as const

  run(layout: LayoutPlan): AgentResult<ResearchOutput> {
    const start = Date.now()
    logger.phase('researcher', 'Phase 1 — generating PRD + best-practices', {
      modules: layout.modules.map((m) => m.name),
    })

    const mustModules = layout.modules.filter((m) => m.priority === 'must')

    const prd = [
      `## Product Requirements Document`,
      `### Must-have modules (${mustModules.length})`,
      ...mustModules.map((m) => `- **${m.name}**: ${m.description}`),
    ].join('\n')

    const bestPractices = [
      'Enforce auth boundary at the shell level — never inside individual pages',
      'Layout contract defines render order; never skip a dependency tier',
      'Each module owns its own type definitions — no cross-module type imports',
      'Planner output is append-only once approved — use Supersedes for corrections',
    ]

    const risks = [
      'Scope creep via "could" modules entering MVP — gate with MoSCoW review',
      'Layout contract cycles — validate DAG before Architecture phase',
    ]

    logger.info('researcher', 'PRD ready', { practiceCount: bestPractices.length })
    return { role: this.role, output: { prd, bestPractices, risks }, durationMs: Date.now() - start }
  }
}
