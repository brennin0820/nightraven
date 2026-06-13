#!/usr/bin/env bash
# Launch NightRaven MCP server (stdio) for Cursor.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
INSTALL_ROOT="${NIGHTRAVEN_INSTALL_ROOT:-$(cd "${SCRIPT_DIR}/../.." && pwd)}"
SERVER_JS="${INSTALL_ROOT}/mcp-server/dist/index.js"

if [[ ! -f "$SERVER_JS" ]]; then
  echo "nightraven memory-chain MCP server not built: ${SERVER_JS}" >&2
  echo "Run: cd \"${INSTALL_ROOT}/mcp-server\" && npm install && npm run build" >&2
  exit 1
fi

exec node "$SERVER_JS"
