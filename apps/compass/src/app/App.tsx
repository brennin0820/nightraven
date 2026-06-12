import { useState } from 'react'
import { DashboardPage } from '../components/dashboard/DashboardPage'
import { BlockersPage } from '../components/lists/BlockersPage'
import { DecisionsPage } from '../components/lists/DecisionsPage'
import { DoneCriteriaPage } from '../components/lists/DoneCriteriaPage'
import { NotNowPage } from '../components/lists/NotNowPage'
import { LoopDetectorPage } from '../components/loops/LoopDetectorPage'
import { AppShell } from '../components/layout/AppShell'
import { navItems, type NavItemId } from '../components/layout/navigation'
import { MemoryFeedPage } from '../components/memory/MemoryFeedPage'
import { PriorityBoardPage } from '../components/priority/PriorityBoardPage'
import { NextPromptPage } from '../components/prompts/NextPromptPage'
import { TaskQueuePage } from '../components/queues/TaskQueuePage'
import { ReportsPage } from '../components/reports/ReportsPage'
import { RoadmapPage } from '../components/roadmap/RoadmapPage'
import { ScopeMapPage } from '../components/scope/ScopeMapPage'
import { SettingsPage } from '../components/settings/SettingsPage'
import { isRegisteredRoute, renderRoute } from './routeRegistry'

function renderView(activeView: NavItemId) {
  if (isRegisteredRoute(activeView)) {
    return renderRoute(activeView)
  }

  switch (activeView) {
    case 'dashboard':
      return <DashboardPage />
    case 'scope-map':
      return <ScopeMapPage />
    case 'roadmap':
      return <RoadmapPage />
    case 'priority-board':
      return <PriorityBoardPage />
    case 'coder-tasks':
    case 'ge-queue':
    case 'nr-queue':
    case 'research-queue':
      return <TaskQueuePage queueId={activeView} />
    case 'next-prompt':
      return <NextPromptPage />
    case 'decisions':
      return <DecisionsPage />
    case 'blockers':
      return <BlockersPage />
    case 'done-criteria':
      return <DoneCriteriaPage />
    case 'not-now':
      return <NotNowPage />
    case 'memory-feed':
      return <MemoryFeedPage />
    case 'back-and-forth':
      return <LoopDetectorPage />
    case 'reports':
      return <ReportsPage />
    case 'settings':
      return <SettingsPage />
    default: {
      const item = navItems.find((navItem) => navItem.id === activeView) ?? navItems[0]
      return (
        <section className="placeholder-panel" aria-labelledby="placeholder-title">
          <p className="eyebrow">{item.phase}</p>
          <h2 id="placeholder-title">{item.label}</h2>
          <p>Page not configured.</p>
        </section>
      )
    }
  }
}

export default function App() {
  const [activeView, setActiveView] = useState<NavItemId>('dashboard')

  return (
    <AppShell activeView={activeView} onViewChange={setActiveView}>
      {renderView(activeView)}
    </AppShell>
  )
}
