# God's Eye — Composer Brief

**What this document is:** A self-contained briefing for a **Cursor Composer** (or any fresh agent session) to immediately understand the God's Eye framework, its current state, and what to analyze or contribute to.

**Scope:** Framework repo only — `gods-eye` (`brennin0820/gods-eye`). No other app's memory belongs here.

---

## 1. What God's Eye Is (30-second version)

God's Eye is an **AI agent memory framework** built into your git repo. It gives every agent session durable, append-only memory so work is never lost and agents never start from scratch.

| Core idea | One sentence |
|-----------|-------------|
| **Memory** | Every agent session reads a chain of markdown docs before touching code |
| **Learning** | Every session appends what was done — `+#` only, never delete |
| **Compounding** | Each session builds on all prior sessions — no repeat work |
| **Portable** | The laws live in one Bible (`37_GODS_EYE_BIBLE.md`) and can be vendored into any repo |

**It is NOT:** user surveillance, a runtime library, or a code framework. It is **documentation + discipline**.

---

## 2. Core Laws (every session, no exceptions)

| Law | Rule |
|-----|------|
| **`+#` only** | Append to memory docs — never delete headings, bullets, or history |
| **Always watches** | Read the chain before every session; guard scope; append outcomes |
| **Always learn** | Every session adds to the learning log; use **Supersedes** for corrections |
| **Always parallel** | Batch-read disjoint docs simultaneously; one writer per file |
| **Always sync** | `git pull` before work; `git push` after every commit |
| **This repo only** | Never import another app's handoff, locks, or paths |
| **Tier C leads** | Default posture = craft, coherence, elegance — not volume |
| **Cross-app → standard** | Universal patterns get promoted to published defaults (§2.7) |
| **Plan until ship signal** | No code unless user says `code it` / `implement` / `build` |
| **Governed bypass** | Any rule may be bypassed — but only with explicit Brent approval first |
| **Local vs cloud** | LM Studio = serial + strict context pruning; cloud = full parallel + subagents |

---

## 3. File Map — What Lives Where

### Core (required reading for any agent)

| File | Purpose | Read when |
|------|---------|-----------|
| `.cursor/rules/nightraven-context-intent.mdc` | Always-on rule; loaded by Cursor automatically | Every session |
| `docs/37_GODS_EYE_BIBLE.md` | The Bible — portable laws, §0–§10 | Tier 2+ or when a law is unclear |
| `docs/GODS_EYE_REPO_OVERLAY.md` | Local vocabulary, pitfalls, connected chain | Every session on bootstrapped repo |
| `docs/14_SESSION_HANDOFF.md` | Current state, Already done, Recent sessions | Every session |
| `AGENTS.md` | Agent conventions, read order, core laws, common mistakes | Fresh agent startup |

### Architecture docs (read when relevant)

| File | Purpose |
|------|---------|
| `docs/GODS_EYE_UNIFIED_STACK.md` | L0–L4 layer map; Memory Bank mapping; phased roadmap |
| `docs/GODS_EYE_LAYERED_SPEC_ROUTER.md` | Session router — points to canonical docs by task type |
| `docs/GODS_EYE_LOCAL_VS_CLOUD_EXECUTION.md` | LM Studio vs cloud execution modes; model table; LM Studio quickstart |
| `docs/GODS_EYE_SESSION_SPEC_TREES.md` | Three-touch session structure (Before / During / After) |
| `docs/GODS_EYE_IMPROVEMENT_LOOP_CYCLE_PROMPT.md` | `/loop` improvement cycle; six virtual teams; one `+#` step per cycle |
| `docs/MCP_SETUP.md` | Phase 2 MCP server setup; `gods_eye_search_memory`, `gods_eye_append_recent_session` |
| `docs/HOOKS_SETUP.md` | Phase 2 Cursor hooks (soft gates, session reminders) |
| `docs/CURSOR_INSTALL.md` | Install God's Eye into a new repo |

### Memory chain docs (append-only, protected)

| File | Purpose |
|------|---------|
| `docs/02_ENGINEERING_CHANGELOG.md` | Chronological engineering history — `+#` only |
| `docs/04_LEARNING_LOG.md` | Patterns, pitfalls, and discoveries — `+#` only |
| `docs/14_SESSION_HANDOFF.md` | Current state + session log — `+#` only |

### Infrastructure

| File / Dir | Purpose |
|-----------|---------|
| `mcp-server/` | TypeScript MCP server — `gods_eye_read_memory`, `gods_eye_search_memory`, `gods_eye_append_recent_session` |
| `.cursor/mcp/run-memory-chain-mcp.js` | Node launcher — auto-detects missing builds and triggers `npm install && npm run build` |
| `.cursor/rules/nightraven-context-intent.mdc` | Always-on Cursor rule (alwaysApply: true) |
| `.cursor/mcp.json` | MCP server registration for Cursor |
| `install.sh` | Bootstraps God's Eye into a consumer repo |
| `scripts/` | Linting, project scanning, and utility scripts |
| `templates/` | Starter files for new consumer repos |

---

## 4. Current State (as of 2026-06-11)

**Phase:** Phase 2 complete on `origin/main` — **MCP memory-chain tools** shipped · **Always Sync autosync hooks** (PowerShell + bash) · **pre-coding orchestration** plan (`.cursor/plans/pre-coding_orchestration_report_830f7a0e.plan.md`) · **division taxonomy** memory wired (Architect Division · repeated intentions · scope TBD).

**Recently shipped:**
- Phase 2 MCP — `mcp-server/`, `.cursor/mcp.json`, [`MCP_SETUP.md`](MCP_SETUP.md)
- Always Sync autosync — session-start pull · session-stop safe-path commit/push · [`HOOKS_SETUP.md`](HOOKS_SETUP.md)
- Pre-coding orchestration — 14 recurring intention tiers cataloged for continuity engine
- Division taxonomy Phase 0 — overlay §1 **Architect Division** · **Repeated intentions** · **Division taxonomy scope (TBD)**
- Claude adoption kit (#15) — [`CLAUDE_ADOPTION.md`](CLAUDE_ADOPTION.md)
- Windows autosync hardening — `lib.ps1` git add via `Invoke-GitInRoot` + per-file fallback

**Consumer app:** NightRaven (`brennin0820/NightRaven`) — formerly BankrollCalendar. Xcode target still OneDayMillionaire.

**Next milestone:** Division taxonomy scope decision (portable standard vs NightRaven-scoped) — Brent TBD · fresh thread at ~80% context per §2.8.

---

## 5. Intent Ladder — How to Read Brent's Requests

When Brent "adds context," apply this **before opening any implementation file**:

```
Memory + wire  →  UI/copy  →  Code/feature
     ↑ default unless Brent clearly asks for lower layers
```

| Layer | When | Action |
|-------|------|--------|
| **Memory** | Default | Which vocabulary slot? Persist labels and boundaries |
| **Wire** | "make context connected" | Cross-link rule ↔ overlay ↔ AGENTS ↔ handoff |
| **UI/copy** | Names screen, label, onboarding | User-facing copy only |
| **Code** | Says `code it` / `implement` / `build` | Models, services, features |

**Unclear input? Use §3 five steps:**
1. Fix English (spelling, grammar)
2. Understand intent (what is the goal?)
3. Technical translate (which module, file, concept?)
4. Explain in plain terms (restate before acting)
5. Ask only if genuinely unclear after all four steps

---

## 6. Session Protocol — Three-Touch

Every meaningful session has three phases:

| Phase | What to do |
|-------|-----------|
| **Touch 1 — Before** | Read chain; classify tier; check intent ladder; dedup |
| **Touch 2 — During** | Guard scope; `+#` only on memory docs; parallel workstreams |
| **Touch 3 — After** | Append handoff Recent sessions; changelog (Tier 2+); learning log (new patterns); push |

**Always sync:** `git pull` → work → commit → `git push`. Every time.

---

## 7. What Composer Should Analyze

Here are the gaps and open questions for Composer to review and contribute to:

### 7a. Structural gaps to check

- [ ] **`docs/35_FAST_START.md`** — Does it reference the new §2.9 (Always Sync, Governed Bypass, Local vs Cloud)? If not, add a one-line pointer.
- [ ] **`docs/36_PROJECT_ISOLATION.md`** — Does it mention the Always Sync requirement as it relates to isolation (stale state = invisible bleed)? Worth wiring.
- [ ] **`install.sh`** — Does it bootstrap `docs/GODS_EYE_LOCAL_VS_CLOUD_EXECUTION.md` into consumer repos, or is it framework-only? Clarify in `CURSOR_INSTALL.md`.
- [ ] **`templates/`** — Are any starter templates missing a pointer to `GODS_EYE_LOCAL_VS_CLOUD_EXECUTION.md` or §2.9?
- [ ] **`docs/GODS_EYE_IMPROVEMENT_LOOP_CYCLE_PROMPT.md`** — Does the loop template note local vs cloud discipline for `/loop` sessions?
- [ ] **`docs/GODS_EYE_SESSION_SPEC_TREES.md`** — Does the After phase mention the Always Sync push requirement explicitly?

### 7b. Content quality check

- [ ] **`docs/37_GODS_EYE_BIBLE.md` §6 Anti-patterns** — Are the new pitfalls (Forgotten sync, Silent bypass, Local-mode subagents) in the full anti-patterns index?
- [ ] **`docs/GODS_EYE_LAYERED_SPEC_ROUTER.md`** — Does the router point to `GODS_EYE_LOCAL_VS_CLOUD_EXECUTION.md` for execution mode decisions?
- [ ] **`docs/04_LEARNING_LOG.md`** — Are the Always Sync + Governed Bypass + Local vs Cloud patterns logged as learned patterns?
- [ ] **`docs/02_ENGINEERING_CHANGELOG.md`** — Is this session's work (§2.9 addition, merge batch) logged?

### 7c. Cross-link audit

- [ ] Every mention of `GODS_EYE_LOCAL_VS_CLOUD_EXECUTION.md` should be a relative link, not just a filename mention.
- [ ] `docs/MCP_SETUP.md` — Does it mention that MCP works identically in local and cloud mode?
- [ ] `docs/HOOKS_SETUP.md` — Are Always Sync hooks documented (e.g., a hook that nudges push on session stop)?

---

## 8. Laws for Composer

Composer must follow all God's Eye laws when contributing to this repo:

1. **`+#` only** — Never delete headings or history from memory docs (`docs/02`, `docs/04`, `docs/14`)
2. **Always sync** — `git pull` before reading files; `git push` after committing
3. **This repo only** — Do not paste content from other repos' handoffs or changelogs
4. **Parallel reads** — Batch-read disjoint docs; do not serial-hop one file at a time
5. **No templates** — Do not create new `templates/` files; add `+#` to existing chain docs
6. **Governed bypass** — If a rule needs to be broken, state it and ask before acting
7. **Plan until ship signal** — Analyze and propose; wait for "code it" / "implement" / "build" before making edits

---

## 9. Quick Reference

| Need | Go to |
|------|-------|
| Full laws | `docs/37_GODS_EYE_BIBLE.md` §0–§2.9 |
| Current work state | `docs/14_SESSION_HANDOFF.md` |
| Local vs cloud rules | `docs/GODS_EYE_LOCAL_VS_CLOUD_EXECUTION.md` §4 |
| How to install GE | `docs/CURSOR_INSTALL.md` |
| Claude Code adoption | `docs/CLAUDE_ADOPTION.md` |
| MCP tools | `docs/MCP_SETUP.md` |
| Improvement loop | `docs/GODS_EYE_IMPROVEMENT_LOOP_CYCLE_PROMPT.md` |
| Project inventory | `docs/GODS_EYE_PROJECT_INVENTORY.md` |
| Vocabulary | `docs/GODS_EYE_REPO_OVERLAY.md` §1 |

**Git remote:** `https://github.com/brennin0820/gods-eye`
**Branch:** `main`
**Always sync:** `git pull origin main` before work · `git push origin main` after commit

---

*This document is designed to be read cold by a Composer or fresh agent session. It does not replace the Bible — it routes to it. For durable memory law, read `docs/37_GODS_EYE_BIBLE.md`. For current state, read `docs/14_SESSION_HANDOFF.md`.*
