# NightRaven Compass

> **Monorepo path:** `apps/compass/` in the [NightRaven platform repo](https://github.com/brennin0820/gods-eye) (GitHub rename pending). Sibling folder `E:\NightRaven\nightraven-compass` is superseded after subtree merge.

NightRaven Compass is a project-guidance app for a non-coder builder using God's Eye and NightRaven to build software with AI agents.

## Purpose

The app shows project scope, current phase, priorities, blockers, decisions, audits, Not Now items, progress, and the next best prompt.

## Core Identity

God's Eye thinks.
NightRaven builds.
Auditor verifies.
NightRaven Compass points the user to the next correct step.

## MVP

The MVP uses React, TypeScript, Vite, and mock data.

Phase 1 includes:

- App shell
- Sidebar
- Dashboard
- Project status card
- Current phase card
- Next best action card
- Progress summary card
- Blocker card
- Decision card
- Not Now card
- Recommended prompt card

## Out Of Scope For MVP

- Cloud sync
- Real AI automation
- Repo auto-editing
- Plugin manager
- MCP manager
- Mobile app

## Run

```bash
npm install
npm run dev
```

## Verify

```bash
npm run build
npm run lint
```
