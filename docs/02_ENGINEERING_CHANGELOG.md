# Engineering changelog — God's Eye framework repo

Append-only (`+#`). Corrections use **Supersedes** lines — never delete history.

---

## 2026-06-11

### Touch 3 AFTER — combined God's Eye + NightRaven installer (`276fe5e`)

- +# Shipped [`scripts/install-gods-eye-nightraven.sh`](../scripts/install-gods-eye-nightraven.sh) — wraps `install.sh`, adds NightRaven skill + ledgers + overlay/AGENTS cross-links
- +# Recommendation — stack both on app projects; `install.sh` only for generic repos
- +# Wired [`CURSOR_INSTALL.md`](CURSOR_INSTALL.md) + [`README.md`](../README.md)

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Touch 3 AFTER — hook close (merge-to-one Q&A)

- +# Brent asked what if **NightRaven** and **God's Eye** become only one
- +# Core answered merge types (repo/brand/orchestrator/product), gains/losses, sane shapes (monorepo two boundaries, brand-only, absorption); recommended NightRaven-scoped runtime + portable standard **or** monorepo with `packages/gods-eye` + `apps/ios`
- +# Do not collapse vocabulary layers; **Critical** governance if true product merge
- +# Hook stop — pull OK · no safe dirty · push skipped (not ahead); Q&A only; no code

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`36_PROJECT_ISOLATION.md`](36_PROJECT_ISOLATION.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Touch 3 AFTER — hook close (NightRaven vs God's Eye Q&A)

- +# Brent asked relationship between **NightRaven** and **God's Eye**
- +# Core clarified — God's Eye = memory/oversight **framework repo** (Bible, adoption, `+#` chain); NightRaven = **consumer app** + NightRaven Core orchestration in separate repo (§2.6); three division maps remain vocabulary layers; portable vs NightRaven-scoped taxonomy **TBD** unchanged
- +# Hook stop — pull OK · no safe dirty · push skipped (not ahead); Q&A only; no code

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`36_PROJECT_ISOLATION.md`](36_PROJECT_ISOLATION.md) · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md)

### Touch 3 AFTER — hook close (Q&A division scope + clean tree)

- +# Brent asked whether portable standard vs NightRaven-scoped division maps and background subagent batches are "different versions"
- +# Core clarified — three division maps are **vocabulary layers** (GE proposal · NightRaven runtime · Bible §9 virtual teams), not product forks; portable vs NightRaven-scoped is a **scope slot** (overlay §1 TBD), not a version split; sequential subagent commits are timeline, not competing versions
- +# Hook stop — pull OK · commit skipped (no safe dirty) · push skipped (not ahead); Q&A only; no code

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md)

### Touch 3 AFTER — strategic Q&A recommendations batch (execute all lanes)

- +# **Architect Division** — overlay §1 vocabulary; Bible §9 pointer (gap map, not seventh virtual team); AGENTS Reference wired
- +# **Repeated intentions (continuity engine)** — overlay §1 one-row Tier 1 summary; pointer handoff + Bible §3
- +# **Division taxonomy scope** — overlay §1 marked **TBD** (portable standard vs NightRaven-scoped); no decision for Brent
- +# **Claude adoption kit (#15)** — [`CLAUDE_ADOPTION.md`](CLAUDE_ADOPTION.md); CURSOR_INSTALL + README cross-links
- +# **Composer Brief §4** — refreshed current state (MCP shipped, autosync, pre-coding plan, division taxonomy memory)
- +# **Windows autosync fix** — `lib.ps1` `Invoke-GitSessionCommit` uses `Invoke-GitInRoot` batch add + per-file fallback; quoted path strip in `Get-SafeDirtyFiles`; `HOOKS_SETUP.md` troubleshooting (+#)

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`CLAUDE_ADOPTION.md`](CLAUDE_ADOPTION.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Touch 3 AFTER — strategic Q&A session close (guidance only)

- +# Brent asked what's next for God's Eye — Core answered five priority lanes: #15 Claude adoption kit · Architect Division memory wire · repeated intentions → overlay · autosync Windows hardening · fresh thread at ~80%
- +# Ask mode — guidance only; execution deferred to follow-up agent run (`+#` only)

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`GODS_EYE_COMPOSER_BRIEF.md`](GODS_EYE_COMPOSER_BRIEF.md) §4

### Touch 3 AFTER — hook close (recommendations batch flush)

- +# Hook stop — pull OK · commit skipped (no safe dirty at stop) · push skipped (not ahead)
- +# **Unexpected** — prior background agent left safe-path batch uncommitted: `CLAUDE_ADOPTION.md`, Architect Division (Bible §9 pointer + overlay), repeated intentions overlay, composer brief, `lib.ps1` quoted-path fix, install/README cross-links
- +# On origin already — repeated intentions memory (`a5a9d1f`), autosync bash parity (`7aa4df3`), composer brief base (`cf5b3db`); Touch 3 agent flush commit+push this pass

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`CLAUDE_ADOPTION.md`](CLAUDE_ADOPTION.md) · [`GODS_EYE_COMPOSER_BRIEF.md`](GODS_EYE_COMPOSER_BRIEF.md)

### Touch 3 AFTER — session close (Final Report + autosync push `a5a9d1f`)

- +# Session exit — pre-coding God's Eye Final Report re-delivered; no implementation
- +# Autosync on stop succeeded — pull OK · commit 3 memory files · push `origin/main` (`a5a9d1f`)
- +# **Supersedes** changelog line below re push-skipped — memory batch now on origin

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Touch 3 AFTER — pre-coding orchestration + repeated intentions (memory only)

- +# Session close — pre-coding orchestration protocol applied (correct → intent → domains → divisions → Final Report); **repeated intentions** catalog extracted from handoff + Bible §3 for continuity engine
- +# Plan stored — `.cursor/plans/pre-coding_orchestration_report_830f7a0e.plan.md`; no code; next task awaits ship signal
- +# Autosync hook on stop — pull OK; commit skipped (`git add failed` fail-open); push skipped (not ahead)

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Touch 3 AFTER — division taxonomy plan (memory only)

- +# Brent proposed **11-division** God's Eye structure — Product, Research, Architect, Builder, Design, QA, Security, Auditor, Documentation, DevOps + Core
- +# Gap map documented — NightRaven has 4 runtime divisions; Bible §9 has 6 virtual teams; **Architect Division** is top gap
- +# Phase 0 scope — overlay §1 + Bible §9.x memory wiring only; no code; open question: portable standard vs NightRaven-scoped

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §9 · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md)

### Touch 3 AFTER — session close (division + autosync + settings check)

- +# Consolidated session record — division taxonomy plan, Always Sync PARTIAL verdict (pre-autosync), autosync hooks shipped (`ed7f200`, `7aa4df3`), workspace settings shipped (`4f7d808`)
- +# Handoff guardrails updated — Phase 2 hooks now document real git autosync on session boundaries

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Cursor/VS Code workspace editor settings (`4f7d808`)

- +# **User vs workspace split** — global Cursor user `settings.json` for cross-project prefs; repo `.vscode/settings.json` for God's Eye docs/memory workflow
- +# Workspace choices — `docs/` searchable; `mcp-server` build + secrets excluded; markdown no format-on-save (`+#` law); `.mdc` as markdown; PowerShell default terminal (matches Windows hooks); `git.autofetch` complements hook pull/push
- +# Added `.vscode/settings.json`, `extensions.json`, [`.vscode/README.md`](../.vscode/README.md); `HOOKS_SETUP.md` ↔ workspace settings cross-link

**Cross-links:** [`.vscode/README.md`](../.vscode/README.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Cursor Always Sync autosync hooks

- +# **Always Sync enforcement in hooks** — `session-start.ps1` runs `git pull --ff-only`; `session-stop.ps1` runs pull → safe-path stage/commit → `git push origin HEAD` (fail-open; never force push; no `--no-verify`)
- +# Added `.cursor/hooks/lib.ps1`, `session-start.ps1`, `session-stop.ps1`, `after-file-edit.ps1`; updated bash `lib.sh`, `session-start.sh`, `session-stop.sh`; added `run-hook.sh` Unix dispatcher
- +# Updated `.cursor/hooks.json` — PowerShell commands, 30s/60s timeouts for git network
- +# Safe commit scope: `docs/`, `.cursor/`, templates, examples, scripts, mcp-server, AGENTS.md, README.md; excludes `.env` and secret patterns
- +# Push failure appends defer line to `docs/14_SESSION_HANDOFF.md` Recent sessions (+# only)
- +# `docs/HOOKS_SETUP.md` — Always Sync autosync section, Windows vs Unix paths, troubleshooting

**Cross-links:** [`.cursor/hooks.json`](../.cursor/hooks.json) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)

### Bible §2.9 — Always Sync + Governed Bypass + Local vs Cloud

- +# Added **§2.9** to `37_GODS_EYE.md` as a new portable law section covering Always Sync, Governed Bypass protocol, and Local vs Cloud execution modes
- +# Updated ToC + §0 sixty-second glance table in Bible to reference §2.9
- +# Merged §2.9 laws into `AGENTS.md` Core Laws, Common Mistakes, and Reference
- +# Merged into `GODS_EYE_UNIFIED_STACK.md` §1 cross-layer laws table + §10 Risks + Quick Ref card

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) · [`AGENTS.md`](../AGENTS.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md)

### Composer audit wiring pass (2026-06-11)

- +# `37_GODS_EYE.md` §6 — appended three anti-pattern rows: Forgotten sync, Silent bypass, Local-mode subagents; updated ToC blurb
- +# `GODS_EYE_GRAND_SPEC.md` — added Execution mode row to layer table; `git pull`/`git push` to Before/After agent card rows; Execution mode blurb with link to LOCAL_VS_CLOUD
- +# `GODS_EYE_SESSION_TREE.md` — Always Sync wired into All-tiers law and Record Everything header
- +# `GODS_EYE_IMPROVEMENT_LOOP.md` — Always Sync added to Laws; local vs cloud execution mode paragraph added
- +# `CURSOR_INSTALL.md` — Portable Bible row updated with §2.9 scope; Local vs Cloud clarification (framework-only; consumers get via vendored Bible)
- +# `MCP_SETUP.md` — Mode-agnostic operating rule + LOCAL_VS_CLOUD added to Related
- +# `HOOKS_SETUP.md` — `session-stop.sh` push nudge documented; Always Sync step added to bootstrap checklist; §2.9 citation
- +# `templates/gods-eye-context-intent.user.mdc` — Always Sync, Governed Bypass, Local vs Cloud lines added
- +# `templates/docs/GODS_EYE_REPO_OVERLAY.md` — starter vocabulary rows for four new terms
- +# `docs/04_LEARNING_LOG.md` — Governed Bypass pattern entry
- +# `docs/GODS_EYE_COMPOSER_BRIEF.md` — self-contained Composer onboarding brief created

**Deferred:** `docs/35_FAST_START.md` and `docs/36_PROJECT_ISOLATION.md` are phantom docs (referenced in Bible but not yet created); creation deferred — larger scope.

**Cross-links:** Full wiring pass across `docs/` + `templates/` + AGENTS.md · commit `bb54d80` + `cf5b3db`

### MCP launcher automatic dependency installation

- +# Added automatic dependency installation (`npm install`) and compile build (`npm run build`) logic directly into Node MCP launcher
- +# Updated template (`templates/mcp/run-gods-eye-mcp.js`) and active workspace instance (`.cursor/mcp/run-gods-eye-mcp.js`)

**Cross-links:** [`templates/mcp/run-gods-eye-mcp.js`](../templates/mcp/run-gods-eye-mcp.js) · [`.cursor/mcp/run-gods-eye-mcp.js`](../.cursor/mcp/run-gods-eye-mcp.js) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)

### Design local vs cloud execution modes


- +# Authored local vs cloud execution design spec ([`GODS_EYE_LOCAL_VS_CLOUD.md`](GODS_EYE_LOCAL_VS_CLOUD.md))
- +# Detailed hardware, context window, and concurrency constraints for LM Studio local sessions
- +# Documented parallel subagent loops, long-context continuity, and token-cost discipline for Cloud execution

**Cross-links:** [`GODS_EYE_LOCAL_VS_CLOUD.md`](GODS_EYE_LOCAL_VS_CLOUD.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)

### Always Sync changes workflow


- +# Added **Always Sync** rule to overlay vocabulary (`GODS_EYE_REPO_OVERLAY.md`) and rule files (`gods-eye-context-intent.mdc`)
- +# Configured workflow to run `git pull` followed by git add/commit/push on every change

**Cross-links:** [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### README gap-fill follow-up


- +# Saved follow-up backup branch `backup/pre-gap-fill-20260611-184524` at `2251fdf9a9859b6e8a1bed717eaa298acb018412` before edits
- +# Filled README decision gaps after polish feedback — added **Fit check** and **Normal agent session** sections so new readers can decide when to use God's Eye and see the concrete session loop before install
- +# Scope stayed public README + append-only memory; no law rewrite, no new templates, no implementation files

**Cross-links:** [`README.md`](../README.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Tier C README polish + backup ref

- +# Saved pre-polish backup branch `backup/pre-polish-20260611-184206` at `73fd0b27dd670f485d9f995a8959fda3cec2acc5` before edits
- +# README first-minute polish — added **In 60 seconds** evaluation block, clarified project-work-not-people framing, renamed duplicate **How it works** heading to **Flow**, and tightened quick-start evaluation path
- +# Scope stayed public-copy/entry-path only; no framework-law rewrite, no new templates, no implementation files

**Cross-links:** [`README.md`](../README.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### External candidate shortlist — adjacent "god-tier" coders

- +# Local registry remains limited to `gods-eye`, `UAIPOS`, `NightRaven`, and `~/.cursor`; no new adopters found in-repo
- +# External shortlist for further hunting: memory layers (`Mem0`, `Letta`, `Memori`, `OpenViking`), git-native repo memory (`GitAgent`, `Agents Remember`, `AGENTS.md`), and coding agents (`OpenCode`, `Goose`, `Plandex`, `PR-Agent`)
- +# Use these as comparison points for the research map or future inventory expansion, not as local app memory
- +# NightRaven practical lane narrowed by Brent: **PR-Agent** for PR review automation; **Plandex / Goose** for coding-session execution workflows; defer memory-layer candidates

**Cross-links:** [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md)

## 2026-06-10

### Touch 3 — NightRaven adoption batch session close

- +# Session arc — inventory ship name → app oversight rebrand → repo folder + GitHub rename; gods-eye orchestration only for path/registry (§2.6); app overlay/handoff in NightRaven repo
- +# **Shipped on origin:** `d4d47c5` · `f03a39a` · `53cd9f1` · `b654b68` — noreply author+committer; push-latency §2.8 satisfied
- +# **Open:** NightRaven app memory docs uncommitted locally; Xcode target rename until **code it**

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) §3 · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §12 · [`AGENTS.md`](../AGENTS.md) · [`scripts/gods-eye-projects.conf`](../scripts/gods-eye-projects.conf)

### NightRaven — repo folder + GitHub rename

- +# Brent — rename consumer app repo **BankrollCalendar → NightRaven** — local path `~/Developer/NightRaven`; GitHub `brennin0820/NightRaven` (private); `gods-eye-projects.conf` + inventory §3 + unified stack §12 updated
- +# Xcode target **OneDayMillionaire** unchanged; historical handoff/changelog lines referencing BankrollCalendar kept (`+#` only)

**Cross-links:** [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) §3 · [`scripts/gods-eye-projects.conf`](../scripts/gods-eye-projects.conf)

### NightRaven — app repo local rebrand (orchestration)

- +# Brent — replace active **God'sEye / God's Eye** labels with **NightRaven** in BankrollCalendar agent chain; ship name + local oversight unified under NightRaven
- +# **Not in scope:** gods-eye framework repo rename; Xcode target OneDayMillionaire; framework file paths (`GODS_EYE_*`, `gods-eye-context-intent.mdc`)
- +# Inventory §3 oversight row — NightRaven (was God'sEye in app repo)

**Cross-links:** [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) §3 · NightRaven `docs/GODS_EYE_REPO_OVERLAY.md`

### NightRaven — consumer app ship name (inventory metadata)

- +# Brent updating product identity to **NightRaven** (BankrollCalendar adopter) — NGIA platform naming aligns with ship name; **Xcode target/scheme still OneDayMillionaire** until explicit app-repo rename
- +# Framework repo wired — `scripts/gods-eye-projects.conf` label, `GODS_EYE_PROJECT_INVENTORY.md` summary + §3 vocabulary layers; app overlay/handoff/changelog remain in BankrollCalendar (§2.6)

**Cross-links:** [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §12 · [`scripts/gods-eye-projects.conf`](../scripts/gods-eye-projects.conf) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`AGENTS.md`](../AGENTS.md)

### agent-skills plan — status Q&A session close

- +# Brent @-referenced merge-decision plan; agent verified wire already complete at `2fd264c` (unified stack §2·§6, overlay, `CURSOR_INSTALL.md`, `AGENTS.md`); no new vendor or wire this session — deferred items unchanged (install flag, research-map todos)

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · `.cursor/plans/agent-skills_merge_decision_7be1bdd7.plan.md`

### agent-skills merge evaluation — reject core, optional L4

- +# Brent asked merge [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — 23 lifecycle skills (spec/build/test/review/ship) vs God's Eye oversight stack
- +# Verdict — **reject** git vendor/subtree into gods-eye core; **Adapt (optional L4)** for consumer app repos **after** ship signal (`code it` / `implement` / `build`); GE owns intent + memory (L0–L3), agent-skills owns implementation discipline when shipping
- +# Conflicts documented — agent-skills defaults spec/build-first vs Bible §2.8 intent ladder; `context-engineering` skill vocabulary collision with GE §3; framework bloat vs Phase 1 lean bootstrap
- Plan artifact: `.cursor/plans/agent-skills_merge_decision_7be1bdd7.plan.md`; unified stack §2 row + CURSOR_INSTALL pointer **deferred** until Brent says execute plan
- +# **Supersedes (wire complete):** Plan executed — unified stack §2 **Adapt (optional L4)** row + §6 implementation-skills blurb; `CURSOR_INSTALL.md` optional section (upstream [cursor-setup.md](https://github.com/addyosmani/agent-skills/blob/main/docs/cursor-setup.md), not vendored; no `install.sh --with-engineering-skills` yet); overlay + AGENTS.md Reference cross-links verified

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §2 · §6 · [`CURSOR_INSTALL.md`](CURSOR_INSTALL.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

### GH007 — push blocked by GitHub private-email protection

- +# Diagnosed `git push origin main` rejection — remote **GH007**; unpushed commits `90dea74`, `6a2f405`, `b895162` all author `brentlennin0820@gmail.com` while GitHub **Keep my email private** / block CLI expose is enabled
- +# Remediation documented — (A) [github.com/settings/emails](https://github.com/settings/emails) allow push or public email; (B) rebase amend author to `172115324+brennin0820@users.noreply.github.com`; set `user.email` noreply for future commits
- +# Push-latency §2.8 — still **deferred** until Brent applies A or B (3 commits ahead; MCP `b895162` committed locally)
- +# **Supersedes (push landed):** Push-latency §2.8 — still **deferred** until Brent applies A or B (3 commits ahead; MCP `b895162` committed locally)
- +# **GH007 resolved** — rebase `origin/main..HEAD` with noreply author **and** `GIT_COMMITTER_EMAIL` on amend; pushed `614ff27` · `4bd993a` · `20adc26` to `origin/main`; author-only amend insufficient (committer still exposed Gmail)
- +# Follow-up — `origin/main` clean but `git config user.email` still private Gmail; agents must set noreply on commit (env or repo config) or GH007 returns on next push

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

### NightRaven NGIA — cross-repo R&D orchestration (plan + adopter pilot)

- +# Brent **NightRaven Global Interaction Architecture (NGIA)** — platform-wide editable-component interaction framework; R&D plan authored in gods-eye workspace (`.cursor/plans/nightraven_ngia_r&d_283a8de5.plan.md`)
- +# **Implementation isolated to BankrollCalendar pilot** — `docs/NGIA/` (standards, gap matrix, HIG/Material/Fluent research, architecture, POC doc) + `OneDayMillionaire/NGIA/` (InteractionEngine, EditableContainer, NightRavenPlatformRoot); `EntryListItem` migrated; build + 38 tests pass — **not** gods-eye framework code (§2.6 app memory)
- +# §2.7 defer — NGIA vocabulary stays adopter-local until 2+ apps prove universal; no overlay slot in this repo

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) §2 · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.6 · §2.7 · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

### External research map — God's Eye positioning vs adjacent fields

- +# Online synthesis — no single paper/product matches God's Eye; closest partial overlaps: Intent Engineering, Intent Signal Theory (arXiv:2605.25058), Continuum Memory Architecture (arXiv:2601.09913), STITCH/MemGuide/MemFlow (intent-aware retrieval), RECAP (conversation→goal rewrite), Reflexion/MPR/Memento 2 (reflective compounding), git-native agent memory (AGENTS.md, agentsge, agent-memory)
- +# Distinctive GE stack confirmed: interpretation engine (Bible §3) + compounding loop (§1) + intent ladder + `+#` epistemology + project isolation (§2.6) + git L0 truth — **project-evolution oversight**, not session-only agent memory
- Plan artifact: `.cursor/plans/god's_eye_research_map_b4b6f06f.plan.md`; optional wire to overlay/unified stack §2 deferred
- +# Second-pass validation (continuation thread) — independent web search affirmed composed architecture; expanded citations (Goal-Mem, PRISM, GCC); proposed **GIRMA** (Governed Intent-Reconstruction Memory Architecture); overlay §1 vocabulary wired

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 · §3 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §2 · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

### Phase 2 MCP — memory-chain tools (stdio)

- +# `mcp-server/` — TypeScript stdio MCP: `gods_eye_list_memory_slots`, `gods_eye_get_read_order`, `gods_eye_read_memory`, `gods_eye_search_memory`, `gods_eye_append_recent_session` (+# only on handoff)
- +# `.cursor/mcp.json` + `.cursor/mcp/run-gods-eye-mcp.sh` — Cursor registration; `install.sh` installs per project (`--no-mcp` to skip)
- +# `docs/MCP_SETUP.md` — build, enable, path resolution (`GODS_EYE_PROJECT_ROOT`, `GODS_EYE_INSTALL_ROOT`); git authoritative over any external index
- README layout + `docs/CURSOR_INSTALL.md` MCP verification step wired

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`MCP_SETUP.md`](MCP_SETUP.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §9 Phase 2 · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · `mcp-server/` · `install.sh`

### Update god's eye — lint green + UAIPOS §1/§3 vendor

- +# Handoff **Recent sessions** date-order fixed (#4) — newest-first; `gods-eye-lint handoff` passes
- +# UAIPOS master `docs/37_GODS_EYE.md` — cherry-pick §1 Identity + Continuous learning, §2.8 Task worthiness, §3 five-step / Understand before respond / Interpretation framework from published gods-eye
- Snapshot sync verified; handoff Current state → `0258e44`
- Touch 3 AFTER: global rule refresh via `install.sh --user --force-rule`; lint all green; push deferred (GH007 private-email on origin)

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 · §2.8 · §3 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · `scripts/gods-eye-lint.sh`

## 2026-06-09

### Touch 3 session close — backlog batch on main

- Session exit: `ef017d9` pushed; push-latency §2.8 satisfied; snapshot lint OK; handoff #4 date-order deferred

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8

## 2026-06-09

### BACKLOG #1 #8 #2 #5 — push-latency, canonical scope, snapshot lint

- +# Bible §2.8 **push-latency law** — push before Touch 3 exit or explicit defer in Recent sessions
- +# `GODS_EYE_PROJECT_INVENTORY.md` **Canonical Bible scope (#8)** — published gods-eye canonical; UAIPOS upstream; snapshot not authoritative
- +# `scripts/sync-snapshot.sh` (LOOP step 7) + `scripts/gods-eye-lint.sh` (snapshot drift, handoff date-order heuristic)
- Touch 3 re-enabled — removed `.cursor/touch3.disabled` markers; `session-stop.sh` push reminder
- Loop workspace `README.md` + `LOOP_MODE.md` live-sources / authority pointers updated (outside repo)

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)

## 2026-06-09

### Post-merge audit + safe polish

- Parallel audit: snapshot Bible/overlay/rule match live (680 lines); Bible §0 cherry-picks + §2.6 upstream pointer VERIFIED; hooks + `gods-eye-flow.png` OK
- **Fix:** stale overlay/rule/handoff lines claimed stop hook removed — corrected to marker-only pause (post `e2c4885`)
- README identity paragraph → pointer-only (#11); inventory scan row refreshed

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md)

## 2026-06-09

### Merge prep executed — doctrine batch + hooks/assets (2 commits)

- Shipped uncommitted §1 Identity + Continuous learning & compounding; §3 Understand before respond + Interpretation framework
- Cherry-picked UAIPOS §0: loop cycle types glance row + canonical-card scope paragraph
- +# §2.6 master upstream pointer (UAIPOS §2.7 Upstream); kept published §2.7 promote-to-standard as canonical
- Restored default `stop` hook with `touch3.disabled` pause path; `.gitignore` local marker; README flow diagram at `docs/assets/gods-eye-flow.png`
- Loop workspace snapshot sync (step 7) after push

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §0 · §1 · §2.6 · §3 · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`README.md`](../README.md)

### GE ecosystem benchmark — adopt/adapt/reject map (Q&A)

- Mapped GE-adjacent repos (gods-eye, UAIPOS, BankrollCalendar, Memory Bank variants, hooks/MCP tooling) against unified stack §2 layers
- **Adopt:** git-native memory chain, `+#` only, install.sh, optional hooks, project inventory metadata
- **Adapt:** per-repo overlay, consumer-app §2.8 task-worthiness, loop workspace snapshot (reference-only)
- **Reject:** cross-repo handoff bleed, surveillance framing, template spam per cycle, third canonical Agent card copies
- **Positioning:** confirms **git-native fourth camp** — durable repo memory vs chat-only, vs IDE rules-only, vs external KB SaaS

**Cross-links:** [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §2 · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

## 2026-06-09

### Loop workspace audit — three-Bible drift + backlog prioritization (plan only)

- Read `~/God's Eye/LOOP_MODE.md`, `BACKLOG.md`, `GodsEye-Docs-extracted/` snapshot vs live `gods-eye` chain
- **Finding:** snapshot frozen pre-§2.7/§2.8/§3 doctrine (509 lines); published `gods-eye` Bible 675 lines (471 uncommitted); UAIPOS master 566 lines — §2.7 semantics differ (upstream vs promote-to-standard); loop workspace live-sources table omits published repo
- Prioritized 13 Brent-queued backlog items; suggested cycle order: ship batch → push-latency (#1) → date-order (#4) → single-source (#8) → lint cluster (#5+#2)
- **Blocked on:** Brent canonical-scope decision for #8 before sync/lint/version stamp

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §8 Phase 3 · `~/God's Eye/BACKLOG.md`

## 2026-06-09

### Bible §3 — Interpretation framework (AI answers intention)

- Brent context: interpretation engine — not Input→Response only; reconstruct vision from compressed fragments
- +# §3 **Interpretation framework** — 4 layers, pipeline, continuity, ambiguity resolver, usage protection, auto-prompt builder; links §1 compounding
- Wired rule, overlay, `AGENTS.md`; learning log + handoff

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`AGENTS.md`](../AGENTS.md)

## 2026-06-09

### Bible §3 — Understand before respond (mental model)

- Brent context: understand concept/context/idea before suggestions — learn why not just what
- +# §3 **Understand before respond** — vocabulary table, short commands, GE agent card; default meaning table row
- Wired rule, `AGENTS.md`; learning log + handoff

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`AGENTS.md`](../AGENTS.md)

## 2026-06-09

### Bible §1 — learning doctrine synthesis (+# enrichment)

- Brent refined doctrine prose — compounding intelligence layer, not memory-only storage
- +# §1: beyond storage (memory vs learning system loops), curious-human reflection prompts, "nothing static"; one-liner adds communicate
- Learning log pattern appended

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)

## 2026-06-09

### Touch 3 fix — stacked AFTER passes (§2.8)

- Brent: fix Touch 3 — prior thread stacked multiple AFTER passes for learning-doctrine session (§2.8 anti-pattern)
- Canonical close consolidated in handoff **Recent sessions**; redundant stacked lines marked **Supersedes**
- Learning log pattern appended; one AFTER for this fix pass

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

## 2026-06-09

### Touch 3 AFTER — learning doctrine session close

**Supersedes:** stacked Touch 3 pass — canonical doctrine entry below; handoff consolidated per §2.8.

- Record Everything: handoff **Recent sessions**, changelog, learning log; full chain cross-links verified
- Overlay pointer added for Bible §1 **Continuous learning & compounding**
- 7 files on working tree; `+#` only; uncommitted

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`AGENTS.md`](../AGENTS.md) · [`README.md`](../README.md)

## 2026-06-09

### Bible §1 — Continuous learning & compounding doctrine

- Brent context: God'sEye learns continuously from actions, outcomes, and decisions — memory is mechanism, compounding learning is goal
- Added `37_GODS_EYE.md` §1 **Continuous learning & compounding** — core principle, compounding loop, co-evolution, learning laws
- Wired cross-links: rule, `AGENTS.md`, README; learning log + handoff
- Touch 3 AFTER — `+#` only; uncommitted

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`AGENTS.md`](../AGENTS.md)

## 2026-06-09

### Touch 3 AFTER — GE identity dedup verify

- Verified prior pass: Bible §1 Identity, rule, overlay, `AGENTS.md`, README, changelog, learning log wired
- Marked duplicate learning log GE identity block **Supersedes** (append-only dedup)
- Cross-links intact; push pending

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md)

## 2026-06-09

### Bible §1 — God'sEye identity (collective legendary mastery)

- Brent context: God'sEye identity — embodiment of legendary coders; collective mastery transcending individual identities; symbol of coding excellence
- Added `37_GODS_EYE.md` §1 **Identity** subsection; operational expression → §10 Tier C (no §10 duplication)
- Wired cross-links: rule, `AGENTS.md`, README, overlay; learning log + handoff
- Touch 3 AFTER session close — 8 files on working tree; `+#` only; uncommitted

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`AGENTS.md`](../AGENTS.md)

## 2026-06-09

### Public README — follower-worthy positioning

- Brent: rewrite public pitch for strangers (10-second comprehension); keep Bible/BAIC/Tier C internal
- README hero: tagline *AI agents forget. God's Eye makes your repo remember.*; badges; Before/After; copy-paste starter prompt; flow diagram
- Public motto: *Remember the work. Protect the context. Prevent wasted effort.* — replaces surveillance-sounding front-page copy
- Added `docs/assets/gods-eye-flow.png`; `AGENTS.md` one-line public pitch pointer
- GitHub metadata: description + topics via `gh repo edit`

**Cross-links:** [`README.md`](../README.md) · [`AGENTS.md`](../AGENTS.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

## 2026-06-09

### §2.8 shipped on main (`bfad585`)

- Touch 3 ship record after BankrollCalendar promotion commit
- **Source adopter:** `brennin0820/BankrollCalendar` — `364cd1a` on `feat/onedaymillionaire-ios` (task-worthiness gate + Touch 3 memory chain)
- **Portable:** Bible §2.8, rule Task worthiness, router Agent card, overlay §4, optional delegation template
- **App-local (not promoted):** balance-card vocabulary, shortcuts audit, OneDayMillionaire domain — stay in consumer overlay

**Touch 3 wired:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

## 2026-06-09

### Bible §2.8 — Task worthiness (promoted from BankrollCalendar)

- Brent: sync OneDayMillionaire God's Eye learnings → published standard
- Added `37_GODS_EYE.md` §2.8 — plan until **code it**; one Touch 3 AFTER; fresh thread when heavy; subagents for substantial work only
- §0 glance + Agent quick start mistakes + §3 default-meaning rows + §6 anti-patterns
- Wired rule, template rule, router Agent card, overlay §4 pitfalls, `AGENTS.md`, optional `templates/model-delegation-efficiency.user.mdc`
- Learning log: task-worthiness + monolith PR split pattern

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`GODS_EYE_GRAND_SPEC.md`](GODS_EYE_GRAND_SPEC.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) §4 · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)

## 2026-06-10

### Bible §3 — Unclear messages (honor intent)

- Brent context: when message unclear — rewrite in clear English, infer meaning, list 2–3 interpretations if tied, explain ambiguity; never assume Brent is wrong
- Added `37_GODS_EYE.md` §3 subsection + §0 Before/common mistake/anti-pattern rows; wired rule, `AGENTS.md`, overlay, learning log

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`AGENTS.md`](../AGENTS.md)

### Bible §3 — Unclear coding ideas (clarify before code)

- Brent context: unclear coding idea → rewrite, identify goal/module/concept, likely + 1–2 alternatives, plain-term glossary; no code unless asked (§2.8)
- Added `37_GODS_EYE.md` §3 subsection + anti-pattern; wired rule, `AGENTS.md`, overlay, learning log

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`GODS_EYE_GRAND_SPEC.md`](GODS_EYE_GRAND_SPEC.md)

### Bible §3 — Five-step unclear input (canonical)

- Brent context: (1) fix English (2) understand intent (3) technical translate (4) explain concept (5) ask only if truly unclear; merged prior §3 subsections
- Wired rule, `AGENTS.md`, overlay, learning log, router

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

**Touch 3 wired:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`AGENTS.md`](../AGENTS.md) · [`GODS_EYE_GRAND_SPEC.md`](GODS_EYE_GRAND_SPEC.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Shipped on `main` — `60b26b8`

- Commit: Bible §3 five-step unclear input — fix English, intent, technical translate, explain, ask if truly unclear; no code until ship signal

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`AGENTS.md`](../AGENTS.md)

---

### Bible §2.7 — Promote universal to standard

- Brent context: cross-app docs/code → **published standard**; stop re-instructing "add X" every session
- Added `37_GODS_EYE.md` §2.7, §6 anti-pattern, §3 default-meaning row, §0 glance row
- Wired overlay vocabulary, rule law line, learning log, unified stack adopt/reject, handoff **Recent sessions**

**Cross-links:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.7 · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) §1–2

**Touch 3 wired:** [`GODS_EYE_GRAND_SPEC.md`](GODS_EYE_GRAND_SPEC.md) portable §2.7 note · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)

### §2.7 prose simplified (Tier C pass)

- Condensed Bible §2.7 from multi-table spec to one rule + one table; same law
- Shortened overlay, rule, `AGENTS.md`, learning log, unified stack, handoff guardrail lines

**Touch 3 wired:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.7 · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`GODS_EYE_GRAND_SPEC.md`](GODS_EYE_GRAND_SPEC.md) · [`04_LEARNING_LOG.md`](04_LEARNING_LOG.md)

### Shipped on `main` — `1efbdba`

- Commit: Bible §2.7 cross-app standard law + simplified chain pointers (rule, overlay, `AGENTS.md`, handoff, unified stack)

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.7 · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

### Shipped on `main` — `40a88fe`

- Touch 3 memory: handoff **Recent sessions** + ship note after `1efbdba` push

**Cross-links:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`AGENTS.md`](../AGENTS.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.7

---

### Project inventory — cross-repo God's Eye scan

- Added `docs/GODS_EYE_PROJECT_INVENTORY.md` — gods-eye, UAIPOS, BankrollCalendar, `~/.cursor` metadata (no app-memory bleed)
- Added `scripts/scan-gods-eye-projects.sh` + `scripts/gods-eye-projects.conf` — refreshable artifact/phase report
- Wired `GODS_EYE_UNIFIED_STACK.md` §12, README artifact table + layout

**Cross-links:** [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §12

**Touch 3 wired:** [`GODS_EYE_GRAND_SPEC.md`](GODS_EYE_GRAND_SPEC.md) inventory row · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) §3 · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

---

## 2026-06-09

### Cursor installer — `install.sh` + global `~/.cursor` path

- Added `install.sh` — project bootstrap (rule, vendored Bible, L3 docs, hooks) and `--user` global install
- Added `CURSOR_INSTALL.md` — verification steps (Settings → Rules, Hooks, test session)
- Hooks: `lib.sh` resolves `workspace_roots` + sets `GODS_EYE_PROJECT_ROOT` / `GODS_EYE_ROOT` at `sessionStart`
- Templates under `templates/` for handoff, changelog, learning log, overlay, `AGENTS.md`, user rule, `hooks.user.json`
- Lean `gods-eye-context-intent.mdc` START HERE table (Bible fallback via `GODS_EYE_ROOT`)

**Cross-links:** [`CURSOR_INSTALL.md`](CURSOR_INSTALL.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`README.md`](../README.md)

**Shipped:** `a14ac10` on `main` — Brent user install at `~/.cursor/rules/` + `~/.cursor/hooks/gods-eye/`; BankrollCalendar project install verified.

### Phase 2 — optional Cursor hooks (commits `1c4f1ef`, `4be2992`)

- Added `.cursor/hooks.json` with `sessionStart`, `stop` (`loop_limit: 1`), and `afterFileEdit` hooks
- Added bash scripts under `.cursor/hooks/`: `session-start.sh`, `session-stop.sh`, `after-file-edit.sh`, `lib.sh` (JSON escape without `jq`)
- Added `docs/HOOKS_SETUP.md` — enable/disable, per-hook behavior, soft vs CORE enforcement
- Wired README: artifact table, quick-start step 6, repository layout
- **Fix:** bash 3.2 (macOS) misparses `God's` inside `"$(cat <<EOF …)"` heredocs — use `message+=` concatenation or unquoted heredoc with variable substitution outside the apostrophe token

**Cross-links:** [`HOOKS_SETUP.md`](HOOKS_SETUP.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §8 · [`GODS_EYE_SESSION_TREE.md`](GODS_EYE_SESSION_TREE.md) §3
