import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { buildMockSnapshot } from '../data/mockSnapshot'
import type { AuditItem, Blocker, Decision, Phase, Task } from '../types/project'
import type { CompassSettingsProfile, ProjectSnapshot } from '../types/snapshot'
import { enrichSnapshot } from '../utils/enrichSnapshot'
import {
  fetchProjectSnapshot,
  fetchRegistry,
  loadStoredProject,
  pickInitialProject,
  storeProject,
  type SelectedProject,
} from '../services/compassApi'
import {
  createEmptyOverrides,
  loadOverrides,
  saveOverrides,
  type ProjectOverrides,
} from '../services/persistence'
import { mergeSnapshot } from '../services/snapshotMerge'
import { CompassContext, type ProjectContextValue } from './compassContext'

async function loadBaseSnapshot(
  path: string,
  label: string,
): Promise<{ base: ProjectSnapshot; dataMode: CompassSettingsProfile['dataMode'] }> {
  try {
    const base = await fetchProjectSnapshot(path, label)
    return { base, dataMode: 'registry' }
  } catch {
    const seed = buildMockSnapshot()
    seed.meta.projectPath = path
    seed.project = { ...seed.project, name: label, id: seed.project.id }
    return { base: seed, dataMode: 'local' }
  }
}

function composeSnapshot(
  base: ProjectSnapshot,
  overrides: ProjectOverrides | null,
  dataMode: CompassSettingsProfile['dataMode'],
): ProjectSnapshot {
  const merged = mergeSnapshot(base, overrides)
  return enrichSnapshot(merged, overrides?.settings?.dataMode ?? dataMode)
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [registry, setRegistry] = useState<ProjectSnapshot['registry']>([])
  const [snapshot, setSnapshot] = useState<ProjectSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<SelectedProject | null>(loadStoredProject())

  const baseRef = useRef<ProjectSnapshot | null>(null)
  const overridesRef = useRef<ProjectOverrides | null>(null)
  const dataModeRef = useRef<CompassSettingsProfile['dataMode']>('registry')

  const applySnapshot = useCallback(
    (base: ProjectSnapshot, overrides: ProjectOverrides | null, dataMode: CompassSettingsProfile['dataMode']) => {
      baseRef.current = base
      overridesRef.current = overrides
      dataModeRef.current = dataMode
      setSnapshot(composeSnapshot(base, overrides, dataMode))
    },
    [],
  )

  const loadProject = useCallback(
    async (path: string, label: string) => {
      setLoading(true)
      setError(null)
      try {
        const { base, dataMode } = await loadBaseSnapshot(path, label)
        let overrides = await loadOverrides(path)
        if (!overrides) {
          overrides = createEmptyOverrides(path)
          await saveOverrides(overrides)
        }
        applySnapshot(base, overrides, dataMode)
        setSelected({ path, label })
        storeProject({ path, label })
      } catch (loadError) {
        setError(String(loadError))
      } finally {
        setLoading(false)
      }
    },
    [applySnapshot],
  )

  const persistOverrides = useCallback(
    async (nextOverrides: ProjectOverrides) => {
      overridesRef.current = nextOverrides
      await saveOverrides(nextOverrides)
      if (baseRef.current) {
        applySnapshot(baseRef.current, nextOverrides, dataModeRef.current)
      }
    },
    [applySnapshot],
  )

  const ensureOverrides = useCallback((): ProjectOverrides => {
    if (overridesRef.current) return overridesRef.current
    const path = selected?.path ?? 'local://compass'
    const empty = createEmptyOverrides(path)
    overridesRef.current = empty
    return empty
  }, [selected?.path])

  const updateTask = useCallback(
    async (taskId: string, patch: Partial<Task>) => {
      const overrides = { ...ensureOverrides() }
      overrides.taskPatches = {
        ...overrides.taskPatches,
        [taskId]: { ...(overrides.taskPatches?.[taskId] ?? {}), ...patch },
      }
      await persistOverrides(overrides)
    },
    [ensureOverrides, persistOverrides],
  )

  const updateDecision = useCallback(
    async (decisionId: string, patch: Partial<Decision>) => {
      const overrides = { ...ensureOverrides() }
      overrides.decisionPatches = {
        ...overrides.decisionPatches,
        [decisionId]: { ...(overrides.decisionPatches?.[decisionId] ?? {}), ...patch },
      }
      await persistOverrides(overrides)
    },
    [ensureOverrides, persistOverrides],
  )

  const updateBlocker = useCallback(
    async (blockerId: string, patch: Partial<Blocker>) => {
      const overrides = { ...ensureOverrides() }
      overrides.blockerPatches = {
        ...overrides.blockerPatches,
        [blockerId]: { ...(overrides.blockerPatches?.[blockerId] ?? {}), ...patch },
      }
      await persistOverrides(overrides)
    },
    [ensureOverrides, persistOverrides],
  )

  const updateAuditItem = useCallback(
    async (auditId: string, patch: Partial<AuditItem>) => {
      const overrides = { ...ensureOverrides() }
      overrides.auditPatches = {
        ...overrides.auditPatches,
        [auditId]: { ...(overrides.auditPatches?.[auditId] ?? {}), ...patch },
      }
      await persistOverrides(overrides)
    },
    [ensureOverrides, persistOverrides],
  )

  const updatePhase = useCallback(
    async (phaseId: string, patch: Partial<Phase>) => {
      const overrides = { ...ensureOverrides() }
      overrides.phasePatches = {
        ...overrides.phasePatches,
        [phaseId]: { ...(overrides.phasePatches?.[phaseId] ?? {}), ...patch },
      }
      await persistOverrides(overrides)
    },
    [ensureOverrides, persistOverrides],
  )

  const updateSettings = useCallback(
    async (patch: Partial<CompassSettingsProfile>) => {
      const overrides = { ...ensureOverrides() }
      overrides.settings = { ...overrides.settings, ...patch }
      await persistOverrides(overrides)
    },
    [ensureOverrides, persistOverrides],
  )

  const refresh = useCallback(async () => {
    if (!selected) return
    await loadProject(selected.path, selected.label)
  }, [loadProject, selected])

  const selectProject = useCallback(
    (path: string, label: string) => {
      void loadProject(path, label)
    },
    [loadProject],
  )

  useEffect(() => {
    async function bootstrap() {
      setLoading(true)
      try {
        const entries = await fetchRegistry().catch(() => [])
        setRegistry(entries)

        const target = pickInitialProject(entries)
        await loadProject(target.path, target.label)
      } catch (bootstrapError) {
        setError(String(bootstrapError))
        const seed = buildMockSnapshot()
        applySnapshot(seed, createEmptyOverrides('mock://nightraven-compass'), 'mock')
        setLoading(false)
      }
    }

    void bootstrap()
  }, [applySnapshot, loadProject])

  const value = useMemo<ProjectContextValue>(
    () => ({
      registry,
      snapshot,
      loading,
      error,
      selected,
      selectProject,
      refresh,
      updateTask,
      updateDecision,
      updateBlocker,
      updateAuditItem,
      updatePhase,
      updateSettings,
    }),
    [
      registry,
      snapshot,
      loading,
      error,
      selected,
      selectProject,
      refresh,
      updateTask,
      updateDecision,
      updateBlocker,
      updateAuditItem,
      updatePhase,
      updateSettings,
    ],
  )

  return <CompassContext.Provider value={value}>{children}</CompassContext.Provider>
}
