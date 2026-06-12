import type { ReactNode } from 'react'
import { Sidebar } from './Sidebar'
import { navItems, type NavItemId } from './navigation'

type AppShellProps = {
  activeView: NavItemId
  children: ReactNode
  onViewChange: (view: NavItemId) => void
}

export function AppShell({ activeView, children, onViewChange }: AppShellProps) {
  const activeItem = navItems.find((item) => item.id === activeView) ?? navItems[0]

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onViewChange={onViewChange} />
      <main className="app-main">
        <header className="app-header">
          <div>
            <p className="eyebrow">Phase 1 · NightRaven Compass</p>
            <h1>{activeItem.label}</h1>
          </div>
          <div className="header-status" aria-label="Data source status">
            <span className="header-badge" data-mode="mock">
              Mock data
            </span>
            <span>No cloud sync</span>
            <span>Read-only</span>
          </div>
        </header>
        {children}
      </main>
    </div>
  )
}
