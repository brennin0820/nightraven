# NightRaven — Cursor installation guide

Step-by-step setup so NightRaven works in Cursor on day one: **global user config** (every project) plus **per-project** doc chain and optional hooks.

---

## What gets installed

| Layer | Location | Purpose |
|-------|----------|---------|
| **User rule** | `~/.cursor/rules/nightraven-context-intent.mdc` | `alwaysApply: true` — START HERE on every project |
| **User hooks** (optional) | `~/.cursor/hooks.json` + `~/.cursor/hooks/nightraven/` | Soft three-touch reminders globally |
| **Project rule** | `.cursor/rules/nightraven-context-intent.mdc` | Same law, project-relative paths |
| **Project hooks** (optional) | `.cursor/hooks.json` + `.cursor/hooks/` | Team-shareable Phase 2 hooks |
| **Project MCP** (optional) | `.cursor/mcp.json` + `.cursor/mcp/run-memory-chain-mcp.sh` | Memory-chain tools — see [`MCP_SETUP.md`](MCP_SETUP.md) |
| **Doc chain** | `docs/14_*`, `docs/02_*`, `docs/04_*`, overlay, `AGENTS.md` | L3 app memory (`+#` only) |
| **Portable Bible** | `docs/37_NIGHTRAVEN.md` (vendored) or `$NIGHTRAVEN_ROOT` | Portable law including §2.9 (Always Sync, Governed Bypass, Local vs Cloud) |

Existing user rules (e.g. `brents-ai-constitution.mdc`) are **not** removed — NightRaven **adds** alongside them.

**Local vs cloud execution:** `docs/NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md` is a **framework-repo document**. Consumer repos do **not** receive it via `install.sh` — they receive the laws it encodes via the vendored Bible **§2.9** and the always-on rule. Consumers needing a local copy of the execution spec should add a manual vendor step or link to the framework repo.

**Optional — Multitask / heavy threads:** Copy [`templates/model-delegation-efficiency.user.mdc`](templates/model-delegation-efficiency.user.mdc) to `~/.cursor/rules/model-delegation-efficiency.mdc` (pairs with Bible §2.8).

---

## One-command install

From a clone of this repo:

```bash
cd ~/Projects/nightraven
chmod +x install.sh

# Global Cursor config (recommended once per machine)
./install.sh --user --no-project

# Install into any project (vendors Bible + bootstraps doc chain + hooks)
./install.sh /path/to/your-app
```

Remote one-liner (after pushing to GitHub):

```bash
git clone https://github.com/brennin0820/nightraven.git /tmp/nightraven && /tmp/nightraven/install.sh --user --no-project && /tmp/nightraven/install.sh ~/Projects/your-app
```

---

## Manual verification in Cursor

### 1. Rules

1. Open **Cursor Settings → Rules** (or **Cursor Settings → Agent → Rules**).
2. Confirm **`nightraven-context-intent`** appears with **Always Apply** enabled.
3. User-level: `~/.cursor/rules/nightraven-context-intent.mdc`
4. Project-level: `.cursor/rules/nightraven-context-intent.mdc` (when installed)

### 2. Hooks

Hooks load from **both** user and project `hooks.json` (all matching hooks run).

| Source | File | Script paths (relative to…) |
|--------|------|-----------------------------|
| User | `~/.cursor/hooks.json` | `~/.cursor/` → `./hooks/nightraven/*.sh` |
| Project | `.cursor/hooks.json` | project root → `.cursor/hooks/*.sh` |

**Check:**

1. **Cursor Settings → Hooks** — three NightRaven entries: `sessionStart`, `stop`, `afterFileEdit`.
2. **Output panel → Hooks** — no "file not found" errors.
3. Start a **new Agent chat** — Touch 1 `additional_context` reminder (sessionStart).
4. End a session — Touch 3 `followup_message` (stop, once per session).

**If hooks do not appear:** save `hooks.json`, restart Cursor, re-check script permissions:

```bash
chmod +x ~/.cursor/hooks/nightraven/*.sh
chmod +x .cursor/hooks/*.sh   # per project
```

### 3. MCP (optional Phase 2)

1. Build once from your NightRaven clone: `cd mcp-server && npm install && npm run build`
2. Open **Cursor Settings → MCP** — confirm **`nightraven`** is listed and connected.
3. In Agent chat, invoke `nightraven_read_memory` with `slot: handoff` or `nightraven_list_memory_slots`.

Full tool list and env vars: [`docs/MCP_SETUP.md`](MCP_SETUP.md). Skip with `./install.sh --no-mcp`.

### 4. No settings.json toggle required

Cursor loads hooks from `hooks.json` automatically. You do **not** need a `settings.json` flag. Optional: enable **Hooks** output channel for debugging.

---

## Environment variables

| Variable | Set by | Purpose |
|----------|--------|---------|
| `CURSOR_PROJECT_DIR` | Cursor (always) | Active workspace root — hooks resolve project paths |
| `NIGHTRAVEN_ROOT` | `sessionStart` hook `env` output | Portable Bible when project has not vendored `docs/37_NIGHTRAVEN.md` |
| `NIGHTRAVEN_ROOT` (default) | `lib.sh` | `~/Projects/nightraven` if unset |

Projects that point at **master BAIC** instead of vendoring (e.g. BankrollCalendar) keep their overlay paths; hooks still use `CURSOR_PROJECT_DIR` for handoff/changelog paths.

---

## User vs project hooks

| Choose | When |
|--------|------|
| **User only** (`--user --no-project`) | Brent's machine — NightRaven on every repo without committing hooks |
| **Project only** | Team shares hooks via git |
| **Both** | Global reminders + project hooks for collaborators |

Disable hooks: rename `hooks.json` → `hooks.json.disabled` (user or project). See [`docs/HOOKS_SETUP.md`](docs/HOOKS_SETUP.md).

---

## Test session (2 minutes)

1. Open a project with NightRaven installed (or `nightraven` itself).
2. New Agent chat → ask: *"What is NightRaven Touch 1?"*
3. Agent should reference Bible §0, overlay, handoff — hook may inject the same reminder.
4. Edit `docs/14_SESSION_HANDOFF.md` → `afterFileEdit` nudges `+#` only.
5. End turn → `stop` hook may remind Touch 3 handoff append.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Rule not visible | Confirm file in `~/.cursor/rules/` or `.cursor/rules/`; reload window |
| Hook "no such file" | User hooks: `./hooks/nightraven/...` under `~/.cursor/`; project: `.cursor/hooks/...` from repo root |
| Wrong Bible path | Vendor `docs/37_NIGHTRAVEN.md` or set `NIGHTRAVEN_ROOT` in shell profile |
| Too chatty | Remove `afterFileEdit` from `hooks.json` or disable hooks |
| Conflicts with BAIC | Both can `alwaysApply`; NightRaven is portable oversight; BAIC is Brent's full constitution |

---

## Optional — implementation skills pack (post ship-signal)

**Not part of NightRaven install.** The framework repo does **not** vendor [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills). Use only in **consumer app repos** when Brent explicitly says **code it** / **implement** / **build** — after NightRaven memory chain is in place.

| Rule | Detail |
|------|--------|
| **Layer** | Optional L4 — implementation lifecycle discipline; does not replace Bible, handoff, or intent ladder |
| **Upstream setup** | [agent-skills cursor-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/cursor-setup.md) — marketplace plugin or copy selected `skills/` |
| **Framework install** | `install.sh` has **no** `--with-engineering-skills` flag yet (deferred until 2+ adopters prove need) |
| **Stack sentence** | NightRaven decides *what the project means and remembers*; agent-skills decides *how to build safely once you say ship* |

See [`NIGHTRAVEN_UNIFIED_STACK.md`](docs/NIGHTRAVEN_UNIFIED_STACK.md) §2 · [`NIGHTRAVEN_REPO_OVERLAY.md`](docs/NIGHTRAVEN_REPO_OVERLAY.md) §1 **Implementation skills pack (optional)** · plan `.cursor/plans/agent-skills_merge_decision_7be1bdd7.plan.md`.

---

## NightRaven + NightRaven Core (combined)

**Recommendation:** Install **both layers** on app projects — NightRaven for memory (handoff, hooks, Bible); **NightRaven Core** for adaptive orchestration (Builder/Auditor, ledgers). Do not merge repos; stack them.

```bash
cd ~/Projects/nightraven   # or path to this clone
chmod +x install.sh scripts/install-nightraven-framework.sh scripts/bootstrap-nightraven-project.sh

# New greenfield project (overlay + handoff + quickstart seeded)
./scripts/bootstrap-nightraven-project.sh HimFLer
# default path: ../HimFLer next to framework; or pass explicit path as 2nd arg

# Existing app repo
./scripts/install-nightraven-framework.sh --user ~/Developer/NightRaven
```

Adds `.claude/skills/nightraven/`, `docs/ledgers/`, and overlay/AGENTS cross-links. Generic projects can use `./install.sh` only.

---

## Claude Code adoption

For **Claude Code** (not Cursor), see **[`docs/CLAUDE_ADOPTION.md`](docs/CLAUDE_ADOPTION.md)** — same vendor list (Bible, overlay, handoff, AGENTS), optional MCP, noreply git author (`172115324+brennin0820@users.noreply.github.com`), and hooks parity notes. Run `./install.sh` then wire `CLAUDE.md` entry points. For NightRaven Core, run `./scripts/install-nightraven-framework.sh` instead of `./install.sh` alone.

---

## Related

- [`README.md`](README.md) — framework overview
- [`docs/HOOKS_SETUP.md`](docs/HOOKS_SETUP.md) — Phase 2 hook behavior
- [`docs/NIGHTRAVEN_UNIFIED_STACK.md`](docs/NIGHTRAVEN_UNIFIED_STACK.md) — L0–L4 stack

*NightRaven always watches — install once, compound everywhere.*
