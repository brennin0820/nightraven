# NightRaven Compass

> **Monorepo path:** `apps/compass/` in the [NightRaven platform repo](https://github.com/brennin0820/gods-eye).

NightRaven Compass is a project-guidance app for a non-coder builder using God's Eye and NightRaven to build software with AI agents.

## Purpose

The app shows project scope, current phase, priorities, blockers, decisions, audits, Not Now items, progress, and the next best prompt.

**MVP (Phases 1–8)** uses mock data by default — no cloud sync, real AI automation, or repo auto-editing. Optional local/registry mode can load handoff-derived snapshots when the dev server API is available.

## Core Identity

God's Eye thinks.
NightRaven builds.
Auditor verifies.
NightRaven Compass points the user to the next correct step.

## Run

```bash
cd apps/compass
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Verify

```bash
npm run build
npm run lint
```

## Phase deliverables

| Phase | Feature | Status |
|-------|---------|--------|
| **1** | App shell, sidebar, dashboard cards | Live |
| **2** | Roadmap (phases + current highlight), Priority Board (lanes + TaskCard + TaskDetailPanel), Scope Map, task queues | Live |
| **3** | Next Prompt — GE, NR Builder, Auditor, Research via `promptGenerator.ts` | Live |
| **4** | Decisions (open/decided/superseded + scope lock), Blockers (severity + blocked tasks), Not Now | Live |
| **5** | Auditor Queue — findings, required fixes, `canMoveForward`, mark pass/fix | Live |
| **6** | Progress Tracker — six honest dimensions, Done Criteria, Reports | Live |
| **7** | Memory Feed — tasks, decisions, audits, blockers, sessions | Live |
| **8** | Loop Detector — reopened decisions, future-phase work, planning loops, shipping stall | Live |

Additional sidebar pages: Coder Tasks, GE/NR/Research queues, Settings (registry + refresh).

## Project registry (God's Eye workspaces)

Compass reads live handoff and overlay from registered repos via the Vite dev API (`/api/registry`, `/api/project`).

| Setting | Location |
|---------|----------|
| Registry file | `scripts/gods-eye-projects.conf` at monorepo root |
| Default project | **HimFLer** (`E:/NightRaven/HimFLer`) when no prior selection is stored |
| Switch project | **Settings** → Registry list → **Select** on the row you want |

Format: `ABS_PATH|label|role` — one line per workspace (`framework`, `master`, `app`, `user-global`).

Registered consumer app **HimFLer** (iOS 26 · GitHub `brennin0820/HimFler`) ships its own `docs/14_SESSION_HANDOFF.md` and `docs/GODS_EYE_REPO_OVERLAY.md`; Compass does not bleed framework handoff into that repo.

## Out of scope (MVP)

- Cloud sync
- Real AI automation
- Repo auto-editing
- Plugin / MCP managers
- Multi-user database

## Docs

- [`docs/PROJECT_SCOPE.md`](docs/PROJECT_SCOPE.md)
- [`docs/MVP_ROADMAP.md`](docs/MVP_ROADMAP.md)
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)
- [`docs/ACCEPTANCE_CRITERIA.md`](docs/ACCEPTANCE_CRITERIA.md)
- [`docs/BUILD_REPORT_PHASE1.md`](docs/BUILD_REPORT_PHASE1.md)
- [`docs/BUILD_REPORT_PHASES_2-8.md`](docs/BUILD_REPORT_PHASES_2-8.md)
