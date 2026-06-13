import { readFile } from 'node:fs/promises'
import { z } from 'zod'
import { AgentTool } from './AgentTool.js'

const schema = z.object({
  path: z.string(),
  offset: z.number().int().nonnegative().default(0),
  limit: z.number().int().positive().default(200),
})

export class FileReadTool extends AgentTool<z.infer<typeof schema>> {
  readonly name = 'file_read'
  readonly description = 'Read lines from a file with optional offset and limit.'
  readonly schema = schema

  protected async _run({ path, offset, limit }: z.infer<typeof schema>) {
    const content = await readFile(path, 'utf8')
    const lines = content.split('\n').slice(offset, offset + limit)
    return lines.map((l, i) => `${offset + i + 1}\t${l}`).join('\n')
  }
}
