import { useState } from 'react'
import { AuditorQueuePage } from '../components/auditor/AuditorQueuePage'
import { DashboardPage } from '../components/dashboard/DashboardPage'
import { BlockersPage } from '../components/lists/BlockersPage'
import { DecisionsPage } from '../components/lists/DecisionsPage'
import { NotNowPage } from '../components/lists/NotNowPage'
import { AppShell } from '../components/layout/AppShell'
import { navItems, type NavItemId } from '../components/layout/navigation'
import { LoopDetectorPage } from '../components/loops/LoopDetectorPage'
import { MemoryFeedPage } from '../components/memory/MemoryFeedPage'
import { NextPromptPage } from '../components/prompts/NextPromptPage'
import { PriorityBoardPage } from '../components/priority/PriorityBoardPage'
import { ProgressPage } from '../components/progress/ProgressPage'
import { TaskQueuePage } from '../components/queues/TaskQueuePage'
import { RoadmapPage } from '../components/roadmap/RoadmapPage'
import { ScopeMapPage } from '../components/scope/ScopeMapPage'
import { SettingsPage } from '../components/settings/SettingsPage'

function PlaceholderPage({ activeView }: { activeView: NavItemId }) {
  const item = navItems.find((navItem) => navItem.id === activeView) ?? navItems[0]

  return (
    <section className="placeholder-panel" aria-labelledby="placeholder-title">
      <p className="eyebrow">{item.phase}</p>
      <h2 id="placeholder-title">{item.label}</h2>
      <p>This area ships in a later phase.</p>
    </section>
  )
}

function renderView(activeView: NavItemId, onViewChange: (view: NavItemId) => void) {
  switch (activeView) {
    case 'dashboard':
      return <DashboardPage onViewChange={onViewChange} />
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
    case 'auditor-queue':
      return <AuditorQueuePage />
    case 'decisions':
      return <DecisionsPage />
    case 'blockers':
      return <BlockersPage />
    case 'progress':
      return <ProgressPage />
    case 'not-now':
      return <NotNowPage />
    case 'memory-feed':
      return <MemoryFeedPage />
    case 'back-and-forth':
      return <LoopDetectorPage />
    case 'settings':
      return <SettingsPage />
    case 'done-criteria':
    case 'reports':
      return <PlaceholderPage activeView={activeView} />
    default: {
      const unhandled: never = activeView
      throw new Error(`Unhandled view: ${unhandled}`)
    }
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
