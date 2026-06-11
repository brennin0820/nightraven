#!/usr/bin/env bash
# Cross-platform hook dispatcher — prefers Git Bash on Windows when bash is not on PATH.
# Usage: run-hook.sh <script-name-without-extension>
# Example hooks.json (Unix/macOS): "command": ".cursor/hooks/run-hook.sh session-start"

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
HOOK_NAME="${1:-}"

if [[ -z "${HOOK_NAME}" ]]; then
  printf '{}\n'
  exit 0
fi

TARGET="${SCRIPT_DIR}/${HOOK_NAME}.sh"
if [[ ! -f "${TARGET}" ]]; then
  printf '{}\n'
  exit 0
fi

exec bash "${TARGET}"
