#!/usr/bin/env bash
# Gods Eye Phase 2 — stop (Touch 3 · After)
# Soft follow-up: append Recent sessions (+# only) before ending.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

input="$(cat || true)"
project_root="$(gods_eye_project_root "$input")"

if gods_eye_touch3_disabled "$project_root"; then
  printf '{}\n'
  exit 0
fi

loop_count="$(json_number_field "$input" "loop_count")"
loop_count="${loop_count:-0}"

if [[ "${loop_count}" -gt 0 ]]; then
  printf '{}\n'
  exit 0
fi

handoff_path="$(gods_eye_rel_path "$project_root" "docs/14_SESSION_HANDOFF.md")"

message="Gods Eye · Touch 3 · AFTER — before you finish"
message+=$'\n\n'
message+="If this was a real session (tier >= 1): append one +# line to **Recent sessions** in ${handoff_path}. "
message+="Keep prior session lines (newest first). Never -# or replace the whole section."
message+=$'\n\n'
message+="Record Everything (Tier 2+): also append docs/02_ENGINEERING_CHANGELOG.md when work was meaningful; "
message+="docs/04_LEARNING_LOG.md for new patterns; wire cross-links (rule, Bible, overlay, AGENTS, handoff)."
message+=$'\n\n'
message+="+# only · this repo only · no new template scaffolds per cycle."
message+=$'\n\n'
message+="Push-latency (§2.8): if memory docs changed and remote exists — push before exit, or note explicit push defer in Recent sessions."

emit_followup_message "$message"
exit 0
