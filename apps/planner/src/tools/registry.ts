import type { AgentTool } from './AgentTool.js'
import { BashTool }     from './BashTool.js'
import { FileReadTool } from './FileReadTool.js'
import { FileWriteTool } from './FileWriteTool.js'
import { FileEditTool } from './FileEditTool.js'
import { GlobTool }     from './GlobTool.js'
import { GrepTool }     from './GrepTool.js'
import { WebFetchTool } from './WebFetchTool.js'
import { WebSearchTool } from './WebSearchTool.js'

export type DivisionName = 'planner' | 'researcher' | 'architect' | 'builder' | 'auditor'

// Curated tool belt per division — Auditor never gets bash/write, Builder gets all
const DIVISION_TOOLS: Record<DivisionName, string[]> = {
  planner:    ['web_search', 'file_read', 'file_write'],
  researcher: ['web_search', 'web_fetch', 'file_read', 'glob'],
  architect:  ['file_read', 'file_write', 'glob', 'grep'],
  builder:    ['bash', 'file_read', 'file_write', 'file_edit', 'glob', 'grep'],
  auditor:    ['file_read', 'glob', 'grep'],
}

const ALL_TOOLS: AgentTool[] = [
  new BashTool(),
  new FileReadTool(),
  new FileWriteTool(),
  new FileEditTool(),
  new GlobTool(),
  new GrepTool(),
  new WebFetchTool(),
  new WebSearchTool(),
]

const toolRegistry = new Map<string, AgentTool>(ALL_TOOLS.map((t) => [t.name, t]))

export function getToolsForDivision(division: DivisionName): AgentTool[] {
  return DIVISION_TOOLS[division].map((name) => {
    const tool = toolRegistry.get(name)
    if (!tool) throw new Error(`Unknown tool: ${name}`)
    return tool
  })
}

export function listTools(division: DivisionName) {
  return DIVISION_TOOLS[division]
}
