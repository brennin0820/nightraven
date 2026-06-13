import { writeFile, mkdir } from 'node:fs/promises'
import { dirname } from 'node:path'
import { z } from 'zod'
import { AgentTool } from './AgentTool.js'

const schema = z.object({
  path: z.string(),
  content: z.string(),
})

export class FileWriteTool extends AgentTool<z.infer<typeof schema>> {
  readonly name = 'file_write'
  readonly description = 'Write content to a file, creating parent directories as needed.'
  readonly schema = schema

  protected async _run({ path, content }: z.infer<typeof schema>) {
    await mkdir(dirname(path), { recursive: true })
    await writeFile(path, content, 'utf8')
    return `Written: ${path} (${content.length} chars)`
  }
}
