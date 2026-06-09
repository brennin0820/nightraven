#!/usr/bin/env bash
# God's Eye Phase 2 — sessionStart (Touch 1 · Before)
# Soft reminder: read handoff + chain before substantive work.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

handoff_hint="docs/14_SESSION_HANDOFF.md"
if [[ ! -f "${handoff_hint}" ]]; then
  handoff_hint="(create docs/14_SESSION_HANDOFF.md when bootstrapped)"
fi

message="$(cat <<EOF
God's Eye · Touch 1 · BEFORE (soft reminder — not a hard block)

Three-touch: Before → During → After on every real task.

Before substantive edits:
1. Parallel-read: always-on rule → docs/37_GODS_EYE.md §0 → overlay (if any) → router (if any) → ${handoff_hint} → AGENTS.md
2. Classify tier (0–3) and intent ladder — default stop: memory + wire
3. MEMORY CHECK: dedup against this repo only; never import other repos' handoff

During: guard scope · +# only on memory docs · parallel independent workstreams
After (Touch 3): append handoff Recent sessions on real exit; Record Everything at Tier 2+

Portable law: docs/37_GODS_EYE.md · Session tree: docs/GODS_EYE_SESSION_TREE.md
EOF
)"

emit_additional_context "$message"
exit 0
