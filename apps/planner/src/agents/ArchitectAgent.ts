import type { ResearchOutput, LayoutPlan, ArchitectureOutput, AgentResult } from '../types/agent.js'
import { logger } from '../utils/logger.js'

export class ArchitectAgent {
  readonly role = 'architect' as const

  run(layout: LayoutPlan, research: ResearchOutput): AgentResult<ArchitectureOutput> {
    const start = Date.now()
    logger.phase('architect', 'Phase 2 — creating ADRs + MoSCoW MVP scope')

    const adrs = [
      {
        id: 'ADR-001',
        decision: 'TypeScript strict mode across all modules',
        rationale: research.bestPractices[2] ?? 'Type safety at module boundaries',
      },
      {
        id: 'ADR-002',
        decision: 'Layout contract enforced as DAG — no circular dependencies',
        rationale: research.risks[1] ?? 'Prevents cascading render failures',
      },
      {
        id: 'ADR-003',
        decision: 'Auth module is the only module with no upstream dependencies',
        rationale: research.bestPractices[0] ?? 'Auth boundary at shell level',
      },
    ]

    const mvpScope = layout.modules.filter((m) => m.priority === 'must')
    const roadmap  = layout.modules.filter((m) => m.priority !== 'must')

    logger.info('architect', 'Architecture ready', {
      adrCount: adrs.length,
      mvpModules: mvpScope.map((m) => m.name),
    })

    return {
      role: this.role,
      output: { adrs, mvpScope, roadmap },
      durationMs: Date.now() - start,
    }
  }
}
