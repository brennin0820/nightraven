import { readFile, writeFile } from 'node:fs/promises'
import { z } from 'zod'
import { AgentTool } from './AgentTool.js'

const schema = z.object({
  path: z.string(),
  old_string: z.string(),
  new_string: z.string(),
  replace_all: z.boolean().default(false),
})

export class FileEditTool extends AgentTool<z.infer<typeof schema>> {
  readonly name = 'file_edit'
  readonly description = 'Replace exact string(s) in a file.'
  readonly schema = schema

  protected async _run({ path, old_string, new_string, replace_all }: z.infer<typeof schema>) {
    const content = await readFile(path, 'utf8')
    if (!content.includes(old_string)) throw new Error(`old_string not found in ${path}`)
    const updated = replace_all
      ? content.split(old_string).join(new_string)
      : content.replace(old_string, new_string)
    await writeFile(path, updated, 'utf8')
    return `Edited: ${path}`
  }
}
