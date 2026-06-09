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
  local context="$1"
  local escaped
  escaped=$(escape_for_json "$context")
  printf '{\n  "additional_context": "%s"\n}\n' "$escaped"
}

emit_followup_message() {
  local message="$1"
  local escaped
  escaped=$(escape_for_json "$message")
  printf '{\n  "followup_message": "%s"\n}\n' "$escaped"
}

is_memory_doc_path() {
  local path="$1"
  case "$path" in
    docs/* | */docs/* | AGENTS.md | */AGENTS.md | .cursor/rules/* | */.cursor/rules/*)
      return 0
      ;;
    *)
      return 1
      ;;
  esac
}
