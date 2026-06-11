import { useState } from 'react'
import { AuditorQueuePage } from '../components/auditor/AuditorQueuePage'
import { DashboardPage } from '../components/dashboard/DashboardPage'
import { AppShell } from '../components/layout/AppShell'
import { navItems, type NavItemId } from '../components/layout/navigation'
import { ScopeMapPage } from '../components/scope/ScopeMapPage'

function PlaceholderPage({ activeView }: { activeView: NavItemId }) {
  const item = navItems.find((navItem) => navItem.id === activeView) ?? navItems[0]

  return (
    <section className="placeholder-panel" aria-labelledby="placeholder-title">
      <p className="eyebrow">{item.phase}</p>
      <h2 id="placeholder-title">{item.label}</h2>
      <p>
        This area ships in a later phase. Scope Map, Dashboard, and Auditor Queue are live now.
      </p>
    </section>
  )
}

function renderView(activeView: NavItemId, onViewChange: (view: NavItemId) => void) {
  switch (activeView) {
    case 'dashboard':
      return <DashboardPage onViewChange={onViewChange} />
    case 'scope-map':
      return <ScopeMapPage />
    case 'auditor-queue':
      return <AuditorQueuePage />
    default:
      return <PlaceholderPage activeView={activeView} />
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<NavItemId>('dashboard')

  return (
    <AppShell activeView={activeView} onViewChange={setActiveView}>
      {renderView(activeView, setActiveView)}
    </AppShell>
  )
}
