#!/usr/bin/env bash
# Shared helpers for God's Eye Phase 2 hooks (bash only — no jq/node).

# Canonical portable Bible clone (set at install time via env or default path).
GODS_EYE_INSTALL_ROOT="${GODS_EYE_INSTALL_ROOT:-${HOME}/Projects/gods-eye}"

escape_for_json() {
  local s="$1"
  s="${s//\\/\\\\}"
  s="${s//\"/\\\"}"
  s="${s//$'\n'/\\n}"
  s="${s//$'\r'/\\r}"
  s="${s//$'\t'/\\t}"
  printf '%s' "$s"
}

emit_additional_context() {
  local message="$1"
  local escaped
  escaped="$(escape_for_json "$message")"
  printf '{\n  "additional_context": "%s"\n}\n' "$escaped"
}

emit_followup_message() {
  local message="$1"
  local escaped
  escaped="$(escape_for_json "$message")"
  printf '{\n  "followup_message": "%s"\n}\n' "$escaped"
}

emit_session_start() {
  local message="$1"
  local gods_eye_root="$2"
  local msg_escaped root_escaped
  msg_escaped="$(escape_for_json "$message")"
  root_escaped="$(escape_for_json "$gods_eye_root")"
  printf '{\n  "env": { "GODS_EYE_ROOT": "%s" },\n  "additional_context": "%s"\n}\n' \
    "$root_escaped" "$msg_escaped"
}

# Best-effort JSON field extraction without jq.
json_field() {
  local json="$1"
  local field="$2"
  printf '%s' "$json" | sed -n "s/.*\"${field}\"[[:space:]]*:[[:space:]]*\"\\([^\"]*\\)\".*/\\1/p" | head -1
}

json_number_field() {
  local json="$1"
  local field="$2"
  printf '%s' "$json" | sed -n "s/.*\"${field}\"[[:space:]]*:[[:space:]]*\\([0-9][0-9]*\\).*/\\1/p" | head -1
}

# First workspace root from stdin JSON (fallback when CURSOR_PROJECT_DIR is unset).
json_workspace_root() {
  local json="$1"
  printf '%s' "$json" | sed -n 's/.*"workspace_roots"[[:space:]]*:[[:space:]]*\[[[:space:]]*"\([^"]*\)".*/\1/p' | head -1
}

gods_eye_project_root() {
  local input="${1:-}"
  if [[ -n "${CURSOR_PROJECT_DIR:-}" && -d "${CURSOR_PROJECT_DIR}" ]]; then
    printf '%s' "${CURSOR_PROJECT_DIR}"
    return 0
  fi
  if [[ -n "${CLAUDE_PROJECT_DIR:-}" && -d "${CLAUDE_PROJECT_DIR}" ]]; then
    printf '%s' "${CLAUDE_PROJECT_DIR}"
    return 0
  fi
  local ws
  ws="$(json_workspace_root "$input")"
  if [[ -n "$ws" && -d "$ws" ]]; then
    printf '%s' "$ws"
    return 0
  fi
  if root="$(git rev-parse --show-toplevel 2>/dev/null)"; then
    printf '%s' "$root"
    return 0
  fi
  printf '%s' "${PWD}"
}

gods_eye_resolve_root() {
  local project_root="$1"
  if [[ -f "${project_root}/docs/37_GODS_EYE.md" ]]; then
    printf '%s' "${project_root}"
    return 0
  fi
  if [[ -n "${GODS_EYE_ROOT:-}" && -f "${GODS_EYE_ROOT}/docs/37_GODS_EYE.md" ]]; then
    printf '%s' "${GODS_EYE_ROOT}"
    return 0
  fi
  if [[ -f "${GODS_EYE_INSTALL_ROOT}/docs/37_GODS_EYE.md" ]]; then
    printf '%s' "${GODS_EYE_INSTALL_ROOT}"
    return 0
  fi
  printf '%s' "${GODS_EYE_INSTALL_ROOT}"
}

gods_eye_rel_path() {
  local project_root="$1"
  local rel="$2"
  if [[ -f "${project_root}/${rel}" ]]; then
    printf '%s' "${rel}"
  else
    printf '%s' "(${rel} — create when bootstrapped)"
  fi
}

# Touch 3 pause: marker file or env (GODS_EYE_TOUCH3=0 / GODS_EYE_TOUCH3_DISABLED=1).
gods_eye_touch3_disabled() {
  case "${GODS_EYE_TOUCH3:-}" in
    0|off|OFF|false|FALSE|no|NO) return 0 ;;
  esac
  case "${GODS_EYE_TOUCH3_DISABLED:-}" in
    1|true|TRUE|yes|YES) return 0 ;;
  esac
  local marker
  for marker in \
    "${HOME}/.cursor/touch3.disabled" \
    "${GODS_EYE_ROOT:-}/.cursor/touch3.disabled" \
    "${GODS_EYE_INSTALL_ROOT}/.cursor/touch3.disabled"; do
    if [[ -f "$marker" ]]; then
      return 0
    fi
  done
  local project_root="${1:-}"
  if [[ -n "$project_root" && -f "${project_root}/.cursor/touch3.disabled" ]]; then
    return 0
  fi
  return 1
}
