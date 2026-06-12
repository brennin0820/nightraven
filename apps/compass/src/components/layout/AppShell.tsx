import { RefreshCw } from 'lucide-react'
import type { ReactNode } from 'react'
import { useCompassData } from '../../hooks/useCompassData'
import { Sidebar } from './Sidebar'
import { navItems, type NavItemId } from './navigation'

type AppShellProps = {
  activeView: NavItemId
  children: ReactNode
  onViewChange: (view: NavItemId) => void
}

export function AppShell({ activeView, children, onViewChange }: AppShellProps) {
  const { snapshot, registry, selected, selectProject, refresh, loading } = useCompassData()
  const activeItem = navItems.find((item) => item.id === activeView) ?? navItems[0]
  const available = registry.filter((entry) => entry.available)
  const dataMode = snapshot?.meta.handoffFound ? 'live' : 'partial'

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onViewChange={onViewChange} />
      <main className="app-main">
        <header className="app-header">
          <div>
            <p className="eyebrow">{activeItem.phase} · NightRaven Compass</p>
            <h1>{activeItem.label}</h1>
          </div>
          <div className="header-actions">
            <label className="project-switcher">
              <span className="project-switcher__label">Project</span>
              <select
                aria-label="Select project"
                className="project-switcher__select"
                onChange={(event) => {
                  const entry = available.find((item) => item.path === event.target.value)
                  if (entry) selectProject(entry.path, entry.label)
                }}
                value={selected?.path ?? ''}
              >
                {available.map((entry) => (
                  <option key={entry.path} value={entry.path}>
                    {entry.label}
                  </option>
                ))}
              </select>
            </label>
            <button
              aria-label="Refresh project snapshot"
              className="header-refresh"
              disabled={loading}
              onClick={refresh}
              type="button"
            >
              <RefreshCw size={14} aria-hidden="true" />
              Refresh
            </button>
            <div className="header-status" aria-label="Data source status">
              <span className="header-badge" data-mode={dataMode}>
                {dataMode === 'live' ? 'Live data' : 'Partial — needs handoff'}
              </span>
              <span>No cloud sync</span>
              <span>Read-only</span>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}
