import { createContext } from 'react'
import type { SelectedProject } from '../services/compassApi'
import type { ProjectSnapshot, RegistryEntry } from '../types/snapshot'

export type ProjectContextValue = {
  registry: RegistryEntry[]
  snapshot: ProjectSnapshot | null
  loading: boolean
  error: string | null
  selected: SelectedProject | null
  selectProject: (path: string, label: string) => void
  refresh: () => void
}

export const CompassContext = createContext<ProjectContextValue | null>(null)
