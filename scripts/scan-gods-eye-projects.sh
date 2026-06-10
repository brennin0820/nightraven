#!/usr/bin/env bash
# scan-gods-eye-projects.sh — Inventory God's Eye artifacts across registered workspaces.
#
# Usage:
#   ./scripts/scan-gods-eye-projects.sh              # stdout report
#   ./scripts/scan-gods-eye-projects.sh --markdown   # markdown table (for doc refresh)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONF="${ROOT}/scripts/gods-eye-projects.conf"
MODE="${1:-}"

if [[ ! -f "$CONF" ]]; then
  echo "Missing config: $CONF" >&2
  exit 1
fi

ARTIFACTS=(
  "docs/37_GODS_EYE.md"
  "docs/GODS_EYE_UNIFIED_STACK.md"
  "docs/GODS_EYE_GRAND_SPEC.md"
  "docs/GODS_EYE_REPO_OVERLAY.md"
  "docs/GODS_EYE_SESSION_TREE.md"
  "docs/GODS_EYE_IMPROVEMENT_LOOP.md"
  "docs/14_SESSION_HANDOFF.md"
  "docs/02_ENGINEERING_CHANGELOG.md"
  "docs/04_LEARNING_LOG.md"
  "docs/USER_CONTEXT_PROTOCOL.md"
  "docs/HOOKS_SETUP.md"
  "docs/CURSOR_INSTALL.md"
  "AGENTS.md"
  ".cursor/rules/gods-eye-context-intent.mdc"
  ".cursor/gods-eye-improvement-loop.md"
  ".cursor/hooks.json"
)

has_file() {
  local base="$1" rel="$2"
  [[ -f "${base}/${rel}" ]]
}

count_artifacts() {
  local base="$1" n=0
  for a in "${ARTIFACTS[@]}"; do
    has_file "$base" "$a" && n=$((n + 1))
  done
  echo "$n"
}

infer_phase() {
  local base="$1"
  local hooks=0 bible=0 handoff=0 overlay=0
  has_file "$base" ".cursor/hooks.json" && hooks=1
  has_file "$base" "docs/37_GODS_EYE.md" && bible=1
  has_file "$base" "docs/14_SESSION_HANDOFF.md" && handoff=1
  has_file "$base" "docs/GODS_EYE_REPO_OVERLAY.md" && overlay=1

  if [[ $hooks -eq 1 ]]; then
    echo "2"
  elif [[ $bible -eq 1 && $handoff -eq 1 ]]; then
    echo "1+"
  elif [[ $overlay -eq 1 || $handoff -eq 1 ]]; then
    echo "1"
  else
    echo "0"
  fi
}

latest_recent_session() {
  local f="$1/docs/14_SESSION_HANDOFF.md"
  [[ -f "$f" ]] || return 0
  awk '
    /^## Recent sessions/ { in_rs=1; next }
    in_rs && /^## / { exit }
    in_rs && /^- / { print; exit }
  ' "$f" | sed 's/^- //' | cut -c1-120
}

bible_source() {
  local base="$1"
  if has_file "$base" "docs/37_GODS_EYE.md"; then
    echo "vendored"
  elif grep -q "GODS_EYE_ROOT\|Projects/gods-eye" "${base}/.cursor/rules/gods-eye-context-intent.mdc" 2>/dev/null; then
    echo "pointer"
  elif grep -q "Universal_AI_Project_Operating_System" "${base}/docs/GODS_EYE_REPO_OVERLAY.md" 2>/dev/null; then
    echo "UAIPOS pointer"
  else
    echo "unknown"
  fi
}

if [[ "$MODE" == "--markdown" ]]; then
  echo "# God's Eye project scan"
  echo ""
  echo "**Generated:** $(date -u '+%Y-%m-%d %H:%M UTC')"
  echo ""
  echo "| Label | Path | Role | Phase | Bible | Artifacts | Latest Recent session |"
  echo "|-------|------|------|-------|-------|-----------|----------------------|"
fi

while IFS='|' read -r path label role || [[ -n "${path:-}" ]]; do
  [[ -z "${path:-}" || "$path" =~ ^# ]] && continue
  if [[ ! -d "$path" ]]; then
    [[ "$MODE" == "--markdown" ]] && echo "| $label | \`$path\` | $role | — | — | **missing** | — |"
    continue
  fi
  phase="$(infer_phase "$path")"
  bible="$(bible_source "$path")"
  count="$(count_artifacts "$path")"
  recent="$(latest_recent_session "$path")"
  recent="${recent//|/\\|}"

  if [[ "$MODE" == "--markdown" ]]; then
    echo "| **$label** | \`$path\` | $role | $phase | $bible | $count/${#ARTIFACTS[@]} | ${recent:-—} |"
  else
    printf '\n=== %s (%s) ===\n' "$label" "$role"
    printf '  path: %s\n' "$path"
    printf '  phase: %s  bible: %s  artifacts: %s/%s\n' "$phase" "$bible" "$count" "${#ARTIFACTS[@]}"
    for a in "${ARTIFACTS[@]}"; do
      has_file "$path" "$a" && printf '  ✓ %s\n' "$a"
    done
    extra_rules=()
    if [[ -d "$path/.cursor/rules" ]]; then
      for r in "$path/.cursor/rules"/*.mdc; do
        [[ -f "$r" ]] || continue
        [[ "$(basename "$r")" == "gods-eye-context-intent.mdc" ]] && continue
        extra_rules+=("$(basename "$r")")
      done
    fi
    if ((${#extra_rules[@]})); then
      printf '  + domain rules: %s\n' "$(IFS=', '; echo "${extra_rules[*]}")"
    fi
    [[ -n "$recent" ]] && printf '  latest session: %s\n' "$recent"
  fi
done < "$CONF"

# User-global Cursor install
USER_RULE="${HOME}/.cursor/rules/gods-eye-context-intent.mdc"
USER_HOOKS="${HOME}/.cursor/hooks.json"
if [[ "$MODE" == "--markdown" ]]; then
  user_phase="2"
  user_arts=0
  [[ -f "$USER_RULE" ]] && user_arts=$((user_arts + 1))
  [[ -f "$USER_HOOKS" ]] && user_arts=$((user_arts + 1))
  [[ -d "${HOME}/.cursor/hooks/gods-eye" ]] && user_arts=$((user_arts + 1))
  echo "| **Cursor user global** | \`~/.cursor\` | user-global | $user_phase | pointer | $user_arts/3 hooks+rule | Always-on rule when no project rule |"
else
  echo ""
  echo "=== Cursor user global ==="
  echo "  path: ~/.cursor"
  [[ -f "$USER_RULE" ]] && echo "  ✓ rules/gods-eye-context-intent.mdc"
  [[ -f "$USER_HOOKS" ]] && echo "  ✓ hooks.json"
  [[ -d "${HOME}/.cursor/hooks/gods-eye" ]] && echo "  ✓ hooks/gods-eye/"
fi
