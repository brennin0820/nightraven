#!/usr/bin/env bash
# Gods Eye Phase 2 — afterFileEdit
# Soft nudge when memory-chain files change: +# only, consider exit writes.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

input="$(cat || true)"
file_path="$(json_field "$input" "file_path")"
if [[ -z "${file_path}" ]]; then
  file_path="$(json_field "$input" "path")"
fi

case "${file_path}" in
  docs/*|AGENTS.md|.cursor/rules/*|examples/overlay/*)
    ;;
  *)
    printf '{}\n'
    exit 0
    ;;
esac

message="Gods Eye memory edit (${file_path}):"
message+=$'\n\n'
message+="- +# only — append; use **Supersedes** for corrections; never -# heading blocks or trim **Already done** / **Recent sessions**"
message+=$'\n'
message+="- If meaningful work: wire cross-links and plan Touch 3 writes (changelog, learning log, handoff Recent sessions)"
message+=$'\n'
message+="- One writer per file per pass; parallel reads are fine"

emit_additional_context "$message"
exit 0
