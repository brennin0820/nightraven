# God's Eye — Claude Code adoption guide

Step-by-step setup so God's Eye memory chain works in **Claude Code** (Anthropic CLI) on day one — same portable law as Cursor, with Claude-specific paths and hooks parity notes.

**Audience:** Developers adopting God's Eye into app repos via Claude Code rather than (or alongside) Cursor.

---

## What Claude adopters get

| Layer | Location | Purpose |
|-------|----------|---------|
| **Project rule** | `.cursor/rules/gods-eye-context-intent.mdc` | Claude reads via `CLAUDE.md` / project instructions — copy rule content or symlink |
| **Portable Bible** | `docs/37_GODS_EYE.md` (vendored) or `$GODS_EYE_ROOT` | Portable law — §0–§10 |
| **Repo overlay** | `docs/GODS_EYE_REPO_OVERLAY.md` | Local vocabulary, boundaries, disambiguation |
| **Handoff** | `docs/14_SESSION_HANDOFF.md` | Current state, Already done, Recent sessions (`+#` only) |
| **Agent entry** | `AGENTS.md` | Read order, core laws, common mistakes |
| **Changelog / learning** | `docs/02_*`, `docs/04_*` | Append-only memory chain |
| **Hooks (optional)** | `.cursor/hooks/` + `hooks.json` | Cursor-native; see **Hooks parity** below |
| **MCP (optional)** | `mcp-server/` + `.cursor/mcp.json` | Memory-chain tools — see [`MCP_SETUP.md`](MCP_SETUP.md) |

---

## Install path

### 1. Clone and bootstrap

```bash
git clone https://github.com/brennin0820/gods-eye.git ~/Projects/gods-eye
cd ~/Projects/gods-eye
chmod +x install.sh

# Bootstrap your app repo (vendors Bible + doc chain + optional hooks/MCP)
./install.sh /path/to/your-app
```

For framework development, work directly in the `gods-eye` clone.

### 2. What to vendor into your app repo

| Artifact | Required | Notes |
|----------|----------|-------|
| `docs/37_GODS_EYE.md` | Yes | Portable Bible — or set `$GODS_EYE_ROOT` to framework clone |
| `docs/GODS_EYE_REPO_OVERLAY.md` | Yes | Start from [`examples/overlay/`](../examples/overlay/GODS_EYE_REPO_OVERLAY.example.md) |
| `docs/14_SESSION_HANDOFF.md` | Yes | Session state + Recent sessions |
| `docs/02_ENGINEERING_CHANGELOG.md` | Yes | Engineering history (`+#` only) |
| `docs/04_LEARNING_LOG.md` | Yes | Patterns and pitfalls (`+#` only) |
| `AGENTS.md` | Yes | Agent conventions |
| `.cursor/rules/gods-eye-context-intent.mdc` | Recommended | Wire into Claude project instructions |
| `.cursor/hooks/` + `hooks.json` | Optional | Cursor-only autosync; see parity note |
| `mcp-server/` + `.cursor/mcp.json` | Optional | Phase 2 MCP — git remains authoritative |

`install.sh` handles the above for Cursor projects. Claude adopters run the same script, then wire Claude-specific entry points (below).

### 3. Claude project entry

Claude Code loads project context from **`CLAUDE.md`** (repo root) and optional **`.claude/`** skills. Minimum wiring:

1. Add a **`CLAUDE.md`** pointer (or merge into existing):

   ```markdown
   ## God's Eye (agent memory)

   Read before every session: `AGENTS.md` → overlay → handoff.
   Portable law: `docs/37_GODS_EYE.md` §0.
   ```

2. Optionally copy `.claude/skills/` patterns from this repo (`bank-*`, `nightraven`, etc.) — framework skills live under `.claude/skills/` here; consumer repos cherry-pick as needed.

3. Set **`CLAUDE_PROJECT_DIR`** if using hook scripts that resolve project root (same env var as Cursor hooks in `lib.ps1` / `lib.sh`).

### 4. Git author (noreply — GH007)

Use GitHub noreply email for commits to avoid private-email push rejection:

```bash
git config user.email "172115324+brennin0820@users.noreply.github.com"
# user.name unchanged — match your GitHub display name
```

Verify: `git log -1 --format='%ae'` before first push. See handoff Recent sessions (2026-06-10 GH007 batch).

---

## MCP (optional Phase 2)

MCP is **optional** — git + markdown chain remain authoritative.

1. Build once: `cd mcp-server && npm install && npm run build`
2. Register in Claude/Cursor MCP config (see [`MCP_SETUP.md`](MCP_SETUP.md))
3. Tools: `gods_eye_read_memory`, `gods_eye_search_memory`, `gods_eye_append_recent_session`

Skip MCP at install: `./install.sh --no-mcp /path/to/app`

---

## Hooks parity note

God's Eye Phase 2 hooks (`.cursor/hooks.json`) target **Cursor** lifecycle events (`sessionStart`, `stop`, `afterFileEdit`).

| Feature | Cursor | Claude Code |
|---------|--------|-------------|
| Touch 1/3 reminders | `sessionStart` / `stop` hooks | Manual — read chain at session start; append handoff at end |
| Always Sync autosync | `lib.ps1` / `lib.sh` on session boundaries | Manual `git pull` / commit / push — or adapt hook scripts to Claude session events if available |
| `afterFileEdit` nudge | Cursor hook | Discipline only — `+#` only on memory docs |

**Parity goal:** Same *behavior* (pull before work, safe-path commit, push after, Touch 3 append) even when Cursor hooks are not firing. See [`HOOKS_SETUP.md`](HOOKS_SETUP.md) for autosync scope and safe paths.

---

## Session protocol (Claude)

| Phase | Action |
|-------|--------|
| **Before** | `git pull --ff-only` · parallel-read rule → Bible §0 → overlay → handoff → `AGENTS.md` |
| **During** | Intent ladder default (memory + wire) · `+#` only · guard scope |
| **After** | Append Recent sessions · changelog (Tier 2+) · learning log (new patterns) · commit · push |

**Fresh thread:** At ~80% context, start a new Claude session and read handoff — Bible §2.8.

---

## Verify adoption (2 minutes)

1. Open app repo in Claude Code.
2. Ask: *"What is God's Eye Touch 1?"* — agent should cite Bible §0, overlay, handoff.
3. Confirm `docs/14_SESSION_HANDOFF.md` has **Recent sessions** and **Already done**.
4. Confirm `git config user.email` is noreply before pushing memory commits.

---

## Monorepo app work (NightRaven Compass)

When Claude Code works inside the NightRaven platform monorepo on **`apps/compass/`**, read [`apps/compass/AGENTS.md`](../apps/compass/AGENTS.md) before implementation files — Compass has its own data flow, registry API, and consumer handoff isolation from framework `docs/14`.

---

## Related

- [`CURSOR_INSTALL.md`](CURSOR_INSTALL.md) — Cursor-specific install + verification
- [`HOOKS_SETUP.md`](HOOKS_SETUP.md) — Phase 2 hooks and Always Sync autosync
- [`MCP_SETUP.md`](MCP_SETUP.md) — Optional MCP memory-chain tools
- [`37_GODS_EYE.md`](37_GODS_EYE.md) — Portable law
- [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) — Local vocabulary

*God's Eye always watches — same memory chain, any agent surface.*
