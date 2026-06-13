import type { FlowState, AppSpec } from '../types/agent.js'
import { PlannerAgent }    from '../agents/PlannerAgent.js'
import { ResearchAgent }   from '../agents/ResearchAgent.js'
import { ArchitectAgent }  from '../agents/ArchitectAgent.js'
import { ReviewAgent }     from '../agents/ReviewAgent.js'
import { logger }          from '../utils/logger.js'

export class AppFoundationFlow {
  private planner    = new PlannerAgent()
  private researcher = new ResearchAgent()
  private architect  = new ArchitectAgent()
  private reviewer   = new ReviewAgent()

  // Phase 0: Planner decomposes spec → layout (requires human approval before continuing)
  async planLayout(spec: AppSpec): Promise<FlowState> {
    const result = this.planner.run(spec)
    return { spec, layout: result.output, phase: 0, approved: false }
  }

  // Phases 1–3: run after human approves the layout plan
  async runPipeline(state: FlowState): Promise<FlowState> {
    if (!state.approved || !state.layout) {
      throw new Error('Layout must be approved before running the pipeline')
    }

    logger.phase('flow', '--- Phase 1: Research ---')
    const researchResult = this.researcher.run(state.layout)
    state = { ...state, research: researchResult.output, phase: 1 }

    logger.phase('flow', '--- Phase 2: Architecture ---')
    const archResult = this.architect.run(state.layout, state.research!)
    state = { ...state, architecture: archResult.output, phase: 2 }

    logger.phase('flow', '--- Phase 3: Review ---')
    const reviewResult = this.reviewer.run(state.layout, state.architecture!)
    state = { ...state, review: reviewResult.output, phase: 3 }

    if (!state.review!.passed) {
      logger.warn('flow', 'Review gate failed — inspect findings before proceeding')
    } else {
      logger.info('flow', 'Foundation pipeline complete — ready for implementation')
    }

    return state
  }
}
