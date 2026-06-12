import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  fetchProjectSnapshot,
  fetchRegistry,
  loadStoredProject,
  storeProject,
  type SelectedProject,
} from '../services/compassApi'
import type { ProjectSnapshot, RegistryEntry } from '../types/snapshot'
import { CompassContext } from './compassContext'

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [registry, setRegistry] = useState<RegistryEntry[]>([])
  const [snapshot, setSnapshot] = useState<ProjectSnapshot | null>(null)
  const [selected, setSelected] = useState<SelectedProject | null>(loadStoredProject())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tick, setTick] = useState(0)

  const refresh = useCallback(() => setTick((value) => value + 1), [])

  const selectProject = useCallback((path: string, label: string) => {
    const next = { path, label }
    storeProject(next)
    setSelected(next)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const entries = await fetchRegistry()
        if (cancelled) return
        setRegistry(entries)

        const available = entries.filter((entry) => entry.available)
        const stored = loadStoredProject()
        const pick =
          (stored && available.find((entry) => entry.path === stored.path)) ??
          available[0]

        if (!pick) {
          setError('No registered project paths found on this machine.')
          setSnapshot(null)
          return
        }

        const active = stored?.path === pick.path ? stored : { path: pick.path, label: pick.label }
        setSelected(active)
        storeProject(active)

        const loaded = await fetchProjectSnapshot(active.path, active.label)
        if (cancelled) return
        setSnapshot(loaded)
      } catch (err) {
        if (cancelled) return
        setError(err instanceof Error ? err.message : String(err))
        setSnapshot(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [tick, selected?.path, selected?.label])

  const value = useMemo(
    () => ({
      registry,
      snapshot,
      loading,
      error,
      selected,
      selectProject,
      refresh,
    }),
    [registry, snapshot, loading, error, selected, selectProject, refresh],
  )

  return <CompassContext.Provider value={value}>{children}</CompassContext.Provider>
}
