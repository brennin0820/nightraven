import type { AppSpec, LayoutPlan, Module, AgentResult } from '../types/agent.js'
import { logger } from '../utils/logger.js'
import { getToolsForDivision, type DivisionName } from '../tools/registry.js'
import type { AgentTool } from '../tools/AgentTool.js'

const CORE_MODULES: Omit<Module, 'id'>[] = [
  { name: 'Auth',      priority: 'must',   description: 'Identity, session, permissions' },
  { name: 'Shell',     priority: 'must',   description: 'App shell, layout, navigation' },
  { name: 'Dashboard', priority: 'must',   description: 'Primary data surface' },
  { name: 'Settings',  priority: 'should', description: 'User preferences and config' },
  { name: 'Reports',   priority: 'could',  description: 'Export and analytics' },
]

export class PlannerAgent {
  readonly role = 'planner' as const
  readonly division: DivisionName = 'planner'
  readonly tools: AgentTool[]

  constructor() {
    this.tools = getToolsForDivision(this.division)
    logger.info('planner', 'Tool belt loaded', { tools: this.tools.map((t) => t.name) })
  }

  run(spec: AppSpec): AgentResult<LayoutPlan> {
    const start = Date.now()
    logger.phase('planner', 'Phase 0 — decomposing spec into layout', { app: spec.name })

    const modules: Module[] = CORE_MODULES.map((m, i) => ({
      ...m,
      id: `mod-${i + 1}-${m.name.toLowerCase()}`,
    }))

    // dependency contract: shell depends on auth; dashboard depends on shell
    const layoutContract: Record<string, string[]> = {
      'mod-1-auth':      [],
      'mod-2-shell':     ['mod-1-auth'],
      'mod-3-dashboard': ['mod-2-shell'],
      'mod-4-settings':  ['mod-2-shell'],
      'mod-5-reports':   ['mod-3-dashboard'],
    }

    const layout: LayoutPlan = { modules, layoutContract }
    logger.info('planner', 'Layout plan ready', { moduleCount: modules.length })

    return { role: this.role, output: layout, durationMs: Date.now() - start }
  }
}
