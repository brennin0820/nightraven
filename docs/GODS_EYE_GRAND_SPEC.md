# God's Eye — Layered Spec Router (standalone repo)

**This file routes.** It does not hold portable laws — authority is split:

| Layer | Path | Holds |
|-------|------|-------|
| **Portable** | **`docs/37_GODS_EYE.md`** (**God's Eye Bible**) | Laws, **§2.7 cross-app → standard**, §0 quick start, ladder, Tier C, loop |
| **Stack map** | **`docs/GODS_EYE_UNIFIED_STACK.md`** | L0–L4 integration — Memory Bank → chain, handoff, Mem0/Zep, hooks, Plan Mode |
| **Project inventory** | **`docs/GODS_EYE_PROJECT_INVENTORY.md`** | Cross-repo adoption index — `scripts/scan-gods-eye-projects.sh` |
| **Local (your repo)** | `docs/GODS_EYE_REPO_OVERLAY.md` | Product vocabulary, domain disambiguation, boundaries, connected chain |
| **Always-on** | `.cursor/rules/gods-eye-context-intent.mdc` | **START HERE** → §0 + overlay |

**Motto:** Always watches. Watch the work. Learn from it. Waste nothing. Forget nothing.

---

## Agent card (canonical)

**Authority:** **God's Eye Bible** (`docs/37_GODS_EYE.md`) **§0 Agent quick start**. Do not duplicate rows elsewhere — protocol and overlay **point here**.

| Question | Answer |
|----------|--------|
| **Which rules apply?** | Match task size — Bible **§2.5**; Tier 0 only for brand-new empty repos |
| **App memory scope?** | **This repo only** — handoff, overlay, changelog; never another app's state (Bible §2.6) |

| Phase | Do |
|-------|-----|
| **Before edit** | Classify intent on ladder (memory/wire default); read overlay vocabulary + boundary; **parallel-read** disjoint docs |
| **During** | Guard scope, locked behaviors, duplicates; **`+#` only** on memory docs; parallel independent workstreams |
| **After** | Append changelog + handoff **Recent sessions** when meaningful; learning log when new pattern; wire cross-links |
| **Never** | `-#` on memory docs; new template/scaffold `*.md` per cycle; serial reads by default; conflate user "context" with code `*Context` types unless named |

**Default posture:** **Tier C — Creator-Innovator** (Bible §10). Product/QA win on product boundaries.

---

## Session start (read order)

**Parallel batch** — do not serialize unless one path depends on another:

| # | Read |
|---|------|
| 1 | `.cursor/rules/gods-eye-context-intent.mdc` (**START HERE**) |
| 2 | `docs/37_GODS_EYE.md` (**God's Eye Bible**) **§0** |
| 3 | `docs/GODS_EYE_REPO_OVERLAY.md` (if present) |
| 4 | Your domain rules → user context protocol → [`docs/14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) → `AGENTS.md` (when present) |
| 5 | Optional Phase 2: [`docs/HOOKS_SETUP.md`](HOOKS_SETUP.md) + `.cursor/hooks.json` (soft three-touch nudges) |

**Loop:** Bible **§9–§10** direct execution · repo `.cursor/gods-eye-improvement-loop.md` (pointer only).

---

## Examples in this repository

| Path | Purpose |
|------|---------|
| `examples/overlay/GODS_EYE_REPO_OVERLAY.example.md` | Sample local overlay (Swift app vocabulary) |
| `examples/appendix/USER_CONTEXT_PROTOCOL.example.md` | Sample "add context" checklist |

---

*Router for the public God's Eye repository. Portable content lives in the Bible; copy overlay patterns into your own projects.*
