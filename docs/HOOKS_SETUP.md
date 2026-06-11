# God's Eye — Optional Phase 2 Hooks

**Phase 2** adds **soft** Cursor hooks that reinforce the portable God's Eye workflow: **three-touch** (Before → During → After), **Record Everything** at Tier 2+, and **`+#` only** memory writes.

Hooks are **not** CORE hard blocks. They inject reminders, optional follow-up messages, and **Always Sync autosync** (real `git pull` / safe-path commit / `git push` on session boundaries). Agents can still proceed if git fails — hooks **fail open**. No external dependencies (`jq`, `node`, etc.); Windows uses PowerShell (`.ps1`); Unix/macOS can use bash via `run-hook.sh`.

---

## Enable or disable

| State | What to do |
|-------|------------|
| **Enabled (default in this repo)** | Keep `.cursor/hooks.json` — Cursor loads it automatically |
| **Disabled** | Rename to `.cursor/hooks.json.disabled` or delete `.cursor/hooks.json` |
| **Touch 3 only (paused)** | Create `.cursor/touch3.disabled` (project) and/or `~/.cursor/touch3.disabled` (global) — `session-stop.sh` no-ops; **keep** the `stop` hook in `hooks.json`. Re-enable: delete marker files only |
| **Adopting in your app repo** | Run `./install.sh /path/to/app` or copy `.cursor/hooks.json` + `.cursor/hooks/` when handoff exists |
| **Global (all projects)** | `./install.sh --user --no-project` → `~/.cursor/hooks.json` + `~/.cursor/hooks/gods-eye/` — see [`CURSOR_INSTALL.md`](CURSOR_INSTALL.md) |

After changing `hooks.json`, save the file. If hooks do not appear, restart Cursor and check **Settings → Hooks** or the **Hooks** output channel.

---

## What each hook does

### `sessionStart` → `.cursor/hooks/session-start.ps1` (Windows) · `session-start.sh` (Unix)

**Touch 1 · Before** — injects `additional_context` at session start:

- **Always Sync autosync:** runs `git pull --ff-only` in the project root (fail-open — offline/conflict/auth errors are reported in context, not blocking)
- Parallel-read chain: rule → Bible §0 → overlay → router → handoff → `AGENTS.md`
- Tier + intent ladder reminder (memory + wire default)
- This-repo-only dedup; no cross-repo handoff bleed

Does **not** block edits or tool use.

### `stop` → `.cursor/hooks/session-stop.ps1` (Windows) · `session-stop.sh` (Unix)

**Touch 3 · After** — returns a one-time `followup_message` when the agent completes (`loop_count` 0, `loop_limit: 1`):

- **Always Sync autosync (runs even when Touch 3 is paused):**
  1. `git pull --ff-only`
  2. If dirty tree: stage **safe paths only** — `docs/`, `.cursor/`, `templates/`, `examples/`, `scripts/`, `mcp-server/`, `AGENTS.md`, `README.md`, etc.; **never** `.env`, credentials, keys, or other secret patterns
  3. Commit with an **auto-generated conventional message** from staged safe paths (e.g. `docs: Touch 3 AFTER handoff and changelog`, `fix(hooks): autosync on session stop`, `chore: session sync — hooks, memory docs`); optional body lists key files (hooks not skipped)
  4. `git push origin HEAD` when ahead of upstream (never force push)
  5. On push failure: append **push defer** line to **Recent sessions** in `docs/14_SESSION_HANDOFF.md` (+# only)
- Append **Recent sessions** reminder in follow-up when Touch 3 active
- Record Everything checklist at Tier 2+ (changelog, learning log, wire)

Does **not** force agent memory writes beyond autosync commit; Touch 3 follow-up is a reminder.

**Paused:** When `.cursor/touch3.disabled` or `~/.cursor/touch3.disabled` exists, Touch 3 follow-up batch is skipped — **autosync still runs**. Marker also adjusts `sessionStart` / `afterFileEdit` Touch 3 nudges. `.cursor/touch3.disabled` is gitignored locally.

### `afterFileEdit` → `.cursor/hooks/after-file-edit.ps1` (Windows) · `after-file-edit.sh` (Unix)

**During / After nudge** — when edits touch memory-chain paths (`docs/*`, `AGENTS.md`, `.cursor/rules/*`, `examples/overlay/*`):

- Reminds `+#` only and Supersedes for corrections
- Suggests Touch 3 writes when work was meaningful

Does **not** rewrite files or deny saves.

---

## Soft enforcement vs CORE law

| | CORE (Bible §2, rules) | Phase 2 hooks |
|---|------------------------|---------------|
| **Binding** | Agent must follow portable law | Optional nudges + autosync git |
| **Failure mode** | Wrong memory edits violate `+#` law | Hook/git crash fails open (no `failClosed`) |
| **Blocks** | Product/QA boundaries, scope | None — no `permission: deny` |

Use hooks to **reinforce habit**, not replace `.cursor/rules/gods-eye-context-intent.mdc` or `docs/37_GODS_EYE.md`.

---

## Bootstrap checklist

1. Vendor or copy God's Eye docs and rules (Phase 1).
2. Create `docs/14_SESSION_HANDOFF.md` with **Recent sessions** and **Already done** sections.
3. Enable Phase 2 hooks when handoff exists.
4. Session start: rule → §0 → overlay → handoff (hook adds the same reminder automatically).
5. **Always Sync** — hooks run real git on session boundaries (`session-start`: pull; `session-stop`: pull → safe commit → push). See **Always Sync autosync** sections above. Requires git credentials/network; failures are fail-open.

---

## Always Sync autosync (Cursor hooks)

| Hook | Git actions | Safe commit scope |
|------|-------------|-------------------|
| `sessionStart` | `git pull --ff-only` | — |
| `stop` | pull → stage safe paths → commit → push if ahead | `docs/`, `.cursor/`, memory-chain paths; excludes `.env` / secrets |

**Commit messages:** `lib.ps1` / `lib.sh` inspect safe dirty paths before commit and emit a conventional subject (`docs` / `fix(hooks)` / `chore`) plus an optional body listing up to eight files. Mixed hook + memory-doc sessions get summaries like `chore: session sync — hooks, memory docs`. Generic `chore(sync): session autosync [cursor hook]` is fallback only when no paths match.

**Windows (this repo):** `.cursor/hooks.json` invokes PowerShell:

```text
powershell -NoProfile -ExecutionPolicy Bypass -File .cursor/hooks/session-start.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File .cursor/hooks/session-stop.ps1
```

**Unix / macOS / Git Bash:** point `hooks.json` at `.cursor/hooks/run-hook.sh session-start` (or call `.sh` directly). Shared logic lives in `lib.sh` / `lib.ps1`.

**Manual setup:** Cursor **Settings → Hooks** must show the project hooks enabled. After editing `hooks.json`, restart Cursor or reload the window if hooks do not fire. Timeouts: 30s start, 60s stop (git network).

---

## User-level vs project-level

| Location | `hooks.json` | Script paths |
|----------|--------------|--------------|
| **Project** | `<repo>/.cursor/hooks.json` | `.cursor/hooks/*.ps1` (Windows) · `.cursor/hooks/*.sh` + `run-hook.sh` (Unix) |
| **User (global)** | `~/.cursor/hooks.json` | `./hooks/gods-eye/*.sh` or `.ps1` (relative to `~/.cursor/`) |

User-level hooks resolve the active workspace via `workspace_roots` in hook stdin JSON and set `GODS_EYE_PROJECT_ROOT` / `GODS_EYE_ROOT` at `sessionStart`. Install with `./install.sh --user` — see [`CURSOR_INSTALL.md`](../CURSOR_INSTALL.md).

---

## Troubleshooting

- **Hooks not firing** — confirm paths: project `.cursor/hooks/*.ps1` (Windows) or `.cursor/hooks/run-hook.sh` (Unix); **Settings → Hooks** enabled; restart Cursor after `hooks.json` edits.
- **Autosync pull/push fails** — check network, auth, and branch upstream; hooks fail open and report in `additional_context` / `followup_message`. Push failure appends defer line to handoff Recent sessions.
- **Windows `git add failed` on stop** — fixed in `lib.ps1`: batch add via `Invoke-GitInRoot` with per-file fallback; quoted paths from `git status --porcelain` stripped before staging.
- **Wrong project paths in reminders** — hooks need `workspace_roots` in stdin; `sessionStart` sets `GODS_EYE_PROJECT_ROOT` for later hooks.
- **Stop follow-up loops** — `loop_limit: 1` on the `stop` hook; script skips when `loop_count > 0`.
- **Too chatty** — remove `afterFileEdit` from `hooks.json` or disable hooks entirely.
- **Slow session stop (clean tree)** — stop hook skips pull/commit/push when there are no safe dirty files, branch is not ahead, and session-start pulled recently (`.cursor/.autosync-session`, default 30 min). `afterFileEdit` exits immediately (`{}`) for non-memory paths without loading hook libs.
- **Generic autosync commit messages** — fixed: session-stop now auto-generates conventional subjects from safe dirty paths (`Get-GodsEyeAutosyncCommitMessage` / `gods_eye_autosync_commit_message` in hook libs).
- **Tune stop-pull skip window** — set `GODS_EYE_AUTOSYNC_SKIP_STOP_PULL_SEC` (seconds; default `1800`).

---

## Related docs

- [Workspace editor settings](../.vscode/README.md) — user vs workspace `settings.json`, git/terminal alignment with hooks
- [God's Eye Bible §0](37_GODS_EYE.md) — Agent quick start (Before / During / After)
- [MCP setup](MCP_SETUP.md) — Phase 2 memory-chain tools (optional; complements hooks)
- [Session tree](GODS_EYE_SESSION_TREE.md) — Three-touch + Record Everything
- [Create-hook skill](https://cursor.com/docs) — Cursor hooks reference (project: `.cursor/hooks.json`)
