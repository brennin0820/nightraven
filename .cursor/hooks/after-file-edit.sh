#!/usr/bin/env bash
# Gods Eye Phase 2 — afterFileEdit
# Soft nudge when memory-chain files change: +# only, consider exit writes.
# Fast path: skip lib load when edit is outside memory-chain paths.

set -euo pipefail

input="$(cat || true)"

json_field_fast() {
  local json="$1"
  local field="$2"
  printf '%s' "$json" | sed -n "s/.*\"${field}\"[[:space:]]*:[[:space:]]*\"\\([^\"]*\\)\".*/\\1/p" | head -1
}

memory_chain_path() {
  local file_path="${1//\\//}"
  case "$file_path" in
    docs/*|.cursor/rules/*|examples/overlay/*|AGENTS.md) return 0 ;;
  esac
  return 1
}

file_path="$(json_field_fast "$input" "file_path")"
if [[ -z "${file_path}" ]]; then
  file_path="$(json_field_fast "$input" "path")"
fi

if ! memory_chain_path "${file_path}"; then
  printf '{}\n'
  exit 0
fi

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

message="Gods Eye memory edit (${file_path}):"
message+=$'\n\n'
message+="- +# only — append; use **Supersedes** for corrections; never -# heading blocks or trim **Already done** / **Recent sessions**"
project_root="$(gods_eye_project_root "$input")"
if gods_eye_touch3_disabled "$project_root"; then
  message+=$'\n'"- Touch 3 paused — wire cross-links when asked; no mandatory session-close batch"
else
  message+=$'\n'"- If meaningful work: wire cross-links and plan Touch 3 writes (changelog, learning log, handoff Recent sessions)"
fi
message+=$'\n'"- One writer per file per pass; parallel reads are fine"

emit_additional_context "$message"
exit 0
