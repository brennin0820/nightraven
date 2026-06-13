#!/usr/bin/env bash
# lmstudio-division-improve.sh — Serial division improvement via LM Studio (OpenAI-compatible API).
#
# Usage:
#   ./scripts/lmstudio-division-improve.sh --list
#   ./scripts/lmstudio-division-improve.sh --dry-run --division all
#   ./scripts/lmstudio-division-improve.sh --division planner
#   ./scripts/lmstudio-division-improve.sh --division all --model qwen2.5-coder-32b-instruct
#
# Requires: LM Studio local server (default http://localhost:1234/v1), curl, python3.
# Local law: one division at a time — no parallel calls (VRAM + NightRaven local mode).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE_URL="${NIGHTRAVEN_LMSTUDIO_URL:-http://localhost:1234/v1}"
MODEL=""
DIVISION="all"
DRY_RUN=0
OUT_DIR="${ROOT}/docs/lmstudio-reviews"
MAX_SKILL_CHARS=12000

usage() {
  sed -n '2,12p' "$0" | sed 's/^# \?//'
  echo
  echo "Options:"
  echo "  --division NAME   planner|researcher|architect|builder|auditor|greenfield|"
  echo "                    planning|research|design|all  (default: all)"
  echo "  --model ID        LM Studio model id (default: first model from /v1/models)"
  echo "  --base-url URL    OpenAI-compatible base (default: \$NIGHTRAVEN_LMSTUDIO_URL or localhost:1234/v1)"
  echo "  --out-dir PATH    Review output directory (default: docs/lmstudio-reviews)"
  echo "  --dry-run         Print plan only; no API calls"
  echo "  --list            List division keys"
  echo "  -h, --help        This help"
}

skill_path() {
  case "$1" in
    planner)    echo "${ROOT}/.claude/skills/divisions/planner/SKILL.md" ;;
    researcher) echo "${ROOT}/.claude/skills/divisions/researcher/SKILL.md" ;;
    architect)  echo "${ROOT}/.claude/skills/divisions/architect/SKILL.md" ;;
    builder)    echo "${ROOT}/.claude/skills/divisions/builder/SKILL.md" ;;
    auditor)    echo "${ROOT}/.claude/skills/divisions/auditor/SKILL.md" ;;
    greenfield) echo "${ROOT}/.claude/skills/divisions/greenfield/SKILL.md" ;;
    planning|research|design) echo "${ROOT}/.claude/skills/nightraven/SKILL.md" ;;
    *) return 1 ;;
  esac
}

division_gap() {
  case "$1" in
    planner)    echo "Foundation layout + DAG; human gate before phase 1." ;;
    researcher) echo "Needs web — local LM cannot call web_search; improve offline PRD checklist instead." ;;
    architect)  echo "ADRs + MoSCoW; align with ArchitectAgent.ts." ;;
    builder)    echo "TS agent not implemented; tool belt dormant." ;;
    auditor)    echo "ReviewAgent coverage gate inverted; no cycle detection in DAG." ;;
    greenfield) echo "Meta parallel 0–2 — run serial under LM Studio, not parallel." ;;
    planning)   echo "Runtime read-only plan division in nightraven/SKILL.md." ;;
    research)   echo "Runtime web division — defer live hunt to cloud; improve local read-only rubric." ;;
    design)     echo "Runtime UX read-only pass before Builder on UI work." ;;
    *) echo "See docs/DIVISION_REGISTRY.md known gaps." ;;
  esac
}

division_focus() {
  case "$1" in
    planning)  echo "Focus on ### Planning Division section only." ;;
    research)  echo "Focus on ### Research Division section only." ;;
    design)    echo "Focus on ### Design Division section only." ;;
    *)         echo "Focus on the full SKILL.md for this division." ;;
  esac
}

ALL_DIVISIONS=(planner researcher architect builder auditor greenfield planning research design)

while [[ $# -gt 0 ]]; do
  case "$1" in
    --division) DIVISION="${2:?}"; shift 2 ;;
    --model) MODEL="${2:?}"; shift 2 ;;
    --base-url) BASE_URL="${2:?}"; shift 2 ;;
    --out-dir) OUT_DIR="${2:?}"; shift 2 ;;
    --dry-run) DRY_RUN=1; shift ;;
    --list)
      printf '%s\n' "${ALL_DIVISIONS[@]}"
      exit 0
      ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage >&2; exit 2 ;;
  esac
done

resolve_model() {
  if [[ -n "$MODEL" ]]; then
    printf '%s' "$MODEL"
    return 0
  fi
  local models_json
  models_json="$(curl -sf "${BASE_URL}/models" 2>/dev/null)" || {
    echo "error: LM Studio not reachable at ${BASE_URL} — start Local Server in LM Studio." >&2
    exit 1
  }
  python3 -c "
import json, sys
data = json.load(sys.stdin)
ids = [m.get('id') for m in data.get('data', []) if m.get('id')]
if not ids:
    sys.exit('error: no models loaded in LM Studio')
print(ids[0])
" <<< "$models_json"
}

run_division() {
  local key="$1"
  local skill gap focus model_id out_file skill_snippet resp skill_tmp
  skill="$(skill_path "$key")" || { echo "skip: unknown division $key" >&2; return 1; }
  [[ -f "$skill" ]] || { echo "skip: missing $skill" >&2; return 1; }

  gap="$(division_gap "$key")"
  focus="$(division_focus "$key")"
  skill_snippet="$(head -c "$MAX_SKILL_CHARS" "$skill")"

  if [[ "$DRY_RUN" -eq 1 ]]; then
    echo "[dry-run] division=$key skill=${skill#${ROOT}/}"
    echo "  gap: $gap"
    echo "  focus: $focus"
    return 0
  fi

  mkdir -p "$OUT_DIR"
  out_file="${OUT_DIR}/${key}-$(date +%Y%m%d-%H%M%S).md"
  model_id="${MODEL:-$(resolve_model)}"

  echo "→ improving division: $key (model: $model_id)"

  skill_tmp="$(mktemp "${TMPDIR:-/tmp}/nr-lmstudio-skill.XXXXXX")"
  printf '%s' "$skill_snippet" > "$skill_tmp"
  export SKILL_TMP="$skill_tmp"
  trap 'rm -f "$skill_tmp"' RETURN

  resp="$(python3 <<PY
import json, os, pathlib, urllib.request

base = os.environ["BASE_URL"]
model = os.environ["MODEL_ID"]
key = os.environ["DIV_KEY"]
gap = os.environ["DIV_GAP"]
focus = os.environ["DIV_FOCUS"]
body = pathlib.Path(os.environ["SKILL_TMP"]).read_text(encoding="utf-8", errors="replace")

system = """You improve NightRaven agent divisions for LOCAL LM Studio execution.
Rules: serial only, small context, no subagents, no web unless user runs cloud later.
Output markdown only. Do not invent file paths outside the repo.
Sections required:
## Summary (one paragraph)
## Top 3 SKILL improvements (concrete, section-targeted)
## Tool belt / local constraint
## Recommended local model size (7B / 16B / 32B / 70B) and why
## Defer to cloud (what not to run locally)
## Next safest step (one line for Brent)"""

user = f"""Division: {key}
Known gap: {gap}
{focus}

SKILL content (truncated if long):
---
{body}
---"""

payload = {
    "model": model,
    "messages": [
        {"role": "system", "content": system},
        {"role": "user", "content": user},
    ],
    "temperature": 0.3,
    "max_tokens": 2048,
}

req = urllib.request.Request(
    f"{base.rstrip('/')}/chat/completions",
    data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json"},
    method="POST",
)
with urllib.request.urlopen(req, timeout=600) as r:
    data = json.load(r)

content = data["choices"][0]["message"]["content"]
print(content)
PY
)"

  {
    echo "# LM Studio division review — ${key}"
    echo
    echo "- **Date:** $(date -u +%Y-%m-%dT%H:%M:%SZ)"
    echo "- **Model:** ${model_id}"
    echo "- **Division:** ${key}"
    echo "- **Skill:** \`${skill#${ROOT}/}\`"
    echo
    echo "---"
    echo
    printf '%s\n' "$resp"
  } > "$out_file"

  echo "  wrote: ${out_file#${ROOT}/}"
}

export BASE_URL
targets=()
if [[ "$DIVISION" == "all" ]]; then
  targets=("${ALL_DIVISIONS[@]}")
else
  targets=("$DIVISION")
fi

if [[ "$DRY_RUN" -eq 0 ]]; then
  MODEL="$(resolve_model)"
  export MODEL_ID="$MODEL"
else
  export MODEL_ID="(dry-run)"
fi

for d in "${targets[@]}"; do
  export DIV_KEY="$d"
  export DIV_GAP="$(division_gap "$d")"
  export DIV_FOCUS="$(division_focus "$d")"
  run_division "$d" || true
  unset DIV_KEY DIV_GAP DIV_FOCUS
  [[ "$DRY_RUN" -eq 1 ]] || sleep 1
done

if [[ "$DRY_RUN" -eq 1 ]]; then
  echo "Dry-run complete. ${#targets[@]} division(s) planned."
else
  echo "Done. Reviews under: ${OUT_DIR#${ROOT}/}"
fi
