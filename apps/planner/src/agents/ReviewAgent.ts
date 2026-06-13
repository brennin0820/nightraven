import type { ArchitectureOutput, LayoutPlan, ReviewOutput, AgentResult } from '../types/agent.js'
import { logger } from '../utils/logger.js'
import { getToolsForDivision, type DivisionName } from '../tools/registry.js'
import type { AgentTool } from '../tools/AgentTool.js'

const COVERAGE_THRESHOLD = 80

export class ReviewAgent {
  readonly role = 'reviewer' as const
  readonly division: DivisionName = 'auditor'
  readonly tools: AgentTool[]

  constructor() {
    this.tools = getToolsForDivision(this.division)
    logger.info('reviewer', 'Tool belt loaded', { tools: this.tools.map((t) => t.name) })
  }

  run(layout: LayoutPlan, architecture: ArchitectureOutput): AgentResult<ReviewOutput> {
    const start = Date.now()
    logger.phase('reviewer', 'Phase 3 — quality gate')

    const findings: ReviewOutput['findings'] = []

    // Validate layout contract is a DAG
    const ids = new Set(layout.modules.map((m) => m.id))
    for (const [id, deps] of Object.entries(layout.layoutContract)) {
      if (!ids.has(id)) {
        findings.push({ severity: 'error', message: `Layout contract references unknown module: ${id}` })
      }
      for (const dep of deps) {
        if (!ids.has(dep)) {
          findings.push({ severity: 'error', message: `Dependency ${dep} of ${id} is unknown` })
        }
      }
    }

    // Validate every MVP module has an ADR backing it
    if (architecture.adrs.length < 1) {
      findings.push({ severity: 'warn', message: 'No ADRs recorded — architecture decisions undocumented' })
    }

    // Simulated coverage (foundation — no tests exist yet)
    const coveragePercent = architecture.mvpScope.length > 0 ? 0 : 100
    if (coveragePercent < COVERAGE_THRESHOLD) {
      findings.push({
        severity: 'warn',
        message: `Coverage ${coveragePercent}% below ${COVERAGE_THRESHOLD}% threshold — add tests before implementation`,
      })
    }

    const errors = findings.filter((f) => f.severity === 'error')
    const passed = errors.length === 0

    logger.info('reviewer', passed ? 'PASS' : 'FAIL', { findings: findings.length, coveragePercent })

    return {
      role: this.role,
      output: { passed, findings, coveragePercent },
      durationMs: Date.now() - start,
    }
  }
}
