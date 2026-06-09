# Engineering changelog — God's Eye framework repo

Append-only (`+#`). Corrections use **Supersedes** lines — never delete history.

---

## 2026-06-09

### Cursor installer — `install.sh` + global `~/.cursor` path

- Added `install.sh` — project bootstrap (rule, vendored Bible, L3 docs, hooks) and `--user` global install
- Added `CURSOR_INSTALL.md` — verification steps (Settings → Rules, Hooks, test session)
- Hooks: `lib.sh` resolves `workspace_roots` + sets `GODS_EYE_PROJECT_ROOT` / `GODS_EYE_ROOT` at `sessionStart`
- Templates under `templates/` for handoff, changelog, learning log, overlay, `AGENTS.md`, user rule, `hooks.user.json`
- Lean `gods-eye-context-intent.mdc` START HERE table (Bible fallback via `GODS_EYE_ROOT`)

**Cross-links:** [`CURSOR_INSTALL.md`](CURSOR_INSTALL.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`README.md`](../README.md)

**Shipped:** `a14ac10` on `main` — Brent user install at `~/.cursor/rules/` + `~/.cursor/hooks/gods-eye/`; BankrollCalendar project install verified.

### Phase 2 — optional Cursor hooks (commits `1c4f1ef`, `4be2992`)

- Added `.cursor/hooks.json` with `sessionStart`, `stop` (`loop_limit: 1`), and `afterFileEdit` hooks
- Added bash scripts under `.cursor/hooks/`: `session-start.sh`, `session-stop.sh`, `after-file-edit.sh`, `lib.sh` (JSON escape without `jq`)
- Added `docs/HOOKS_SETUP.md` — enable/disable, per-hook behavior, soft vs CORE enforcement
- Wired README: artifact table, quick-start step 6, repository layout
- **Fix:** bash 3.2 (macOS) misparses `God's` inside `"$(cat <<EOF …)"` heredocs — use `message+=` concatenation or unquoted heredoc with variable substitution outside the apostrophe token

**Cross-links:** [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §8 · [`GODS_EYE_SESSION_TREE.md`](GODS_EYE_SESSION_TREE.md) §3
