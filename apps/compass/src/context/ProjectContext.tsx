import { useMemo, type ReactNode } from 'react'
import { buildMockSnapshot } from '../data/mockSnapshot'
import { CompassContext } from './compassContext'

export function ProjectProvider({ children }: { children: ReactNode }) {
  const value = useMemo(
    () => ({
      registry: [],
      snapshot: buildMockSnapshot(),
      loading: false,
      error: null,
      selected: null,
      selectProject: () => undefined,
      refresh: () => undefined,
    }),
    [],
  )

  return <CompassContext.Provider value={value}>{children}</CompassContext.Provider>
}
