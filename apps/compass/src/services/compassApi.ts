import type { ProjectSnapshot, RegistryEntry } from '../types/snapshot'

const STORAGE_KEY = 'compass.selectedProject'

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
