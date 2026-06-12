import {
  AlertTriangle,
  BarChart3,
  BookOpen,
  Code2,
  Columns3,
  Compass,
  Eye,
  Flag,
  GitBranch,
  Hammer,
  Home,
  Map,
  MessageSquare,
  Route,
  Search,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type NavItemId =
  | 'dashboard'
  | 'scope-map'
  | 'roadmap'
  | 'priority-board'
  | 'coder-tasks'
  | 'next-prompt'
  | 'ge-queue'
  | 'nr-queue'
  | 'auditor-queue'
  | 'research-queue'
  | 'decisions'
  | 'blockers'
  | 'progress'
  | 'done-criteria'
  | 'not-now'
  | 'memory-feed'
  | 'back-and-forth'
  | 'reports'
  | 'settings'

type NavItem = {
  id: NavItemId
  label: string
  phase: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', phase: 'Phase 1', icon: Home },
  { id: 'scope-map', label: 'Scope Map', phase: 'Phase 1', icon: Map },
  { id: 'auditor-queue', label: 'Auditor Queue', phase: 'Phase 1', icon: ShieldCheck },
  { id: 'roadmap', label: 'Roadmap', phase: 'Phase 2', icon: Route },
  { id: 'priority-board', label: 'Priority Board', phase: 'Phase 2', icon: Columns3 },
  { id: 'coder-tasks', label: 'Coder Tasks', phase: 'Phase 2', icon: Code2 },
  { id: 'next-prompt', label: 'Next Prompt', phase: 'Phase 2', icon: MessageSquare },
  { id: 'ge-queue', label: "God's Eye Queue", phase: 'Phase 2', icon: Eye },
  { id: 'nr-queue', label: 'NR Queue', phase: 'Phase 2', icon: Hammer },
  { id: 'research-queue', label: 'Research Queue', phase: 'Phase 2', icon: Search },
  { id: 'decisions', label: 'Decisions', phase: 'Phase 2', icon: GitBranch },
  { id: 'blockers', label: 'Blockers', phase: 'Phase 2', icon: AlertTriangle },
  { id: 'not-now', label: 'Not Now', phase: 'Phase 2', icon: Compass },
  { id: 'progress', label: 'Progress', phase: 'Phase 2', icon: BarChart3 },
  { id: 'memory-feed', label: 'Memory Feed', phase: 'Phase 2', icon: BookOpen },
  { id: 'back-and-forth', label: 'Loop Detector', phase: 'Phase 2', icon: AlertTriangle },
  { id: 'settings', label: 'Settings', phase: 'Phase 2', icon: Settings },
  { id: 'done-criteria', label: 'Done Criteria', phase: 'Later', icon: Flag },
  { id: 'reports', label: 'Reports', phase: 'Later', icon: BarChart3 },
]
