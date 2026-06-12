import type { ProjectSnapshot, RegistryEntry } from '../types/snapshot'

const STORAGE_KEY = 'compass.selectedProject'

/** Consumer app Brent is actively guiding — override via Settings registry picker. */
export const PREFERRED_DEFAULT_PROJECT = {
  path: 'E:/NightRaven/HimFLer',
  label: 'HimFLer (iOS app)',
} as const

function normalizePath(value: string): string {
  return value.replace(/\\/g, '/').toLowerCase()
}

export function pickInitialProject(registry: RegistryEntry[]): SelectedProject {
  const stored = loadStoredProject()
  if (stored) {
    const match = registry.find(
      (entry) => entry.available && normalizePath(entry.path) === normalizePath(stored.path),
    )
    if (match) return { path: match.path, label: match.label }
  }

  const preferred = registry.find(
    (entry) =>
      entry.available &&
      normalizePath(entry.path) === normalizePath(PREFERRED_DEFAULT_PROJECT.path),
  )
  if (preferred) return { path: preferred.path, label: preferred.label }

  const himfler = registry.find(
    (entry) =>
      entry.available &&
      (normalizePath(entry.path).includes('himfler') ||
        entry.label.toLowerCase().includes('himfl')),
  )
  if (himfler) return { path: himfler.path, label: himfler.label }

  const appEntry = registry.find((entry) => entry.available && entry.role === 'app')
  if (appEntry) return { path: appEntry.path, label: appEntry.label }

  const any = registry.find((entry) => entry.available)
  if (any) return { path: any.path, label: any.label }

  return {
    path: PREFERRED_DEFAULT_PROJECT.path,
    label: PREFERRED_DEFAULT_PROJECT.label,
  }
}

export type SelectedProject = {
  path: string
  label: string
}

export function loadStoredProject(): SelectedProject | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SelectedProject
  } catch {
    return null
  }
}

export function storeProject(project: SelectedProject) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(project))
}

export async function fetchRegistry(): Promise<RegistryEntry[]> {
  const response = await fetch('/api/registry')
  if (!response.ok) throw new Error(`Registry failed: ${response.status}`)
  const data = (await response.json()) as { registry: RegistryEntry[] }
  return data.registry
}

export async function fetchProjectSnapshot(
  path: string,
  label: string,
): Promise<ProjectSnapshot> {
  const params = new URLSearchParams({ path, label })
  const response = await fetch(`/api/project?${params.toString()}`)
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string }
    throw new Error(body.error ?? `Project load failed: ${response.status}`)
  }
  return response.json() as Promise<ProjectSnapshot>
}
