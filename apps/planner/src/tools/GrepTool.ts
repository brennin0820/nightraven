import { readFile, readdir } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { z } from 'zod'
import { AgentTool } from './AgentTool.js'

const schema = z.object({
  pattern: z.string(),
  path: z.string().default('.'),
  glob: z.string().optional(),
  context: z.number().int().nonnegative().default(0),
})

async function grepFile(file: string, re: RegExp, context: number): Promise<string[]> {
  const lines = (await readFile(file, 'utf8')).split('\n')
  const results: string[] = []
  lines.forEach((line, i) => {
    if (re.test(line)) {
      const start = Math.max(0, i - context)
      const end = Math.min(lines.length - 1, i + context)
      for (let j = start; j <= end; j++) {
        results.push(`${file}:${j + 1}: ${lines[j]}`)
      }
    }
  })
  return results
}

async function walkGrep(dir: string, base: string, re: RegExp, context: number): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const results: string[] = []
  for (const entry of entries) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue
    const full = join(dir, entry.name)
    if (entry.isDirectory()) results.push(...await walkGrep(full, base, re, context))
    else results.push(...await grepFile(relative(base, full), re, context).catch(() => []))
  }
  return results
}

export class GrepTool extends AgentTool<z.infer<typeof schema>> {
  readonly name = 'grep'
  readonly description = 'Search file contents with a regex pattern.'
  readonly schema = schema

  protected async _run({ pattern, path, context }: z.infer<typeof schema>) {
    const re = new RegExp(pattern)
    const matches = await walkGrep(path, path, re, context)
    return matches.length ? matches.slice(0, 200).join('\n') : '(no matches)'
  }
}
