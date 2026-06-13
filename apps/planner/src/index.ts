import { AppFoundationFlow } from './flows/AppFoundationFlow.js'
import type { AppSpec } from './types/agent.js'
import { logger } from './utils/logger.js'

// Example spec — replace with real input or wire to God's Eye handoff
const spec: AppSpec = {
  name: 'NightRaven App',
  intent: 'Agent-native project guidance and memory platform for non-coder builders',
  constraints: ['No cross-repo memory bleed', 'Append-only memory docs'],
}

async function main() {
  const flow = new AppFoundationFlow()

  logger.phase('flow', '=== NightRaven Planner — App Foundation Flow ===')

  // Phase 0: plan layout and print for human approval
  let state = await flow.planLayout(spec)
  logger.info('flow', 'Layout plan ready — review and approve to continue', {
    modules: state.layout?.modules.map((m) => `${m.name} [${m.priority}]`),
  })

  // Auto-approve in dry-run mode; set approved = false to gate here
  const autoApprove = process.argv.includes('--approve')
  if (!autoApprove) {
    logger.warn('flow', 'Dry-run: pass --approve to run Research → Architecture → Review phases')
    process.exit(0)
  }

  state = { ...state, approved: true }
  state = await flow.runPipeline(state)

  logger.phase('flow', '=== Flow complete ===', { passed: state.review?.passed })
}

main().catch((err) => {
  logger.error('flow', String(err))
  process.exit(1)
})
