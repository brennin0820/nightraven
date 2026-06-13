import { type ZodType, type ZodTypeDef } from 'zod'

export type ToolResult = {
  ok: boolean
  output: string
  durationMs: number
}

// TOutput = parsed/output type; schema input type is unknown to allow ZodDefault fields
export abstract class AgentTool<TOutput = unknown> {
  abstract readonly name: string
  abstract readonly description: string
  abstract readonly schema: ZodType<TOutput, ZodTypeDef, unknown>

  async run(input: TOutput): Promise<ToolResult> {
    const start = Date.now()
    try {
      const output = await this._run(input)
      return { ok: true, output, durationMs: Date.now() - start }
    } catch (err) {
      return { ok: false, output: String(err), durationMs: Date.now() - start }
    }
  }

  protected abstract _run(input: TOutput): Promise<string>
}
