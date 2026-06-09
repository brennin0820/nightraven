# Session handoff — God's Eye framework repo

**Scope:** App memory for **this repository only** (`gods-eye`). Portable law stays in [`37_GODS_EYE.md`](37_GODS_EYE.md).

---

## Current state / focus

Cursor installer shipped: `install.sh`, `CURSOR_INSTALL.md`, workspace-aware hooks (`GODS_EYE_ROOT` / `workspace_roots`), user-level `~/.cursor` install path. BankrollCalendar demo install complete.

---

## Already done

- +# Initial public framework release (`f9928d2`) — Bible, router, session tree, improvement loop, example rule/overlay
- +# Unified stack doc L0–L4 (`1c4f1ef`) — Memory Bank mapping, handoff pattern, hooks roadmap
- +# Phase 2 optional hooks (`1c4f1ef`, `4be2992`) — `.cursor/hooks.json`, bash scripts, `docs/HOOKS_SETUP.md`, README wiring

---

## Recent sessions

- **2026-06-09** — Full Cursor install: `install.sh` (user + project), `CURSOR_INSTALL.md`, lean START HERE rule, hooks resolve `workspace_roots`; installed `~/.cursor` + BankrollCalendar demo.
- **2026-06-09** — Phase 2 hooks scaffold: `sessionStart` / `stop` / `afterFileEdit` soft reminders; `lib.sh` (no jq); fixed bash 3.2 heredoc quoting in stop/after-file-edit; pushed `4be2992` on `main`.
- **2026-06-09** — Touch 3 bootstrap: created this handoff + engineering changelog + learning log for framework repo L3 memory.

---

## Guardrails / locks

- **`+#` only** on memory docs — never `-#` or collapse **Recent sessions** / **Already done**
- **This repo only** — no cross-repo handoff bleed
- **Phase 2 hooks** are soft nudges — CORE law remains Bible + always-on rule; see [`HOOKS_SETUP.md`](HOOKS_SETUP.md)
