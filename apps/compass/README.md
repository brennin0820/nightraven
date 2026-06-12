# NightRaven Compass

> **Monorepo path:** `apps/compass/` in the [NightRaven platform repo](https://github.com/brennin0820/gods-eye) (GitHub rename pending).

NightRaven Compass is a project-guidance app for a non-coder builder using God's Eye and NightRaven to build software with AI agents.

## Purpose

The app shows project scope, current phase, priorities, blockers, decisions, audits, Not Now items, progress, and the next best prompt — **read from real project files on disk**.

## Core Identity

God's Eye thinks.
NightRaven builds.
Auditor verifies.
NightRaven Compass points the user to the next correct step.

## Data source

Compass uses a **Vite dev-server API** (no separate backend). On `npm run dev`, middleware reads:

- `scripts/gods-eye-projects.conf` — project registry (absolute paths)
- Per-project `docs/14_SESSION_HANDOFF.md` — focus, **Next:** tasks, recent sessions
- `docs/GODS_EYE_REPO_OVERLAY.md` — Not Now guardrails (when present)

The monorepo root (`gods-eye-1`) is auto-added to the registry even if not listed in the conf file.

### Project registry

Edit `scripts/gods-eye-projects.conf` at the monorepo root (one line per project):

```
E:/NightRaven/MyApp|My App|app
```

Format: `absolute-path|label|role`

After adding a line, restart dev server or use **Refresh** in Compass Settings. Paths must exist on disk (`available: true`).

### New / future projects

1. Bootstrap God's Eye in the new repo (handoff + overlay).
2. Add a line to `gods-eye-projects.conf`.
3. Run Compass with `npm run dev` — select the project from the header dropdown.

## Run (required for API)

```bash
cd apps/compass
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). **`npm run preview`** also serves the API via the same plugin.

`npm run build` produces static assets only — live project data requires the dev/preview server.

## Verify

```bash
npm run build
npm run lint
```

## Live pages

| Area | Status |
|------|--------|
| Dashboard, Scope Map, Auditor Queue | Phase 1 |
| Roadmap, Priority Board, Queues, Prompts, Lists, Progress, Memory, Loop Detector, Settings | Phase 2 |
| Done Criteria, Reports | Later |

## Out of scope

- Cloud sync
- Real AI automation
- Repo auto-editing
- Plugin / MCP managers
