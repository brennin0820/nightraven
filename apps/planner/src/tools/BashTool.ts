import { exec } from 'node:child_process'
import { promisify } from 'node:util'
import { z } from 'zod'
import { AgentTool } from './AgentTool.js'

const execAsync = promisify(exec)

const schema = z.object({
  command: z.string(),
  cwd: z.string().optional(),
  timeout: z.number().default(30_000),
})

export class BashTool extends AgentTool<z.infer<typeof schema>> {
  readonly name = 'bash'
  readonly description = 'Execute a shell command. Builder division only.'
  readonly schema = schema

  protected async _run({ command, cwd, timeout }: z.infer<typeof schema>) {
    const { stdout, stderr } = await execAsync(command, { cwd, timeout })
    return stderr ? `stdout:\n${stdout}\nstderr:\n${stderr}` : stdout
  }
}
