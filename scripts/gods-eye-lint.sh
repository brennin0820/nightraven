#!/usr/bin/env bash
# gods-eye-lint.sh — Soft/opt-in God's Eye chain checks (BACKLOG #5, unified stack Phase 3).
#
# Usage:
#   ./scripts/gods-eye-lint.sh           # all checks
#   ./scripts/gods-eye-lint.sh snapshot  # snapshot drift only
#   ./scripts/gods-eye-lint.sh handoff   # Recent sessions date-order heuristic

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CHECK="${1:-all}"
fail=0

lint_snapshot() {
  if ! "${ROOT}/scripts/sync-snapshot.sh" --check-only; then
    echo "lint: snapshot drift (run ./scripts/sync-snapshot.sh)" >&2
    return 1
  fi
  return 0
}

lint_handoff_dates() {
  local handoff="${ROOT}/docs/14_SESSION_HANDOFF.md"
  local in_section=0 prev_date="" line_no=0
  while IFS= read -r line; do
    line_no=$((line_no + 1))
    [[ "$line" == "## Recent sessions" ]] && in_section=1 && continue
    [[ $in_section -eq 1 && "$line" =~ ^##\  ]] && break
    [[ $in_section -eq 0 ]] && continue
    if [[ "$line" =~ ^-\ \*\*([0-9]{4}-[0-9]{2}-[0-9]{2})\*\* ]]; then
      local d="${BASH_REMATCH[1]}"
      if [[ -n "$prev_date" && "$d" > "$prev_date" ]]; then
        echo "lint: handoff date-order — $d after $prev_date near line $line_no" >&2
        return 1
      fi
      prev_date="$d"
    fi
  done < "$handoff"
  return 0
}

lint_protected_growth() {
  local bible="${ROOT}/docs/37_GODS_EYE.md"
  if [[ ! -s "$bible" ]]; then
    echo "lint: missing Bible" >&2
    return 1
  fi
  return 0
}

case "$CHECK" in
  snapshot) lint_snapshot || fail=1 ;;
  handoff) lint_handoff_dates || fail=1 ;;
  all)
    lint_protected_growth || fail=1
    lint_snapshot || fail=1
    lint_handoff_dates || fail=1
    ;;
  *)
    echo "Usage: $0 [all|snapshot|handoff]" >&2
    exit 2
    ;;
esac

if [[ $fail -ne 0 ]]; then
  exit 1
fi
echo "gods-eye-lint: OK ($CHECK)"
