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
      <p>
        This area is intentionally parked while Phase 1 proves the dashboard,
        mock data, and next-action workflow.
      </p>
    </section>
  )
}

export default function App() {
  const [activeView, setActiveView] = useState<NavItemId>('dashboard')

  return (
    <AppShell activeView={activeView} onViewChange={setActiveView}>
      {activeView === 'dashboard' ? (
        <DashboardPage />
      ) : (
        <PlaceholderPage activeView={activeView} />
      )}
    </AppShell>
  )
}
