#!/usr/bin/env bash
# Gods Eye Phase 2 — stop (Touch 3 · After) + Always Sync commit/push
# Soft follow-up: append Recent sessions (+# only) before ending. Fail-open on git errors.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

input="$(cat || true)"
project_root="$(gods_eye_project_root "$input")"

loop_count="$(json_number_field "$input" "loop_count")"
loop_count="${loop_count:-0}"

sync_lines=()
sync_lines+=("$(gods_eye_git_pull_ff_only "$project_root")")
sync_lines+=("$(gods_eye_git_session_commit "$project_root")")
push_msg="$(gods_eye_git_push_if_ahead "$project_root")"
sync_lines+=("$push_msg")

if [[ "$push_msg" == Autosync\ push\ failed* ]]; then
  reason="${push_msg#Autosync push failed (fail-open): }"
  gods_eye_append_push_defer "$project_root" "$reason"
  sync_lines+=("Push defer recorded in docs/14_SESSION_HANDOFF.md Recent sessions (+# only).")
fi

sync_block="$(printf '%s\n' "${sync_lines[@]}")"

if [[ "${loop_count}" -gt 0 ]]; then
  message="God's Eye · Always Sync [cursor hook]"
  message+=$'\n\n'"${sync_block}"
  emit_followup_message "$message"
  exit 0
fi

if gods_eye_touch3_disabled "$project_root"; then
  message="God's Eye · Always Sync [cursor hook]"
  message+=$'\n\n'"${sync_block}"
  message+=$'\n\n'"Touch 3 AFTER paused — no mandatory handoff batch."
  emit_followup_message "$message"
  exit 0
fi

handoff_path="$(gods_eye_rel_path "$project_root" "docs/14_SESSION_HANDOFF.md")"

message="Gods Eye · Touch 3 · AFTER — before you finish"
message+=$'\n\n'"**Always Sync [cursor hook]**"
message+=$'\n'"${sync_block}"
message+=$'\n\n'
message+="If this was a real session (tier >= 1): append one +# line to **Recent sessions** in ${handoff_path}. "
message+="Keep prior session lines (newest first). Never -# or replace the whole section."
message+=$'\n\n'
message+="Record Everything (Tier 2+): also append docs/02_ENGINEERING_CHANGELOG.md when work was meaningful; "
message+="docs/04_LEARNING_LOG.md for new patterns; wire cross-links (rule, Bible, overlay, AGENTS, handoff)."
message+=$'\n\n'
message="+# only · this repo only · no new template scaffolds per cycle."

emit_followup_message "$message"
exit 0
