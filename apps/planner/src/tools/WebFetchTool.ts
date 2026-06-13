import { z } from 'zod'
import { AgentTool } from './AgentTool.js'

const schema = z.object({
  url: z.string().url(),
  prompt: z.string().optional(),
})

export class WebFetchTool extends AgentTool<z.infer<typeof schema>> {
  readonly name = 'web_fetch'
  readonly description = 'Fetch text content from a URL.'
  readonly schema = schema

  protected async _run({ url }: z.infer<typeof schema>) {
    const res = await fetch(url, { headers: { 'User-Agent': 'NightRaven-Researcher/1.0' } })
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
    const text = await res.text()
    // Strip HTML tags, truncate
    return text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 4000)
  }
}
