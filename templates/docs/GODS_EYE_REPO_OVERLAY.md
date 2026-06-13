# God's Eye repo overlay — local layer

**Local layer only.** Portable laws live in **`docs/37_GODS_EYE_BIBLE.md`** (vendored or at `$GODS_EYE_ROOT`).

This file holds **this project's** vocabulary, boundaries, and disambiguation. Do not duplicate portable content — cross-link the Bible.

**Router:** `docs/GODS_EYE_LAYERED_SPEC_ROUTER.md` (if present)

**Default posture:** **Tier C — Creator-Innovator** (Bible §10). Product/QA win on product boundaries.

---

## 1. Vocabulary (this repo)

| Term | Meaning |
|------|---------|
| **Always Sync** | `git pull` before work; `git push` after every commit — no local-only state (Bible §2.9) |
| **Governed Bypass** | Any rule may be bypassed only with explicit user approval first; log the bypass (Bible §2.9) |
| **Local mode** | LM Studio execution — serial only, no subagents, strict context pruning (Bible §2.9) |
| **Cloud mode** | Cloud frontier model — parallel reads, subagents allowed, fresh thread at 80% (Bible §2.9) |

---

## 2. Product boundary

+# _(What agents must not change without explicit user approval.)_

---

## 3. Connected chain (this repo)

| Layer | Path |
|-------|------|
| Rule | `.cursor/rules/nightraven-context-intent.mdc` |
| Bible | `docs/37_GODS_EYE_BIBLE.md` or `$GODS_EYE_ROOT` |
| Overlay | this file |
| Handoff | `docs/14_SESSION_HANDOFF.md` |
| Entry | `AGENTS.md` |
