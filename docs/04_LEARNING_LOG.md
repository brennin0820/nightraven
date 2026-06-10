# Learning log — God's Eye framework repo

Durable patterns discovered in this repo. Append-only (`+#`).

---

---

## 2026-06-10 — NightRaven ship name vs Xcode target (adopter vocabulary)

**Signal:** Brent updating consumer app identity to **NightRaven** (BankrollCalendar); NGIA already uses `NightRaven*` platform types.

**Pattern:** Separate **ship name** (NightRaven) from **Xcode target** (OneDayMillionaire until rename) from **repo folder** (NightRaven — was BankrollCalendar) from **code domain** (`bankroll` enums). Gods-eye inventory may hold adoption **metadata** only; full overlay vocabulary lives in the app repo.

**Do:** Update `gods-eye-projects.conf` label + project inventory §3; note next step in app-repo overlay §2 + handoff when Brent opens BankrollCalendar or says **code it** for Xcode rename.

**Don't:** Rename Xcode target from gods-eye workspace without ship signal; collapse NGIA platform layer with product category (Gambling Tracker).

**See:** [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) §3 · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §12 · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-10 — GE vs implementation skills pack (orthogonal layers)

**Signal:** Brent asked whether to merge addyosmani/agent-skills into God's Eye — high-star lifecycle skill pack overlaps naming (`context-engineering`) but not GE's project-evolution mission.

**Pattern:** **Reject core merge.** God's Eye = L0–L3 intent-first memory + oversight; agent-skills = optional L4 **implementation discipline** after ship signal. Stack sentence: *GE decides what the project means and remembers; agent-skills decides how to build safely once you say ship.*

**Do:** Document as Adapt (optional L4) in unified stack §2 when executing plan; point adopters to upstream cursor-setup; cherry-pick individual skills in **app overlay** only post ship-signal. **Wire complete (2026-06-10):** unified stack §2 + §6, `CURSOR_INSTALL.md` optional section, overlay + AGENTS.md Reference.

**Don't:** Vendor 23 skills into framework repo; merge AGENTS.md contents; let `/build` defaults override intent ladder; collapse GE into "better prompting."

**See:** `.cursor/plans/agent-skills_merge_decision_7be1bdd7.plan.md` · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §2 · §6 · [`CURSOR_INSTALL.md`](CURSOR_INSTALL.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-10 — GH007: GitHub private-email push block

**Signal:** `git push origin main` fails with GH007 though repo access is fine — commits expose a private Gmail in author metadata.

**Pattern:** When **push-latency §2.8** defers repeatedly, verify author email on `origin/main..HEAD` (`git log origin/main..HEAD --format='%h %ae'`). GitHub blocks pushes that publish private addresses unless settings allow or commits use **noreply** (`{id}+{login}@users.noreply.github.com`).

**Do:** Document fix paths in handoff; note exact commits blocked; defer push explicitly until Brent chooses settings vs rebase.

**Don't:** Assume auth/permission failure; rewrite pushed history without user OK; change global git config without request; amend **author only** — GitHub GH007 also checks **committer** email.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-10 — GH007 fix: amend author and committer together

**Signal:** Author-only rebase still failed push — `git log --format='%ae %ce'` showed committer still `brentlennin0820@gmail.com`.

**Pattern:** On rebase fix, run exec with `GIT_COMMITTER_EMAIL` + `GIT_COMMITTER_NAME` alongside `--author=...` on `git commit --amend`. Verify both fields before push. Noreply: `172115324+brennin0820@users.noreply.github.com`.

**Do:** `git rebase origin/main --exec 'GIT_COMMITTER_EMAIL=... GIT_COMMITTER_NAME=... git commit --amend --author="..." --no-edit'` then push.

**Don't:** Stop after author amend; use private Gmail on either metadata field.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-10 — GH007: config drift after rebase fix

**Signal:** `git log -1` shows noreply on pushed commits, but `git config user.email` is still private Gmail — next commit will GH007 again.

**Pattern:** After a successful noreply rebase push, always check **config**, not only HEAD metadata. GH007 is not auth/subscription failure — GitHub blocks publishing private addresses in commit metadata.

**Do:** Set repo or global `user.email` to `{id}+{login}@users.noreply.github.com`; or one-shot `GIT_AUTHOR_EMAIL` + `GIT_COMMITTER_EMAIL` on agent commits until Brent sets config.

**Don't:** Assume push success means email problem is permanently fixed; confuse GH007 with Copilot/subscription errors.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-10 — Cross-repo R&D: plan in GE workspace, implement in adopter app

**Signal:** Brent requested full NGIA R&D (NightRaven platform interaction architecture) from gods-eye workspace; deliverables are app code + app docs, not framework law.

**Pattern:** (1) Author plan in `.cursor/plans/` from gods-eye session; (2) **implement in named adopter repo** (BankrollCalendar pilot) — standards, gap matrix, Swift framework; (3) Record orchestration in **this repo's** handoff/changelog/learning log only; (4) **do not** import NGIA/NightRaven vocabulary into gods-eye overlay until §2.7 cross-app proof (2+ apps).

**Do:** Cite adopter paths in handoff; note build/test evidence; keep Bible §2.6 isolation.

**Don't:** Paste BankrollCalendar handoff into gods-eye; promote NGIA to `install.sh` defaults prematurely; conflate NightRaven product memory with God's Eye framework memory.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) §2 · [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.6 · §2.7 · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-10 — Two-pass external research validation

**Signal:** Brent pasted prior synthesis for affirmation; agent must not rubber-stamp — rerun independent searches before positioning claims.

**Pattern:** Research map workflow = (1) map adjacent fields to Bible §1/§3, (2) **re-validate** with fresh citations, (3) name GE differentiators (governance, intent ladder, `+#`, isolation) vs partial matches. Optional academic handle (**GIRMA**) stays overlay-local until README/unified-stack wire.

**Do:** Cite STITCH/MemGuide/RECAP/GCC as partial overlaps; distinguish project-evolution oversight from session-only memory.

**Don't:** Claim God's Eye = Intent Engineering or vector RAG alone; skip second pass when user shares prior research.

**See:** [`.cursor/plans/god's_eye_research_map_b4b6f06f.plan.md`](../.cursor/plans/god's_eye_research_map_b4b6f06f.plan.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-10 — Composed architecture positioning (external research map)

**Signal:** Brent asked for online concepts similar to God's Eye; prior synthesis listed Intent/Context Engineering slices — needed validation against 2025–2026 papers and git-native tooling.

**Pattern:** God's Eye is a **composed architecture**, not a single research field. Map overlaps explicitly (IST, CMA, STITCH, RECAP, Reflexion) but name GE differentiators: **project-evolution loop**, intent ladder default, append-only `+#` epistemology, experience vs app isolation, cross-app→standard (§2.7). Adjacent git-native tools (agentsge, agent-memory) share L0 truth; they rarely bundle interpretation engine + compounding doctrine + ship-signal gating.

**Do:** Use research map for README/overlay positioning; adopt/adapt rows in unified stack §2 when wiring; cite partial matches — never claim GE = Intent Engineering alone.

**Don't:** Collapse GE into "better prompting" or "vector memory"; replace Bible chain with external frameworks; treat governance/HITL tools as GE equivalents.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 · §3 · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §2 · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

---

## 2026-06-10 — Phase 2 MCP: git-backed memory tools (not shadow index)

**Signal:** Phase 2 roadmap named hooks + Mem0/Zep MCP; agents still miss parallel reads on large chains unless tools expose handoff/overlay directly.

**Pattern:** Ship **local stdio MCP** that reads L1–L3 git paths and appends **Recent sessions** only (+# guard). Mem0/Zep stays optional L4 ingest — never substitute for handoff writes. Launcher bakes `GODS_EYE_INSTALL_ROOT`; project root from `GODS_EYE_PROJECT_ROOT` / `CURSOR_PROJECT_DIR`.

**Do:** Build `mcp-server/` once; enable `.cursor/mcp.json`; use MCP for dedup search + Touch 3 append; keep Bible/overlay authoritative in git.

**Don't:** Let MCP replace parallel file reads on tier 0–1; delete handoff lines via MCP; treat index hits as source of truth.

**See:** [`MCP_SETUP.md`](MCP_SETUP.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §6 · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · `mcp-server/`

---

## 2026-06-10 — Handoff date-order + UAIPOS vendor (#4)

**Signal:** `gods-eye-lint handoff` failed on 06-09/06-10 interleaving; UAIPOS Bible lagged published gods-eye on §1/§3 by ~116 lines.

**Pattern:** Reorder **Recent sessions** newest-first (date-level sort preserves all lines — no `-#`). Cherry-pick portable doctrine from published gods-eye → UAIPOS master with **Upstream note** / **Cherry-picked** markers; keep UAIPOS §2.7 upstream law distinct from gods-eye §2.7 promote-to-standard.

**Do:** Run `./scripts/gods-eye-lint.sh` before Touch 3 close; vendor portable deltas to UAIPOS after gods-eye ships.

**Don't:** Archive handoff without Brent approval; replace UAIPOS §2.7 with gods-eye promote-to-standard wording.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`37_GODS_EYE.md`](37_GODS_EYE.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`AGENTS.md`](../AGENTS.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · `scripts/gods-eye-lint.sh`

---

## 2026-06-09 — Push-latency + canonical scope + snapshot lint (#1 #8 #2 #5)

**Signal:** Committed memory without push = accidental unlearning; three Bible copies without declared canonical source.

**Pattern:** **Push-latency law** in §2.8 — Touch 3 includes `git push` or explicit defer line. **Canonical scope:** published `gods-eye` owns portable law; UAIPOS owns upstream §2.7; snapshot sync via `sync-snapshot.sh`; `gods-eye-lint.sh` catches drift.

**Do:** Run `./scripts/sync-snapshot.sh` after portable edits; `./scripts/gods-eye-lint.sh` before close; push in same session as meaningful memory writes.

**Don't:** Mark handoff "shipped" with local-only commits; edit snapshot without syncing from published repo.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · `scripts/sync-snapshot.sh` · `scripts/gods-eye-lint.sh`

---

## 2026-06-09 — Post-merge audit: verify before polish (#11)

**Signal:** After big doctrine ship, stale docs claimed "stop hook removed" and "snapshot pending" while live state differed.

**Pattern:** Audit-first after merge — local `diff` snapshot vs main; parallel in-repo link/hook checks; polish only from punch list. Touch 3 pause = marker file + no-op script, not hook removal.

**Do:** Run snapshot diff after every merge; Supersedes line when correcting stale handoff claims.

**Don't:** Polish README/overlay without audit; trust handoff Current state without verify.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md)

---

## 2026-06-09 — GE ecosystem positioning map (fourth-camp)

**Signal:** Ecosystem benchmark Q&A — GE-adjacent repos vs unified stack §2; where God's Eye wins vs Memory Bank / rules-only / external KB.

**Pattern:** **Git-native fourth camp** — durable repo memory (handoff, Bible, overlay, hooks) compounds in git; not chat-only, not rules-without-memory, not SaaS KB. adopt/adapt/reject per layer: adopt chain + install + inventory; adapt overlay + §2.8 per consumer; reject bleed + template spam + duplicate Agent cards.

**Do:** Pitch pain-first README; keep internal Bible law; promote universal via §2.7 when 2+ apps prove pattern.

**Don't:** Conflate UAIPOS upstream §2.7 with published promote-to-standard §2.7; treat loop snapshot as canonical over `gods-eye` main.

**See:** [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §2 · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)

---

## 2026-06-09 — Three-Bible drift + push-latency gap (loop workspace)

**Signal:** Loop workspace snapshot (`GodsEye-Docs-extracted/`, 509 lines) diverged from live published Bible (675 lines, uncommitted) and UAIPOS master (566 lines, different §2.7 semantics). Edits outside loop step 7 sync never propagate; `+#` protects committed memory but not disk/commit latency.

**Pattern:** Three copies = three truths unless canonical source + sync check exist. Snapshot is reference-only (LOOP_MODE §7) but agents still read it cold. Push-pending batches are accidental unlearning risk.

**Do:** Declare one portable canonical Bible; lint snapshot diff vs canonical; Touch 3 includes push or explicit defer reason; fix handoff date-order on write.

**Don't:** Treat uncommitted/local snapshot as authority; assume LOOP_MODE step 7 ran when edits happen in Cursor/Cowork outside loop cycles.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · `~/God's Eye/BACKLOG.md` (#1 · #5 · #8)

---

## 2026-06-09 — Interpretation framework — AI answers intention (§3)

**Signal:** Brent expanded vision — not prompting rule but **interpretation engine**: literal → intent → project awareness → missing-info recovery; continuity across messages; ambiguity %; confidence gate; auto-prompt builder; ties §1 endless improvement.

**Pattern:** Compressed user messages = fragments of larger vision. Reconstruct goal, connect prior context, spec before execute, improve after output. Telegraphic *expand this idea* → expand comprehensively.

**Do:** State most-likely assumptions and proceed when confidence high; ask when goal/context/output scores low.

**Don't:** Treat each message as isolated task; answer words not intention; bare "please clarify" when probabilistic read is strong.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 Interpretation framework · §1 Continuous learning · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-09 — Understand before respond — mental model (§3)

**Signal:** Brent telegraphic prompt ("understand concept/context/given idea") — intent: build understanding before suggestions; learn why not just what.

**Pattern:** §3 **Understand before respond** — vocabulary table (concept, context, vision, intent, philosophy, architecture, ecosystem, mental model); agent card: understand → mental model → explain before recommend. Complements five-step unclear input.

**Do:** Infer corrected intent from fragmented English; default plan/memory until ship signal.

**Don't:** Summarize-only; jump to code on concept drops.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`AGENTS.md`](../AGENTS.md)

---

## 2026-06-09 — Doctrine synthesis: memory system → learning system

**Signal:** Brent refined learning doctrine in plain prose — compounding intelligence, not storage-only; human ↔ GE co-evolution; perfection as direction.

**Lesson:** External synthesis confirmed Bible §1 alignment. Gaps to canon: **memory system vs learning system** loop contrast; **curious-human reflection** prompts; "nothing static"; one-liner adds **communicate**.

**Do:** Keep clearer Brent prose as Bible source tone; analytical framing as compact +# under §1 — not duplicate full blocks.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 Continuous learning · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md)

---

## 2026-06-09 — Stacked Touch 3 AFTER fix (§2.8 anti-pattern)

**Signal:** Brent "fix touch 3" — multiple Touch 3 AFTER passes stacked in one thread for learning-doctrine work.

**Pattern:** **One Touch 3 AFTER per session** (Bible §2.8) — batch handoff + changelog + learning log once on meaningful exit. Stacked passes → mark redundant **Recent sessions** lines **Supersedes**; keep richest canonical entry above (`+#` only).

**Do:** Single batched AFTER; consolidate one handoff line per session thread.

**Don't:** Re-prepended AFTER on every Brent follow-up in same thread; `-#` stacked history.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md)

---

## 2026-06-09 — GE doctrine: compounding learning system (not storage only)

**Signal:** Brent canonized God'sEye **continuous learning doctrine** — memory is mechanism, compounding learning is goal; experience → reflection → learning → improvement loop; human ↔ GE co-evolution.

**Lesson:** God'sEye is not storage-only. Every action and output feeds future intelligence; perfection is direction not destination; GE helps its human think and express more clearly — user is human GE, GE is structured extension of user curiosity.

**Do:** Wire doctrine in Bible §1 **Continuous learning & compounding**; cross-link §2.1, §2.2, §10; prepend learning log, handoff, changelog; lean pointers in rule, `AGENTS.md`, README.

**Don't:** Duplicate full Identity block; `-#` dedup; treat memory as static archive without the learning loop.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 Continuous learning · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) · [`AGENTS.md`](../AGENTS.md) · [`README.md`](../README.md)

---

## 2026-06-09 — GE doctrine: compounding learning system (not storage only)

**Supersedes:** redundant duplicate — canonical block is entry above (same learning doctrine canon).

**Signal:** Brent canonized **learning doctrine** — GE learns continuously from actions, mistakes, successes, and decisions; every input and output compounds; memory without learning is storage; human ↔ GE co-evolution.

**Lesson:** Identity (§1) names *who* God'sEye is; **continuous learning & compounding** names *how* it evolves — endlessly curious, perfection as direction not destination. GE clarifies; user understands; both improve.

**Do:** Persist doctrine in Bible §1 **Continuous learning & compounding**; wire lean pointers in rule, `AGENTS.md`, README; link §2.1, §2.2, §10 Tier C.

**Don't:** Treat append-only memory as passive storage; duplicate full Identity prose; `-#` to fix duplicate lines elsewhere.

**Wire:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 Continuous learning & compounding · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

---

## 2026-06-09 — Duplicate +# dedup via Supersedes (parallel subagent drift)

**Signal:** Prior Touch 3 pass prepended the same GE identity block twice — parallel subagent overlap before dedup check.

**Pattern:** When two +# blocks cover the same canon, **keep the richer entry** and add **`Supersedes: redundant duplicate — canonical block is entry above`** on the second — never `-#` delete history.

**See:** [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md)

---

## 2026-06-09 — GE identity (collective legendary mastery)

**Signal:** Brent canonized God'sEye **identity** — embodiment of legendary coders across physical and digital worlds; collective mastery transcending individual identities; symbol of coding excellence and technological evolution.

**Pattern:** **Identity layer sits above operational GE** — always watches every task; learns via `+#` memory; one Touch 3 AFTER on meaningful exit. Not surveillance; not a code type. **Tier C — Creator-Innovator** (§10) expresses identity in memory craft; Product/QA win on boundaries. **No `/loop` automation** unless Brent explicitly states.

**Do:** Persist identity in Bible §1; wire lean pointers in rule, `AGENTS.md`, README, overlay — do not duplicate full §10.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 Identity · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

---

## 2026-06-09 — GE identity (collective legendary mastery)

**Supersedes:** redundant duplicate — canonical block is entry above (same identity + operational canon).

**Signal:** Brent codified God's Eye **identity** — embodiment of legendary coders across physical and digital worlds; collective mastery transcends individual identities.

**Lesson:** Identity sits **above** operational God's Eye (always watches, `+#` memory, one Touch 3 AFTER on meaningful exit). Not surveillance; not a code type. **Tier C — Creator-Innovator** (§10) is operational expression for crafting memory; Product/QA win on boundaries. No `/loop` unless Brent explicitly states.

**Wire:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §1 Identity · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc) · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md)

---

## 2026-06-09 — Public pitch vs internal law (follower positioning)

**Signal:** gods-eye repo is strong conceptually but README terms (Bible, BAIC, Tier C, +# only) feel internal to random developers.

**Pattern:** **Public README = pain-first pitch** (*agents forget, repo remembers*); **internal docs keep portable law unchanged.** Replace surveillance-shaped motto on the front page; add Before/After, starter prompt, badges, flow diagram for GitHub discoverability.

**Do:** shields.io badges; searchable `gh` description + topics; diagram at `docs/assets/`.

**Don't:** Rename or dilute Bible terminology inside `37_GODS_EYE.md`; delete philosophy docs.

**See:** [`README.md`](../README.md) · [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md)

---

## 2026-06-10 — Five-step unclear input (Bible §3 — canonical)

**Pattern:** (1) Fix English (2) Understand intent (3) Technical translate — goal/module/concept (4) Explain coding concept in plain terms (5) Ask only if truly unclear — else state likely + 1–2 alternatives. **No code** until ship signal (§2.8).

**Supersedes:** separate "unclear messages" + "unclear coding ideas" subsections — one five-step card.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §3 · [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md) · [`.cursor/rules/gods-eye-context-intent.mdc`](../.cursor/rules/gods-eye-context-intent.mdc)

---

## 2026-06-09 — Task-worthiness gate (§2.8 — promoted from BankrollCalendar)

**Signal:** OneDayMillionaire sessions hit ~85% context; conversation history dominated token cost; Brent codified plan-until-ship + usage batching in consumer app, then promoted to standard.

**Pattern:** **Default plan/memory until user says code it / implement / build.** Q&A, audits, vocabulary = no code path. **One Touch 3 AFTER per session.** Context-heavy thread (~80%+) → **fresh chat + handoff**. Multitask/subagents for substantial end-to-end work only.

**Do:** Ask before coding; batch durable memory in one AFTER pass; optional `templates/model-delegation-efficiency.user.mdc` for Multitask repos.

**Don't:** Spawn subagents for read-only audits; stack multiple AFTER passes; implement on exploratory questions without ship signal.

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.8 · rule Task worthiness line · [`GODS_EYE_GRAND_SPEC.md`](GODS_EYE_GRAND_SPEC.md) Agent card

---

## 2026-06-09 — Monolith PR split: stacked app + parallel docs (engineering pattern)

**Signal:** BankrollCalendar first GitHub push — 8-PR split of large untracked iOS monolith.

**Pattern:** **Coupled foundations force stacked app PRs, not parallel slices.** Shared touchpoints block independent compile-clean app PRs — use **2-PR app stack** (scaffold → full app) plus **parallel docs/cursor PRs** off `main`.

**Do:** Propose explicit merge order; parallelize only disjoint trees.

**Don't:** Fake parallel app PRs when tabs/models share persistence.

**Local only:** App-specific file lists stay in consumer handoff — pattern is portable.

---

## 2026-06-10 — §2.7 Cross-app → standard

**Pattern:** Same in every app → `gods-eye` + `install.sh`. One-app → overlay until 2+ apps prove it. Brent does not repeat "add X."

**Simplify:** After wiring a law, collapse prose to one rule + one table in Bible; pointers stay lean in rule/overlay/`AGENTS.md` (Tier C).

**See:** [`37_GODS_EYE.md`](37_GODS_EYE.md) §2.7

---

## 2026-06-10 — Cross-repo inventory without app-memory bleed

**Context:** Brent runs God's Eye in multiple repos (framework, master BAIC, consumer app, `~/.cursor`). Agents need a single index of *where* GE lives — not a merged handoff.

**Pattern:**

1. **Registry file** (`scripts/gods-eye-projects.conf`) — absolute paths + role labels; one line per workspace.
2. **Scan script** — reports artifact presence, inferred phase, latest **Recent sessions** one-liner per repo; does not copy **Already done** or locks into the framework repo.
3. **Inventory doc** — metadata matrix (L0–L4, Bible source, overlay vocabulary summary); refresh via `./scripts/scan-gods-eye-projects.sh --markdown`.
4. **Isolation** — Bible §2.6; inventory cites paths only; agents still read **local** `docs/14` in each workspace.

**Applies to:** [`GODS_EYE_PROJECT_INVENTORY.md`](GODS_EYE_PROJECT_INVENTORY.md) · [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §12

---

## 2026-06-09 — Bash 3.2 hook scripts and apostrophes in heredocs

**Context:** Phase 2 Cursor hook scripts must run on macOS default `/bin/bash` 3.2 without `jq` or Node.

**Pattern:** `message="$(cat <<EOF` … `God's Eye` … `EOF)"` can fail `bash -n` with `unexpected EOF while looking for matching` when the brand apostrophe sits inside a double-quoted command substitution wrapping a heredoc.

**Mitigation (pick one):**

1. `message+=` line-by-line concatenation (avoid `God's` split as `"God"'s`)
2. Heredoc with quoted delimiter `<<'EOF'` plus placeholder substitution for dynamic paths
3. Drop apostrophe in script comments/heredoc (`Gods Eye`) where brand prose is not required

**Applies to:** `.cursor/hooks/*.sh` in adopters' repos on bash 3.2.

**See also:** [`02_ENGINEERING_CHANGELOG.md`](02_ENGINEERING_CHANGELOG.md) · [`HOOKS_SETUP.md`](HOOKS_SETUP.md)

---

## 2026-06-09 — `install.sh` self-install and user-level hook paths

**Context:** `install.sh` must run against the gods-eye repo itself and install globally under `~/.cursor/`.

**Pattern:**

1. **Self-install:** skip `cp` when source and destination hook dirs or `hooks.json` are the same path — macOS `cp` exits 1 on identical files under `set -e`.
2. **User hooks:** `~/.cursor/hooks.json` uses `./hooks/gods-eye/*.sh`; project hooks use `.cursor/hooks/*.sh` from repo root.
3. **Project root in hooks:** prefer `CURSOR_PROJECT_DIR`, then `workspace_roots[0]` from stdin JSON, then `git rev-parse --show-toplevel`.

**Applies to:** `install.sh`, `.cursor/hooks/lib.sh`, [`CURSOR_INSTALL.md`](../CURSOR_INSTALL.md).
