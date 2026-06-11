# God's Eye — Optional Phase 2 Hooks

**Phase 2** adds **soft** Cursor hooks that reinforce the portable God's Eye workflow: **three-touch** (Before → During → After), **Record Everything** at Tier 2+, and **`+#` only** memory writes.

Hooks are **not** CORE hard blocks. They inject reminders and optional follow-up messages — agents can still proceed. No external dependencies (`jq`, `node`, etc.); scripts are plain bash.

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

### `sessionStart` → `.cursor/hooks/session-start.sh`

**Touch 1 · Before** — injects `additional_context` at session start:

- Parallel-read chain: rule → Bible §0 → overlay → router → handoff → `AGENTS.md`
- Tier + intent ladder reminder (memory + wire default)
- This-repo-only dedup; no cross-repo handoff bleed

Does **not** block edits or tool use.

### `stop` → `.cursor/hooks/session-stop.sh`

**Touch 3 · After** — returns a one-time `followup_message` when the agent completes (`loop_count` 0, `loop_limit: 1`):

- Append **Recent sessions** in `docs/14_SESSION_HANDOFF.md` (`+#` only)
- Record Everything checklist at Tier 2+ (changelog, learning log, wire)
- **Always Sync nudge** — reminds `git push` before closing (Push-latency law §2.9). Cites `git push origin <branch>` or explicit defer reason in Recent sessions.

Does **not** force writes; it reminds the agent before exit.

**Paused:** When `.cursor/touch3.disabled` or `~/.cursor/touch3.disabled` exists, `session-stop.sh` no-ops — do not remove the `stop` hook from `hooks.json`. Marker also adjusts `sessionStart` / `afterFileEdit` Touch 3 nudges. `.cursor/touch3.disabled` is gitignored locally.

### `afterFileEdit` → `.cursor/hooks/after-file-edit.sh`

**During / After nudge** — when edits touch memory-chain paths (`docs/*`, `AGENTS.md`, `.cursor/rules/*`, `examples/overlay/*`):

- Reminds `+#` only and Supersedes for corrections
- Suggests Touch 3 writes when work was meaningful

Does **not** rewrite files or deny saves.

---

## Soft enforcement vs CORE law

| | CORE (Bible §2, rules) | Phase 2 hooks |
|---|------------------------|---------------|
| **Binding** | Agent must follow portable law | Optional nudges |
| **Failure mode** | Wrong memory edits violate `+#` law | Hook crash fails open (no `failClosed`) |
| **Blocks** | Product/QA boundaries, scope | None — no `permission: deny` |

Use hooks to **reinforce habit**, not replace `.cursor/rules/gods-eye-context-intent.mdc` or `docs/37_GODS_EYE.md`.

---

## Bootstrap checklist

1. Vendor or copy God's Eye docs and rules (Phase 1).
2. Create `docs/14_SESSION_HANDOFF.md` with **Recent sessions** and **Already done** sections.
3. Enable Phase 2 hooks when handoff exists.
4. Session start: rule → §0 → overlay → handoff (hook adds the same reminder automatically).
5. **Always Sync** — `session-stop.sh` nudges `git push` on exit per §2.9; `sessionStart` should remind `git pull` (or add it to your `session-start.sh` opening line).

---

## User-level vs project-level

| Location | `hooks.json` | Script paths |
|----------|--------------|--------------|
| **Project** | `<repo>/.cursor/hooks.json` | `.cursor/hooks/*.sh` (relative to project root) |
| **User (global)** | `~/.cursor/hooks.json` | `./hooks/gods-eye/*.sh` (relative to `~/.cursor/`) |

User-level hooks resolve the active workspace via `workspace_roots` in hook stdin JSON and set `GODS_EYE_PROJECT_ROOT` / `GODS_EYE_ROOT` at `sessionStart`. Install with `./install.sh --user` — see [`CURSOR_INSTALL.md`](../CURSOR_INSTALL.md).

---

## Troubleshooting

- **Hooks not firing** — confirm paths: project `.cursor/hooks/*.sh` or user `./hooks/gods-eye/*.sh`; scripts executable (`chmod +x`).
- **Wrong project paths in reminders** — hooks need `workspace_roots` in stdin; `sessionStart` sets `GODS_EYE_PROJECT_ROOT` for later hooks.
- **Stop follow-up loops** — `loop_limit: 1` on the `stop` hook; script skips when `loop_count > 0`.
- **Too chatty** — remove `afterFileEdit` from `hooks.json` or disable hooks entirely.

---

## Related docs

- [God's Eye Bible §0](37_GODS_EYE.md) — Agent quick start (Before / During / After)
- [MCP setup](MCP_SETUP.md) — Phase 2 memory-chain tools (optional; complements hooks)
- [Session tree](GODS_EYE_SESSION_TREE.md) — Three-touch + Record Everything
- [Create-hook skill](https://cursor.com/docs) — Cursor hooks reference (project: `.cursor/hooks.json`)
