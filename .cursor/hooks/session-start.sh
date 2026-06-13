#!/usr/bin/env bash
# God's Eye Phase 2 — sessionStart (Touch 1 · Before) + Always Sync pull
# Soft reminder: read handoff + chain before substantive work. Fail-open on git errors.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

input="$(cat || true)"
project_root="$(gods_eye_project_root "$input")"
gods_eye_root="$(gods_eye_resolve_root "$project_root")"
handoff_hint="$(gods_eye_rel_path "$project_root" "docs/14_SESSION_HANDOFF.md")"
bible_hint="docs/37_GODS_EYE_BIBLE.md"
if [[ ! -f "${project_root}/${bible_hint}" ]]; then
  bible_hint="${gods_eye_root}/docs/37_GODS_EYE_BIBLE.md"
fi

if gods_eye_should_skip_recent_pull "$project_root"; then
  pull_msg="Autosync pull skipped — session recent (see .cursor/.autosync-session)."
else
  pull_msg="$(gods_eye_git_pull_ff_only "$project_root")"
  if [[ "$pull_msg" == Autosync\ pull\ failed* ]]; then
    gods_eye_mark_session_pulled "$project_root" 0
  else
    gods_eye_mark_session_pulled "$project_root" 1
  fi
fi
gods_eye_touch3_disabled_cached "$project_root" >/dev/null || true

message="$(cat <<EOF
God's Eye · Touch 1 · BEFORE (soft reminder — not a hard block)

Always Sync · session start: ${pull_msg}

Three-touch: Before → During → After on every real task.

Before substantive edits:
1. Parallel-read: always-on rule → ${bible_hint} §0 → overlay (if any) → router (if any) → ${handoff_hint} → AGENTS.md
   Tier 0–1 fast path: rule + handoff scan only — skip full Bible chain unless scope is cross-cutting
2. Classify tier (0–3) and intent ladder — default stop: memory + wire
3. MEMORY CHECK: dedup against this repo only; never import other repos' handoff

During: guard scope · +# only on memory docs · parallel independent workstreams
EOF
)"

if gods_eye_touch3_disabled "$project_root"; then
  message+=$'\n'"Touch 3 AFTER: **paused** (.cursor/touch3.disabled or ~/.cursor/touch3.disabled) — skip session-close follow-up batch"
else
  message+=$'\n'"After (Touch 3): **last turn only** — session-stop hook batches handoff + changelog + learning; never mid-session or while subagents run"
fi

message+=$'\n\n'"Portable law: ${bible_hint} · Session tree: docs/GODS_EYE_SESSION_SPEC_TREES.md (or GODS_EYE_ROOT)"
message+=$'\n'"GODS_EYE_ROOT=${gods_eye_root}"

emit_session_start "$message" "$gods_eye_root"
exit 0
