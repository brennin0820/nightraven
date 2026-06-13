export type AgentRole = 'planner' | 'researcher' | 'architect' | 'reviewer'

export type Module = {
  id: string
  name: string
  priority: 'must' | 'should' | 'could' | 'wont'
  description: string
}

export type AppSpec = {
  name: string
  intent: string
  constraints?: string[]
}

export type LayoutPlan = {
  modules: Module[]
  layoutContract: Record<string, string[]>  // module id → dependency ids
  approvedAt?: string
}

export type ResearchOutput = {
  prd: string
  bestPractices: string[]
  risks: string[]
}

export type ArchitectureOutput = {
  adrs: Array<{ id: string; decision: string; rationale: string }>
  mvpScope: Module[]
  roadmap: Module[]
}

export type ReviewOutput = {
  passed: boolean
  findings: Array<{ severity: 'error' | 'warn' | 'info'; message: string }>
  coveragePercent: number
}

export type FlowState = {
  spec: AppSpec
  layout?: LayoutPlan
  research?: ResearchOutput
  architecture?: ArchitectureOutput
  review?: ReviewOutput
  phase: 0 | 1 | 2 | 3
  approved: boolean
}

export type AgentResult<T> = {
  role: AgentRole
  output: T
  durationMs: number
}
