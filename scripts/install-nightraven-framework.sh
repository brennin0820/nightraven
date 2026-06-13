#!/usr/bin/env bash
# Install NightRaven (memory chain) + NightRaven Core (orchestration) into a project.
#
# Usage:
#   ./scripts/install-nightraven-framework.sh [INSTALL.SH OPTIONS] TARGET_DIR
#
# Examples:
#   ./scripts/install-nightraven-framework.sh ~/Developer/NightRaven
#   ./scripts/install-nightraven-framework.sh --user --no-mcp ~/Projects/my-app
#
# Recommendation: NightRaven = durable memory (handoff, hooks, Bible).
# NightRaven Core = adaptive orchestration (Builder/Auditor, ledgers, /nightraven).
# Keep both layers; do not collapse repos or memory chains.

set -euo pipefail

NIGHTRAVEN_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INSTALL_ARGS=()
TARGET=""

usage() {
  cat <<EOF
NightRaven + NightRaven Core — combined project installer

Usage: $(basename "$0") [INSTALL.SH OPTIONS] TARGET_DIR

Runs install.sh, then adds:
  • .claude/skills/nightraven/SKILL.md  — NightRaven Core orchestration
  • docs/ledgers/BUILD_LEDGER.md        — Builder append-only log
  • docs/ledgers/AUDIT_LEDGER.md        — Auditor append-only log
  • Overlay + AGENTS.md cross-links       — when missing (+# append only)

Passes all options through to install.sh (--user, --no-hooks, --no-mcp, …).

Examples:
  $0 ~/Developer/NightRaven
  $0 --user ~/Projects/my-app

Framework root: ${NIGHTRAVEN_ROOT}
See: docs/CURSOR_INSTALL.md · docs/CLAUDE_ADOPTION.md
EOF
}

log() { printf '==> [nightraven+nightraven] %s\n' "$*"; }
warn() { printf '!!> [nightraven+nightraven] %s\n' "$*" >&2; }

append_if_missing() {
  local file="$1" marker="$2" content="$3"
  if [[ ! -f "$file" ]]; then
    warn "skip append (missing): $file"
    return 0
  fi
  if grep -qF "$marker" "$file" 2>/dev/null; then
    warn "already present (skip): $marker in ${file##*/}"
    return 0
  fi
  printf '\n%s\n' "$content" >> "$file"
  log "appended: $marker → ${file##*/}"
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      while [[ $# -gt 0 ]]; do
        if [[ -z "$TARGET" && "$1" != -* ]]; then
          TARGET="$1"
        else
          INSTALL_ARGS+=("$1")
        fi
        shift
      done
      break
      ;;
    *)
      if [[ "$1" == -* ]]; then
        INSTALL_ARGS+=("$1")
      elif [[ -z "$TARGET" ]]; then
        TARGET="$1"
      else
        warn "unexpected argument: $1"
        usage
        exit 1
      fi
      shift
      ;;
  esac
done

if [[ -z "$TARGET" ]]; then
  TARGET="."
fi

TARGET="$(cd "$TARGET" && pwd)"

log "Running NightRaven install → ${TARGET}"
"${NIGHTRAVEN_ROOT}/install.sh" "${INSTALL_ARGS[@]}" "$TARGET"

log "Installing NightRaven Core skill"
mkdir -p "${TARGET}/.claude/skills/nightraven"
cp "${NIGHTRAVEN_ROOT}/.claude/skills/nightraven/SKILL.md" \
  "${TARGET}/.claude/skills/nightraven/SKILL.md"

log "Installing NightRaven ledgers (append-only)"
mkdir -p "${TARGET}/docs/ledgers"
for ledger in BUILD_LEDGER.md AUDIT_LEDGER.md; do
  dest="${TARGET}/docs/ledgers/${ledger}"
  if [[ -f "$dest" ]]; then
    warn "exists (skip): docs/ledgers/${ledger}"
  else
    cp "${NIGHTRAVEN_ROOT}/docs/ledgers/${ledger}" "$dest"
    log "created: docs/ledgers/${ledger}"
  fi
done

OVERLAY="${TARGET}/docs/NIGHTRAVEN_REPO_OVERLAY.md"
append_if_missing "$OVERLAY" "**NightRaven Core**" "$(cat <<'OVERLAY_BLOCK'

---

## NightRaven stack (NightRaven + Core)

| Term | Meaning |
|------|---------|
| **NightRaven** | Portable agent memory — Bible, handoff, hooks, +# chain (this install) |
| **NightRaven Core** | Adaptive orchestration — `.claude/skills/nightraven/SKILL.md`; invoke with `/nightraven <task>` |
| **Stack rule** | NightRaven remembers; NightRaven Core coordinates execution. Do not collapse memory chains. |
OVERLAY_BLOCK
)"

AGENTS="${TARGET}/AGENTS.md"
append_if_missing "$AGENTS" "NightRaven Core" "$(cat <<'AGENTS_BLOCK'

## NightRaven Core (optional orchestration)

- **Skill:** `.claude/skills/nightraven/SKILL.md` — adaptive Builder/Auditor orchestration
- **Ledgers:** `docs/ledgers/BUILD_LEDGER.md` · `docs/ledgers/AUDIT_LEDGER.md` (append-only)
- **When:** Complex or multi-step work — run Phase 0 Task Assessment before mutating files
- **Law:** NightRaven memory chain still authoritative; NightRaven Core does not replace handoff or Bible §2.8 ship signal
AGENTS_BLOCK
)"

cat <<EOF

NightRaven + NightRaven Core install complete: ${TARGET}

Verify:
  • NightRaven: Cursor Settings → Rules + Hooks (see docs/CURSOR_INSTALL.md)
  • NightRaven: .claude/skills/nightraven/SKILL.md present
  • Ledgers: docs/ledgers/BUILD_LEDGER.md + AUDIT_LEDGER.md

First session:
  1. Edit docs/NIGHTRAVEN_REPO_OVERLAY.md — product boundary + local vocabulary
  2. Fill docs/14_SESSION_HANDOFF.md — Current state / Already done
  3. Agent chat: "Read AGENTS.md and handoff, then /nightraven <your task>"

EOF
