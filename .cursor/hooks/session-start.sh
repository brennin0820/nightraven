#!/usr/bin/env bash
# NightRaven Phase 2 — sessionStart (Touch 1 · Before) + Always Sync pull
# Soft reminder: read handoff + chain before substantive work. Fail-open on git errors.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

input="$(cat || true)"
project_root="$(nightraven_project_root "$input")"
nightraven_root="$(nightraven_resolve_root "$project_root")"
handoff_hint="$(nightraven_rel_path "$project_root" "docs/14_SESSION_HANDOFF.md")"
bible_hint="docs/37_NIGHTRAVEN.md"
if [[ ! -f "${project_root}/${bible_hint}" ]]; then
  bible_hint="${nightraven_root}/docs/37_NIGHTRAVEN.md"
fi

if nightraven_should_skip_recent_pull "$project_root"; then
  pull_msg="Autosync pull skipped — session recent (see .cursor/.autosync-session)."
else
  pull_msg="$(nightraven_git_pull_ff_only "$project_root")"
  if [[ "$pull_msg" == Autosync\ pull\ failed* ]]; then
    nightraven_mark_session_pulled "$project_root" 0
  else
    nightraven_mark_session_pulled "$project_root" 1
  fi
fi
nightraven_touch3_disabled_cached "$project_root" >/dev/null || true

message="$(cat <<EOF
NightRaven · Touch 1 · BEFORE (soft reminder — not a hard block)

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

if nightraven_multiphase_in_flight "$project_root"; then
  message+=$'\n'"Multi-phase in flight (.cursor/.multiphase-in-flight): **skip handoff read** in START HERE — use thread context; handoff batch deferred until parent removes marker."
fi
if nightraven_touch3_disabled "$project_root"; then
  message+=$'\n'"Touch 3 AFTER: **paused** (.cursor/touch3.disabled or ~/.cursor/touch3.disabled) — skip session-close follow-up batch"
else
  message+=$'\n'"After (Touch 3): **last turn only** — session-stop hook batches handoff + changelog + learning; never mid-session or while subagents run"
fi

message+=$'\n\n'"Portable law: ${bible_hint} · Session tree: docs/NIGHTRAVEN_SESSION_SPEC_TREES.md (or NIGHTRAVEN_ROOT)"
message+=$'\n'"NIGHTRAVEN_ROOT=${nightraven_root}"

emit_session_start "$message" "$nightraven_root"
exit 0
