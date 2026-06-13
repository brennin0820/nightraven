import { readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { z } from 'zod'
import { AgentTool } from './AgentTool.js'

const schema = z.object({
  pattern: z.string(),
  cwd: z.string().default('.'),
})

async function walk(dir: string, base: string, pattern: RegExp): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const results: string[] = []
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) results.push(...await walk(full, base, pattern))
    else if (pattern.test(relative(base, full))) results.push(relative(base, full))
  }
  return results
}

function globToRegex(pattern: string) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '§DOUBLE§')
    .replace(/\*/g, '[^/]*')
    .replace(/§DOUBLE§/g, '.*')
  return new RegExp(`^${escaped}$`)
}

export class GlobTool extends AgentTool<z.infer<typeof schema>> {
  readonly name = 'glob'
  readonly description = 'Find files matching a glob pattern.'
  readonly schema = schema

  protected async _run({ pattern, cwd }: z.infer<typeof schema>) {
    const matches = await walk(cwd, cwd, globToRegex(pattern))
    return matches.length ? matches.join('\n') : '(no matches)'
  }
}
