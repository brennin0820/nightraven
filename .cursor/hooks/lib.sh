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

# --- Always Sync (git autosync; fail-open) ---

gods_eye_is_git_repo() {
  local project_root="$1"
  [[ -d "${project_root}/.git" ]]
}

gods_eye_is_secret_path() {
  local path="${1//\\//}"
  case "$path" in
    .env|.env.*|*/.env|*/.env.*|credentials.json|*/credentials.json|\
    *.pem|*/secrets/*|secrets/*|*/id_rsa|*/id_rsa.*|*/.npmrc|auth.json|*/auth.json)
      return 0 ;;
  esac
  return 1
}

gods_eye_is_safe_autosync_path() {
  local path="${1//\\//}"
  if gods_eye_is_secret_path "$path"; then
    return 1
  fi
  case "$path" in
    docs/*|.cursor/*|templates/*|examples/*|scripts/*|mcp-server/*|\
    AGENTS.md|README.md|CHANGELOG.md|LICENSE|install.sh)
      return 0 ;;
  esac
  return 1
}

gods_eye_git_pull_ff_only() {
  local project_root="$1"
  if ! gods_eye_is_git_repo "$project_root"; then
    printf '%s' "Autosync pull skipped — not a git repository."
    return 0
  fi
  local output
  if output="$(git -C "${project_root}" pull --ff-only 2>&1)"; then
    local summary
    summary="$(printf '%s\n' "$output" | tail -n 3 | tr '\n' ' ')"
    [[ -z "$summary" ]] && summary="Already up to date."
    printf 'Autosync pull: %s' "$summary"
  else
    local detail
    detail="$(printf '%s\n' "$output" | tail -n 2 | tr '\n' ' ')"
    printf 'Autosync pull failed (fail-open): %s' "$detail"
  fi
}

gods_eye_git_session_commit() {
  local project_root="$1"
  local safe_files=() line path
  if ! gods_eye_is_git_repo "$project_root"; then
    printf '%s' "Autosync commit skipped — not a git repository."
    return 0
  fi
  while IFS= read -r line; do
    [[ -z "$line" ]] && continue
    path="${line:3}"
    path="${path# }"
    if [[ "$path" == *" -> "* ]]; then
      path="${path##* -> }"
    fi
    path="${path//\\//}"
    if gods_eye_is_safe_autosync_path "$path"; then
      safe_files+=("$path")
    fi
  done < <(git -C "${project_root}" status --porcelain 2>/dev/null || true)

  if [[ ${#safe_files[@]} -eq 0 ]]; then
    printf '%s' "Autosync commit skipped — no safe tracked changes (docs/.cursor/AGENTS/README or secret paths excluded)."
    return 0
  fi

  if ! git -C "${project_root}" add -- "${safe_files[@]}" 2>/dev/null; then
    printf '%s' "Autosync commit skipped — git add failed."
    return 0
  fi
  if git -C "${project_root}" diff --cached --quiet 2>/dev/null; then
    printf '%s' "Autosync commit skipped — nothing staged after safe-path filter."
    return 0
  fi
  if git -C "${project_root}" commit -m "chore(sync): session autosync [cursor hook]" 2>/dev/null; then
    printf 'Autosync commit: chore(sync): session autosync [cursor hook] (%s file(s)).' "${#safe_files[@]}"
  else
    printf '%s' "Autosync commit failed (fail-open)."
  fi
}

gods_eye_git_push_if_ahead() {
  local project_root="$1"
  local branch upstream ahead output
  if ! gods_eye_is_git_repo "$project_root"; then
    printf '%s' "Autosync push skipped — not a git repository."
    return 0
  fi
  branch="$(git -C "${project_root}" rev-parse --abbrev-ref HEAD 2>/dev/null || true)"
  [[ -z "$branch" ]] && { printf '%s' "Autosync push skipped — could not resolve branch."; return 0; }
  upstream="origin/${branch}"
  if ! git -C "${project_root}" rev-parse --verify "${upstream}" >/dev/null 2>&1; then
    printf 'Autosync push skipped — no upstream %s.' "$upstream"
    return 0
  fi
  ahead="$(git -C "${project_root}" rev-list --count "${upstream}..HEAD" 2>/dev/null || echo 0)"
  if [[ "${ahead}" -le 0 ]]; then
    printf 'Autosync push skipped — not ahead of %s.' "$upstream"
    return 0
  fi
  if output="$(git -C "${project_root}" push origin HEAD 2>&1)"; then
    printf 'Autosync push: origin/%s (%s commit(s)).' "$branch" "$ahead"
  else
    local detail
    detail="$(printf '%s\n' "$output" | tail -n 2 | tr '\n' ' ')"
    printf 'Autosync push failed (fail-open): %s' "$detail"
  fi
}

gods_eye_append_push_defer() {
  local project_root="$1"
  local reason="$2"
  local handoff="${project_root}/docs/14_SESSION_HANDOFF.md"
  local today line tmp
  [[ -f "$handoff" ]] || return 0
  today="$(date +%Y-%m-%d)"
  line="- **${today}** — Autosync push deferred [cursor hook]: ${reason}"
  if grep -q '## Recent sessions' "$handoff" 2>/dev/null; then
    tmp="${handoff}.autosync.tmp"
    awk -v insert="$line" '
      /^## Recent sessions/ { print; print insert; next }
      { print }
    ' "$handoff" > "$tmp" && mv "$tmp" "$handoff"
  fi
}
