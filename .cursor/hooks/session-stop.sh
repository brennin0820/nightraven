#!/usr/bin/env bash
# God's Eye Phase 2 — stop (Touch 3 · After)
# Soft follow-up: append Recent sessions (+# only) before ending.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# shellcheck source=lib.sh
source "${SCRIPT_DIR}/lib.sh"

input="$(cat || true)"
loop_count="$(json_number_field "$input" "loop_count")"
loop_count="${loop_count:-0}"

# Avoid follow-up loops — nudge once per agent completion.
if [[ "${loop_count}" -gt 0 ]]; then
  printf '{}\n'
  exit 0
fi

handoff_path="docs/14_SESSION_HANDOFF.md"
if [[ ! -f "${handoff_path}" ]]; then
  handoff_path="docs/14_SESSION_HANDOFF.md (create when bootstrapped)"
fi

message="$(cat <<EOF
God's Eye · Touch 3 · AFTER — before you finish

If this was a real session (tier ≥1): append one +# line to **Recent sessions** in ${handoff_path}. Keep prior session lines (newest first). Never -# or replace the whole section.

Record Everything (Tier 2+): also append docs/02_ENGINEERING_CHANGELOG.md when work was meaningful; docs/04_LEARNING_LOG.md for new patterns; wire cross-links (rule ↔ Bible ↔ overlay ↔ AGENTS ↔ handoff).

+# only · this repo only · no new template scaffolds per cycle.
EOF
)"

emit_followup_message "$message"
exit 0
