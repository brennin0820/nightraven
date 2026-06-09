#!/usr/bin/env bash
# God's Eye Phase 2 — sessionStart (Touch 1 · Before)
# Soft reminder: read handoff + chain before substantive work.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

input="$(cat || true)"
project_root="$(gods_eye_project_root "$input")"
gods_eye_root="$(gods_eye_resolve_root "$project_root")"
handoff_hint="$(gods_eye_rel_path "$project_root" "docs/14_SESSION_HANDOFF.md")"
bible_hint="docs/37_GODS_EYE.md"
if [[ ! -f "${project_root}/${bible_hint}" ]]; then
  bible_hint="${gods_eye_root}/docs/37_GODS_EYE.md"
fi

message="$(cat <<EOF
God's Eye · Touch 1 · BEFORE (soft reminder — not a hard block)

Three-touch: Before → During → After on every real task.

Before substantive edits:
1. Parallel-read: always-on rule → ${bible_hint} §0 → overlay (if any) → router (if any) → ${handoff_hint} → AGENTS.md
2. Classify tier (0–3) and intent ladder — default stop: memory + wire
3. MEMORY CHECK: dedup against this repo only; never import other repos' handoff

During: guard scope · +# only on memory docs · parallel independent workstreams
After (Touch 3): append handoff Recent sessions on real exit; Record Everything at Tier 2+

Portable law: ${bible_hint} · Session tree: docs/GODS_EYE_SESSION_TREE.md (or GODS_EYE_ROOT)
GODS_EYE_ROOT=${gods_eye_root}
EOF
)"

emit_session_start "$message" "$gods_eye_root"
exit 0
