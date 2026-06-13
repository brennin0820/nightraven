# NightRaven — Layered Spec Router (standalone repo)

**This file routes.** It does not hold portable laws — authority is split:

| Layer | Path | Holds |
|-------|------|-------|
| **Portable** | **`docs/37_NIGHTRAVEN.md`** (**NightRaven Bible**) | Laws, §2.7–§2.9, **§3 five-step unclear input**, §0 quick start, ladder, Tier C, loop |
| **Stack map** | **`docs/NIGHTRAVEN_UNIFIED_STACK.md`** | L0–L4 integration — Memory Bank → chain, handoff, Mem0/Zep, hooks, Plan Mode |
| **Execution mode** | **`docs/NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md`** | LM Studio (local) vs cloud — agent discipline, model table, LM Studio quickstart |
| **Project inventory** | **`docs/NIGHTRAVEN_PROJECT_INVENTORY.md`** | Cross-repo adoption index — `scripts/scan-nightraven-projects.sh` |
| **Local (your repo)** | `docs/NIGHTRAVEN_REPO_OVERLAY.md` | Product vocabulary, domain disambiguation, boundaries, connected chain |
| **Always-on** | `.cursor/rules/nightraven-context-intent.mdc` | **START HERE** → §0 + overlay |

**Motto:** Always watches. Watch the work. Learn from it. Waste nothing. Forget nothing.

---

## Agent card (canonical)

**Authority:** **NightRaven Bible** (`docs/37_NIGHTRAVEN.md`) **§0 Agent quick start**. Do not duplicate rows elsewhere — protocol and overlay **point here**.

| Question | Answer |
|----------|--------|
| **Which rules apply?** | Match task size — Bible **§2.5**; Tier 0 only for brand-new empty repos |
| **When to code?** | Default **plan/memory** until user says **code it** / **implement** / **build** — Bible **§2.8**; handoff § Domain decisions |
| **App memory scope?** | **This repo only** — handoff, overlay, changelog; never another app's state (Bible §2.6) |

| Phase | Do |
|-------|-----|
| **Before edit** | Classify intent on ladder (memory/wire default); read overlay vocabulary + boundary; **parallel-read** disjoint docs; `git pull` to sync remote |
| **During** | Guard scope, locked behaviors, duplicates; **`+#` only** on memory docs; parallel independent workstreams |
| **After** | Append changelog + handoff **Recent sessions** when meaningful; learning log when new pattern; wire cross-links; **`git push`** before exit |
| **Never** | `-#` on memory docs; new template/scaffold `*.md` per cycle; serial reads by default; conflate user "context" with code `*Context` types unless named |

**Default posture:** **Tier C — Creator-Innovator** (Bible §10). Product/QA win on product boundaries.

---

## Session start (read order)

**Parallel batch** — do not serialize unless one path depends on another:

| # | Read |
|---|------|
| 1 | `.cursor/rules/nightraven-context-intent.mdc` (**START HERE**) |
| 2 | `docs/37_NIGHTRAVEN.md` (**NightRaven Bible**) **§0** |
| 3 | `docs/NIGHTRAVEN_REPO_OVERLAY.md` (if present) |
| 4 | Your domain rules → user context protocol → [`docs/14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) → `AGENTS.md` (when present) |
| 5 | Optional Phase 2: [`docs/HOOKS_SETUP.md`](HOOKS_SETUP.md) + `.cursor/hooks.json` (soft three-touch nudges) |

**Loop:** Bible **§9–§10** direct execution · repo `.cursor/IMPROVEMENT_LOOP_CYCLE_PROMPT.md` (pointer only).

**Execution mode:** Local (LM Studio) = serial only, strict context pruning, no subagents. Cloud = full parallel + subagents + 80% fresh-thread rule — [`docs/NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md`](NIGHTRAVEN_LOCAL_VS_CLOUD_EXECUTION.md).

---

## Examples in this repository

| Path | Purpose |
|------|---------|
| `examples/overlay/NIGHTRAVEN_REPO_OVERLAY.example.md` | Sample local overlay (Swift app vocabulary) |
| `examples/appendix/USER_CONTEXT_PROTOCOL.example.md` | Sample "add context" checklist |

---

*Router for the public NightRaven repository. Portable content lives in the Bible; copy overlay patterns into your own projects.*
