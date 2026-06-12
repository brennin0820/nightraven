import { useState } from 'react'
import { DashboardPage } from '../components/dashboard/DashboardPage'
import { AppShell } from '../components/layout/AppShell'
import { navItems, type NavItemId } from '../components/layout/navigation'

function PlaceholderPage({ activeView }: { activeView: NavItemId }) {
  const item = navItems.find((navItem) => navItem.id === activeView) ?? navItems[0]

  return (
    <section className="placeholder-panel" aria-labelledby="placeholder-title">
      <p className="eyebrow">{item.phase}</p>
      <h2 id="placeholder-title">{item.label}</h2>
      <p>This area ships in a later phase. Phase 1 is the dashboard only.</p>
    </section>
  )
}

function renderView(activeView: NavItemId) {
  if (activeView === 'dashboard') {
    return <DashboardPage />
  }

  return <PlaceholderPage activeView={activeView} />
}

export default function App() {
  const [activeView, setActiveView] = useState<NavItemId>('dashboard')

  return (
    <AppShell activeView={activeView} onViewChange={setActiveView}>
      {renderView(activeView)}
    </AppShell>
  )
}
