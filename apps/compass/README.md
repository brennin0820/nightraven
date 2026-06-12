# NightRaven Compass

> **Monorepo path:** `apps/compass/` in the [NightRaven platform repo](https://github.com/brennin0820/gods-eye).

NightRaven Compass is a project-guidance app for a non-coder builder using God's Eye and NightRaven to build software with AI agents.

## Purpose

The app shows project scope, current phase, priorities, blockers, decisions, audits, Not Now items, progress, and the next best prompt.

**Phase 1** uses mock data only — no backend, cloud sync, or repo auto-editing.

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

## Phase 1 (current)

| Feature | Status |
|---------|--------|
| App shell + sidebar | Live |
| Dashboard + all cards | Live (mock data) |
| Scope Map, Roadmap, queues, lists, progress, memory | Placeholder nav only |

## Out of scope (Phase 1)

- Cloud sync
- Real AI automation
- Repo auto-editing
- Plugin / MCP managers
- Database / persistent storage

## Docs

- [`docs/PROJECT_SCOPE.md`](docs/PROJECT_SCOPE.md)
- [`docs/MVP_ROADMAP.md`](docs/MVP_ROADMAP.md)
- [`docs/DATA_MODEL.md`](docs/DATA_MODEL.md)
- [`docs/ACCEPTANCE_CRITERIA.md`](docs/ACCEPTANCE_CRITERIA.md)
- [`docs/BUILD_REPORT_PHASE1.md`](docs/BUILD_REPORT_PHASE1.md)
