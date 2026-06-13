# NightRaven MCP setup (Phase 2)

Optional **Model Context Protocol** tools expose the git-backed memory chain to Cursor agents without replacing handoff, changelog, or overlay as source of truth.

**Git wins:** MCP reads and appends (+# only) to L3 docs. Any external index (Mem0/Zep) remains optional L4 — see [`NIGHTRAVEN_UNIFIED_STACK.md`](NIGHTRAVEN_UNIFIED_STACK.md) §6.

---

## Tools

| Tool | Purpose |
|------|---------|
| `nightraven_list_memory_slots` | List handoff, changelog, overlay, Bible, etc. with paths |
| `nightraven_get_read_order` | Return Touch 1 parallel read batch |
| `nightraven_read_memory` | Read one memory doc by slot id |
| `nightraven_search_memory` | Substring search across memory docs (dedup) |
| `nightraven_append_recent_session` | Append one **Recent sessions** line (+# only) |

---

## One-time build

From the NightRaven install root (this repo or `$NIGHTRAVEN_INSTALL_ROOT`):

```bash
cd mcp-server
npm install
npm run build
```

Verify:

```bash
node mcp-server/dist/index.js
# Ctrl+C — stdio server waits for MCP client
```

---

## Project install (Cursor)

When you run `./install.sh` on a bootstrapped project, it copies:

- `.cursor/mcp.json` — MCP server registration
- `.cursor/mcp/run-memory-chain-mcp.js` — cross-platform launcher (runs natively on Windows, macOS, Linux)
- `.cursor/mcp/run-memory-chain-mcp.sh` — bash fallback launcher

**Enable in Cursor:**

1. **Cursor Settings → MCP** — confirm `nightraven-memory-chain` appears (green).
2. Open a new Agent chat in the bootstrapped project.
3. Ask the agent to call `nightraven_list_memory_slots` or `nightraven_read_memory` with `slot: handoff`.

If the server fails to start, build `mcp-server/` as above. The launcher prints the exact path it expects.

---

## Manual `.cursor/mcp.json`

```json
{
  "mcpServers": {
    "nightraven-memory-chain": {
      "command": "node",
      "args": [".cursor/mcp/run-memory-chain-mcp.js"]
    }
  }
}
```

Set `NIGHTRAVEN_INSTALL_ROOT` in the MCP env block if the portable Bible lives outside the project:

```json
{
  "mcpServers": {
    "nightraven-memory-chain": {
      "command": "node",
      "args": [".cursor/mcp/run-memory-chain-mcp.js"],
      "env": {
        "NIGHTRAVEN_INSTALL_ROOT": "/path/to/nightraven-monorepo",
        "NIGHTRAVEN_PROJECT_ROOT": "/path/to/your-app"
      }
    }
  }
}
```

---

## Path resolution

The server resolves paths in this order:

| Variable | Role |
|----------|------|
| `NIGHTRAVEN_PROJECT_ROOT` | App repo (handoff, overlay, changelog) |
| `CURSOR_PROJECT_DIR` | Cursor workspace fallback |
| `NIGHTRAVEN_ROOT` / `NIGHTRAVEN_INSTALL_ROOT` | Portable Bible when not vendored in project |

Portable L2 docs (`bible`, `router`, `session_tree`) fall back to `$NIGHTRAVEN_ROOT` when missing in the project tree.

---

## Operating rules

- **`+#` only** — `nightraven_append_recent_session` inserts under **Recent sessions**; it refuses shrink/delete.
- **This repo only** — no cross-repo handoff bleed; one MCP instance per workspace.
- **Tier 0–1** — optional; parallel doc reads remain sufficient for small tasks.
- **Mem0/Zep** — separate optional L4; ingest from git, never shadow writes.
- **Mode-agnostic** — MCP tools work identically in local (LM Studio) and cloud mode. Execution mode governs agent parallelism and context discipline, not the MCP API itself — see [`NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md`](NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md) §4.

---

## Related

- [`HOOKS_SETUP.md`](HOOKS_SETUP.md) — Phase 2 soft hooks
- [`CURSOR_INSTALL.md`](CURSOR_INSTALL.md) — full install flow
- [`NIGHTRAVEN_UNIFIED_STACK.md`](NIGHTRAVEN_UNIFIED_STACK.md) — Phase 2 hooks + MCP roadmap
- [`NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md`](NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md) — local vs cloud agent discipline (§4 governs parallelism, not MCP API)
