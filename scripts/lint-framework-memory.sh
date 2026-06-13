#!/usr/bin/env bash
# lint-framework-memory.sh — Soft/opt-in NightRaven chain checks (BACKLOG #5, unified stack Phase 3).
#
# Usage:
#   ./scripts/lint-framework-memory.sh           # all checks
#   ./scripts/lint-framework-memory.sh snapshot  # snapshot drift only
#   ./scripts/lint-framework-memory.sh handoff   # Recent sessions date-order heuristic

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
  local in_section=0 prev_date="" line_no=0 found_recent_sessions_header=0 found_date_entry=0
  while IFS= read -r line; do
    line_no=$((line_no + 1))
    if [[ "$line" == "## Recent sessions" ]]; then
      in_section=1
      found_recent_sessions_header=1
      continue
    fi
    [[ $in_section -eq 1 && "$line" =~ ^##\  ]] && break
    [[ $in_section -eq 0 ]] && continue
    if [[ "$line" =~ ^-\ \*\*([0-9]{4}-[0-9]{2}-[0-9]{2})\*\* ]]; then
      local d="${BASH_REMATCH[1]}"
      found_date_entry=1
      if [[ -n "$prev_date" && "$d" > "$prev_date" ]]; then
        echo "lint: handoff date-order — $d after $prev_date near line $line_no" >&2
        return 1
      fi
      prev_date="$d"
    fi
  done < "$handoff"
  if [[ $found_recent_sessions_header -eq 0 ]]; then
    echo 'lint: handoff missing "## Recent sessions" section' >&2
    return 1
  fi
  if [[ $found_date_entry -eq 0 ]]; then
    echo "lint: handoff has no dated Recent sessions entries" >&2
    return 1
  fi
  return 0
}

lint_protected_growth() {
  local bible="${ROOT}/docs/37_NIGHTRAVEN.md"
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
echo "lint-framework-memory: OK ($CHECK)"
