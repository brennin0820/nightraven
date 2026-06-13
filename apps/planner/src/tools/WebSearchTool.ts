import { z } from 'zod'
import { AgentTool } from './AgentTool.js'

const schema = z.object({
  query: z.string(),
  maxResults: z.number().int().positive().default(5),
})

export class WebSearchTool extends AgentTool<z.infer<typeof schema>> {
  readonly name = 'web_search'
  readonly description = 'Search the web via DuckDuckGo instant answers API.'
  readonly schema = schema

  protected async _run({ query, maxResults }: z.infer<typeof schema>) {
    const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1`
    const res = await fetch(url)
    if (!res.ok) throw new Error(`DuckDuckGo API error: ${res.status}`)
    const data = await res.json() as { AbstractText?: string; RelatedTopics?: Array<{ Text?: string }> }
    const lines: string[] = []
    if (data.AbstractText) lines.push(data.AbstractText)
    for (const t of (data.RelatedTopics ?? []).slice(0, maxResults)) {
      if (t.Text) lines.push(`- ${t.Text}`)
    }
    return lines.join('\n') || '(no results)'
  }
}
