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
  const { snapshot, loading, error, selected } = useCompassData()
  const activeItem = navItems.find((item) => item.id === activeView) ?? navItems[0]
  const dataMode = snapshot?.settings.dataMode ?? 'local'
  const modeLabel =
    dataMode === 'registry'
      ? "God's Eye registry"
      : dataMode === 'local'
        ? 'Local + IndexedDB'
        : 'Seed data'

  let statusBanner: ReactNode = null
  if (loading) {
    statusBanner = (
      <div className="compass-status compass-status--loading" role="status">
        Loading project snapshot…
      </div>
    )
  } else if (error) {
    statusBanner = (
      <div className="compass-status compass-status--error" role="alert">
        {error}
      </div>
    )
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onViewChange={onViewChange} />
      <main className="app-main">
        <header className="app-header">
          <div>
            <p className="eyebrow">NightRaven Compass</p>
            <h1>{activeItem.label}</h1>
            {selected ? (
              <p className="header-project">
                {selected.label} · <code>{selected.path}</code>
              </p>
            ) : null}
          </div>
          <div className="header-status" aria-label="Data source status">
            <span className="header-badge" data-mode={dataMode}>
              {modeLabel}
            </span>
            <span>IndexedDB persistence</span>
            <span>{snapshot?.meta.handoffFound ? 'Handoff live' : 'No handoff file'}</span>
          </div>
        </header>
        {statusBanner}
        {children}
      </main>
    </div>
  )
}
