# NightRaven — workspace editor settings

Cursor and VS Code share the same `settings.json` schema. This repo uses a **split**:

| Layer | Path | Purpose |
|-------|------|---------|
| **User** | `%APPDATA%\Cursor\User\settings.json` | Global performance, Cursor agent prefs, cross-project excludes |
| **Workspace** | `.vscode/settings.json` (this repo) | Docs/memory workflow, `mcp-server` paths, git/terminal for hooks |

## Workspace choices (why here)

- **`docs/` stays searchable** — agents need the memory chain; only `mcp-server` build dirs and secrets are excluded.
- **Markdown: no format-on-save** — avoids accidental rewrites of append-only memory docs (`+#` law).
- **`.mdc` → markdown** — Cursor rules read as markdown.
- **`git.autofetch` + `confirmSync: false`** — light background fetch between sessions; complements `.cursor/hooks` Always Sync (pull at start, push at stop). Hooks remain authoritative for commit/push.
- **PowerShell default terminal** — matches `hooks.json` on Windows.

## Cursor-only (not in JSON — toggle in UI)

| Setting | Where | Notes |
|---------|-------|-------|
| **Hooks** | Settings → Hooks | Project hooks from `.cursor/hooks.json`; reload window after edits |
| **Models / LM Studio** | Settings → Models | Local: override base URL `http://localhost:1234/v1`; see `docs/NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md` |
| **Privacy / indexing** | Settings → Cursor → Privacy | Codebase indexing; adjust if local-only mode |
| **Agent attribution** | Settings → Agent | UI-only, not `settings.json` |
| **MCP** | Settings → MCP | NightRaven server via `.cursor/mcp.json` |

## Extensions

See `extensions.json`. **GitLens** is listed as unwanted — global settings already optimize for lighter git UI.
