# God's Eye — Cursor installation guide

Step-by-step setup so God's Eye works in Cursor on day one: **global user config** (every project) plus **per-project** doc chain and optional hooks.

---

## What gets installed

| Layer | Location | Purpose |
|-------|----------|---------|
| **User rule** | `~/.cursor/rules/gods-eye-context-intent.mdc` | `alwaysApply: true` — START HERE on every project |
| **User hooks** (optional) | `~/.cursor/hooks.json` + `~/.cursor/hooks/gods-eye/` | Soft three-touch reminders globally |
| **Project rule** | `.cursor/rules/gods-eye-context-intent.mdc` | Same law, project-relative paths |
| **Project hooks** (optional) | `.cursor/hooks.json` + `.cursor/hooks/` | Team-shareable Phase 2 hooks |
| **Doc chain** | `docs/14_*`, `docs/02_*`, `docs/04_*`, overlay, `AGENTS.md` | L3 app memory (`+#` only) |
| **Portable Bible** | `docs/37_GODS_EYE.md` (vendored) or `$GODS_EYE_ROOT` | Portable law |

Existing user rules (e.g. `brents-ai-constitution.mdc`) are **not** removed — God's Eye **adds** alongside them.

---

## One-command install

From a clone of this repo:

```bash
cd ~/Projects/gods-eye
chmod +x install.sh

# Global Cursor config (recommended once per machine)
./install.sh --user --no-project

# Install into any project (vendors Bible + bootstraps doc chain + hooks)
./install.sh /path/to/your-app
```

Remote one-liner (after pushing to GitHub):

```bash
git clone https://github.com/brennin0820/gods-eye.git /tmp/gods-eye && /tmp/gods-eye/install.sh --user --no-project && /tmp/gods-eye/install.sh ~/Projects/your-app
```

---

## Manual verification in Cursor

### 1. Rules

1. Open **Cursor Settings → Rules** (or **Cursor Settings → Agent → Rules**).
2. Confirm **`gods-eye-context-intent`** appears with **Always Apply** enabled.
3. User-level: `~/.cursor/rules/gods-eye-context-intent.mdc`
4. Project-level: `.cursor/rules/gods-eye-context-intent.mdc` (when installed)

### 2. Hooks

Hooks load from **both** user and project `hooks.json` (all matching hooks run).

| Source | File | Script paths (relative to…) |
|--------|------|-----------------------------|
| User | `~/.cursor/hooks.json` | `~/.cursor/` → `./hooks/gods-eye/*.sh` |
| Project | `.cursor/hooks.json` | project root → `.cursor/hooks/*.sh` |

**Check:**

1. **Cursor Settings → Hooks** — three God's Eye entries: `sessionStart`, `stop`, `afterFileEdit`.
2. **Output panel → Hooks** — no "file not found" errors.
3. Start a **new Agent chat** — Touch 1 `additional_context` reminder (sessionStart).
4. End a session — Touch 3 `followup_message` (stop, once per session).

**If hooks do not appear:** save `hooks.json`, restart Cursor, re-check script permissions:

```bash
chmod +x ~/.cursor/hooks/gods-eye/*.sh
chmod +x .cursor/hooks/*.sh   # per project
```

### 3. No settings.json toggle required

Cursor loads hooks from `hooks.json` automatically. You do **not** need a `settings.json` flag. Optional: enable **Hooks** output channel for debugging.

---

## Environment variables

| Variable | Set by | Purpose |
|----------|--------|---------|
| `CURSOR_PROJECT_DIR` | Cursor (always) | Active workspace root — hooks resolve project paths |
| `GODS_EYE_ROOT` | `sessionStart` hook `env` output | Portable Bible when project has not vendored `docs/37_GODS_EYE.md` |
| `GODS_EYE_ROOT` (default) | `lib.sh` | `~/Projects/gods-eye` if unset |

Projects that point at **master BAIC** instead of vendoring (e.g. BankrollCalendar) keep their overlay paths; hooks still use `CURSOR_PROJECT_DIR` for handoff/changelog paths.

---

## User vs project hooks

| Choose | When |
|--------|------|
| **User only** (`--user --no-project`) | Brent's machine — God's Eye on every repo without committing hooks |
| **Project only** | Team shares hooks via git |
| **Both** | Global reminders + project hooks for collaborators |

Disable hooks: rename `hooks.json` → `hooks.json.disabled` (user or project). See [`docs/HOOKS_SETUP.md`](docs/HOOKS_SETUP.md).

---

## Test session (2 minutes)

1. Open a project with God's Eye installed (or `gods-eye` itself).
2. New Agent chat → ask: *"What is God's Eye Touch 1?"*
3. Agent should reference Bible §0, overlay, handoff — hook may inject the same reminder.
4. Edit `docs/14_SESSION_HANDOFF.md` → `afterFileEdit` nudges `+#` only.
5. End turn → `stop` hook may remind Touch 3 handoff append.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Rule not visible | Confirm file in `~/.cursor/rules/` or `.cursor/rules/`; reload window |
| Hook "no such file" | User hooks: `./hooks/gods-eye/...` under `~/.cursor/`; project: `.cursor/hooks/...` from repo root |
| Wrong Bible path | Vendor `docs/37_GODS_EYE.md` or set `GODS_EYE_ROOT` in shell profile |
| Too chatty | Remove `afterFileEdit` from `hooks.json` or disable hooks |
| Conflicts with BAIC | Both can `alwaysApply`; God's Eye is portable oversight; BAIC is Brent's full constitution |

---

## Related

- [`README.md`](README.md) — framework overview
- [`docs/HOOKS_SETUP.md`](docs/HOOKS_SETUP.md) — Phase 2 hook behavior
- [`docs/GODS_EYE_UNIFIED_STACK.md`](docs/GODS_EYE_UNIFIED_STACK.md) — L0–L4 stack

*God's Eye always watches — install once, compound everywhere.*
