#!/usr/bin/env bash
# Bootstrap a new NightRaven consumer project — God's Eye memory + NightRaven Core.
#
# Usage:
#   ./scripts/bootstrap-nightraven-project.sh PROJECT_NAME [TARGET_DIR]
#
# Examples:
#   ./scripts/bootstrap-nightraven-project.sh HimFLer
#   ./scripts/bootstrap-nightraven-project.sh HimFLer /e/NightRaven/HimFLer
#
# Creates TARGET_DIR (default: sibling of framework repo under ../PROJECT_NAME),
# runs install-gods-eye-nightraven.sh, seeds overlay/handoff/README, git init if needed.

set -euo pipefail

GODS_EYE_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PROJECT_NAME="${1:-}"
TARGET="${2:-}"

usage() {
  cat <<EOF
Bootstrap a new NightRaven project (God's Eye + Core)

Usage: $(basename "$0") PROJECT_NAME [TARGET_DIR]

  PROJECT_NAME   Display name (e.g. HimFLer) — used in overlay and README
  TARGET_DIR     Optional absolute path (default: ../PROJECT_NAME next to framework)

Framework: ${GODS_EYE_ROOT}
EOF
}

log() { printf '==> [bootstrap] %s\n' "$*"; }
warn() { printf '!!> [bootstrap] %s\n' "$*" >&2; }

if [[ -z "$PROJECT_NAME" ]]; then
  usage
  exit 1
fi

if [[ -z "$TARGET" ]]; then
  TARGET="$(cd "${GODS_EYE_ROOT}/.." && pwd)/${PROJECT_NAME}"
fi

TARGET="$(mkdir -p "$TARGET" && cd "$TARGET" && pwd)"

if [[ ! -d "${TARGET}/.git" ]]; then
  log "git init → ${TARGET}"
  git -C "$TARGET" init -b main
fi

log "Installing God's Eye + NightRaven Core → ${TARGET}"
"${GODS_EYE_ROOT}/scripts/install-gods-eye-nightraven.sh" --no-mcp "$TARGET"

TODAY="$(date +%Y-%m-%d)"
FRAMEWORK_REF="${GODS_EYE_ROOT}"

# --- Overlay (product boundary + vocabulary) ---
OVERLAY="${TARGET}/docs/GODS_EYE_REPO_OVERLAY.md"
if [[ -f "$OVERLAY" ]]; then
  cat > "$OVERLAY" <<EOF
# God's Eye repo overlay — ${PROJECT_NAME}

**Local layer only.** Portable laws live in **\`docs/37_GODS_EYE.md\`** (vendored or at \`\$GODS_EYE_ROOT\`).

**Router:** \`docs/GODS_EYE_GRAND_SPEC.md\` (if present)

**Default posture:** **Tier C — Creator-Innovator** (Bible §10).

**NightRaven stack:** God's Eye remembers · NightRaven Core orchestrates (\`/nightraven\`). Framework installed from \`${FRAMEWORK_REF}\`.

---

## 1. Vocabulary (this repo)

| Term | Meaning |
|------|---------|
| **${PROJECT_NAME}** | This product / app — ship name and repo folder |
| **God's Eye** | Agent memory chain — handoff, overlay, hooks, Bible (installed) |
| **NightRaven Core** | Orchestration — \`.claude/skills/nightraven/SKILL.md\` |
| **Brent's context** | Agent memory intent — not code \`*Context*\` types unless this app defines them |
| **Always Sync** | Pull before work; commit+push after changes when remote configured (Bible §2.9) |

---

## 2. Product boundary

- **${PROJECT_NAME}** — greenfield project bootstrapped ${TODAY}; product scope TBD with Brent.
- Agents **plan until code it** — memory + wire default; no feature code until Brent says **code it** / **implement** / **build**.
- **This repo only** — no handoff bleed from gods-eye framework repo or other apps (§2.6).

---

## 3. Connected chain (this repo)

| Layer | Path |
|-------|------|
| Rule | \`.cursor/rules/gods-eye-context-intent.mdc\` |
| Bible | \`docs/37_GODS_EYE.md\` |
| Overlay | this file |
| Handoff | \`docs/14_SESSION_HANDOFF.md\` |
| Entry | \`AGENTS.md\` |
| NightRaven Core | \`.claude/skills/nightraven/SKILL.md\` |
| Ledgers | \`docs/ledgers/BUILD_LEDGER.md\` · \`docs/ledgers/AUDIT_LEDGER.md\` |
| Quickstart | \`docs/PROJECT_QUICKSTART.md\` |

EOF
  log "wrote overlay → docs/GODS_EYE_REPO_OVERLAY.md"
fi

# --- Handoff ---
HANDOFF="${TARGET}/docs/14_SESSION_HANDOFF.md"
if [[ -f "$HANDOFF" ]]; then
  cat > "$HANDOFF" <<EOF
# Session handoff — ${PROJECT_NAME}

**Scope:** App memory for **this repository only**. Portable law: \`docs/37_GODS_EYE.md\`.

---

## Current state / focus

**${PROJECT_NAME}** — greenfield NightRaven project bootstrapped ${TODAY} via \`bootstrap-nightraven-project.sh\` from God's Eye framework (\`${FRAMEWORK_REF}\`). Stack: God's Eye memory + NightRaven Core. **Next:** Brent defines product scope · initial codebase · remote when ready.

---

## Already done

- +# **Bootstrap** (${TODAY}) — God's Eye + NightRaven Core installed; overlay · handoff · ledgers · hooks · \`PROJECT_QUICKSTART.md\`

---

## Recent sessions

- **${TODAY}** — Bootstrap: **${PROJECT_NAME}** project created — NightRaven stack ready; say **code it** when product scope is set (\`+#\` only).

---

## Guardrails / locks

- **\`+#\` only** on memory docs — never \`-#\` or collapse **Recent sessions** / **Already done**
- **This repo only** — no cross-repo handoff bleed
- **Plan until code it** — Bible §2.8

EOF
  log "wrote handoff → docs/14_SESSION_HANDOFF.md"
fi

# --- Project quickstart ---
QUICK="${TARGET}/docs/PROJECT_QUICKSTART.md"
cat > "$QUICK" <<EOF
# ${PROJECT_NAME} — project quickstart

Bootstrapped ${TODAY} with **God's Eye** + **NightRaven Core**.

## First session (agent)

1. Parallel-read: rule → \`docs/37_GODS_EYE.md\` §0 → overlay → handoff → \`AGENTS.md\`
2. Ask Brent for product scope if unclear
3. Complex work: \`/nightraven <task>\` after Phase 0 assessment

## First commit (human)

\`\`\`bash
cd "${TARGET}"
git add -A
git commit -m "chore: bootstrap ${PROJECT_NAME} with God's Eye + NightRaven Core"
# git remote add origin <url> && git push -u origin main
\`\`\`

## Framework source

Installed from: \`${FRAMEWORK_REF}\`

Re-run bootstrap (idempotent on missing files only): \`./scripts/bootstrap-nightraven-project.sh ${PROJECT_NAME} "${TARGET}"\`
EOF
log "wrote docs/PROJECT_QUICKSTART.md"

# --- README ---
README="${TARGET}/README.md"
cat > "$README" <<EOF
# ${PROJECT_NAME}

NightRaven consumer project — **God's Eye** memory + **NightRaven Core** orchestration.

| Layer | Purpose |
|-------|---------|
| God's Eye | Durable agent memory (handoff, overlay, hooks) |
| NightRaven Core | \`/nightraven\` adaptive Builder/Auditor orchestration |

**Quickstart:** [docs/PROJECT_QUICKSTART.md](docs/PROJECT_QUICKSTART.md)

Bootstrapped ${TODAY} from [God's Eye / NightRaven platform](${FRAMEWORK_REF}).
EOF
log "wrote README.md"

# --- .gitignore baseline ---
GITIGNORE="${TARGET}/.gitignore"
if [[ ! -f "$GITIGNORE" ]]; then
  cat > "$GITIGNORE" <<'EOF'
.DS_Store
.env
.env.*
node_modules/
dist/
.cursor/touch3.disabled
.cursor/.autosync-session
.cursor/.touch3-cache
EOF
  log "wrote .gitignore"
fi

cat <<EOF

${PROJECT_NAME} is ready at: ${TARGET}

Open in Cursor:
  File → Open Folder → ${TARGET}

First agent message:
  "Read AGENTS.md and handoff, then help me define ${PROJECT_NAME} scope."

Optional: add remote and push when ready.

EOF
