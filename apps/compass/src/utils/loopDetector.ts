import type { MemoryFeedItem } from '../types/snapshot'

const STOP_WORDS = new Set([
  'about',
  'after',
  'also',
  'apps',
  'compass',
  'docs',
  'from',
  'gods',
  'handoff',
  'into',
  'memory',
  'nightraven',
  'only',
  'push',
  'repo',
  'session',
  'that',
  'this',
  'touch',
  'with',
])

export type LoopTheme = {
  theme: string
  count: number
  sessions: string[]
}

export function detectLoopThemes(memoryFeed: MemoryFeedItem[]): LoopTheme[] {
  const themeMap = new Map<string, { count: number; sessions: string[] }>()

  for (const item of memoryFeed) {
    const words =
      item.text
        .toLowerCase()
        .match(/\b[a-z][a-z0-9-]{3,}\b/g)
        ?.filter((word) => !STOP_WORDS.has(word)) ?? []
    const unique = new Set(words)

    for (const word of unique) {
      const existing = themeMap.get(word) ?? { count: 0, sessions: [] }
      existing.count += 1
      if (!existing.sessions.includes(item.date)) {
        existing.sessions.push(item.date)
      }
      themeMap.set(word, existing)
    }
  }

  return [...themeMap.entries()]
    .filter(([, value]) => value.count >= 2)
    .map(([theme, value]) => ({ theme, count: value.count, sessions: value.sessions }))
    .sort((left, right) => right.count - left.count)
    .slice(0, 12)
}
