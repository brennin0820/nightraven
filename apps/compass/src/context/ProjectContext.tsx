import { useMemo, type ReactNode } from 'react'
import { buildMockSnapshot } from '../data/mockSnapshot'
import { CompassContext } from './compassContext'

export function ProjectProvider({ children }: { children: ReactNode }) {
  const value = useMemo(() => {
    const snapshot = buildMockSnapshot()
    const active = snapshot.registry.find((entry) => entry.available) ?? snapshot.registry[0]

    return {
      registry: snapshot.registry,
      snapshot,
      loading: false,
      error: null,
      selected: active
        ? { path: active.path, label: active.label }
        : null,
      selectProject: () => undefined,
      refresh: () => undefined,
    }
  }, [])

  return <CompassContext.Provider value={value}>{children}</CompassContext.Provider>
}
