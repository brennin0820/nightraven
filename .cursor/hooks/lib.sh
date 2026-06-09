#!/usr/bin/env bash
# Shared helpers for God's Eye Phase 2 hooks (bash only — no jq/node).

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
