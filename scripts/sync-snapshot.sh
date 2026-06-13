#!/usr/bin/env bash
# sync-snapshot.sh — Copy published nightraven chain files to loop workspace snapshot (LOOP step 7).
#
# Usage:
#   ./scripts/sync-snapshot.sh              # sync + verify diff clean
#   ./scripts/sync-snapshot.sh --check-only # exit 1 if snapshot diverges (for lint/CI)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NIGHTRAVEN_ROOT="${NIGHTRAVEN_ROOT:-$ROOT}"
SNAPSHOT="${NIGHTRAVEN_SNAPSHOT:-"${HOME}/NightRaven/NightRaven-Docs-extracted"}"
MODE="${1:-}"

SYNC_FILES=(
  "docs/37_NIGHTRAVEN.md"
  "docs/NIGHTRAVEN_REPO_OVERLAY.md"
  ".cursor/rules/nightraven-context-intent.mdc"
)

if [[ ! -d "$SNAPSHOT" ]]; then
  if [[ "$MODE" == "--check-only" && "${NIGHTRAVEN_SNAPSHOT_REQUIRED:-0}" != "1" ]]; then
    echo "Snapshot check skipped (directory missing): $SNAPSHOT"
    echo "Set NIGHTRAVEN_SNAPSHOT or NIGHTRAVEN_SNAPSHOT_REQUIRED=1 to enforce this check."
    exit 0
  fi
  echo "Snapshot directory missing: $SNAPSHOT" >&2
  exit 1
fi

fail=0
for rel in "${SYNC_FILES[@]}"; do
  src="${NIGHTRAVEN_ROOT}/${rel}"
  dest="${SNAPSHOT}/${rel##*/}"
  case "$rel" in
    docs/37_NIGHTRAVEN.md) dest="${SNAPSHOT}/37_NIGHTRAVEN.md" ;;
    docs/NIGHTRAVEN_REPO_OVERLAY.md) dest="${SNAPSHOT}/NIGHTRAVEN_REPO_OVERLAY.md" ;;
    .cursor/rules/*) dest="${SNAPSHOT}/nightraven-context-intent.mdc" ;;
  esac
  if [[ ! -f "$src" ]]; then
    echo "MISSING source: $src" >&2
    fail=1
    continue
  fi
  if [[ "$MODE" == "--check-only" ]]; then
    if [[ ! -f "$dest" ]]; then
      echo "MISSING snapshot file: $rel (expected at $dest)"
      fail=1
      continue
    fi
    if ! diff -q "$src" "$dest" >/dev/null 2>&1; then
      echo "DRIFT: $rel (source vs snapshot)"
      fail=1
    fi
  else
    cp "$src" "$dest"
    if ! diff -q "$src" "$dest" >/dev/null; then
      echo "VERIFY FAIL after copy: $rel" >&2
      fail=1
    else
      echo "OK: $rel → $(basename "$dest")"
    fi
  fi
done

if [[ $fail -ne 0 ]]; then
  exit 1
fi
if [[ "$MODE" == "--check-only" ]]; then
  echo "Snapshot check passed."
else
  echo "Snapshot sync passed."
fi
