> **Example repo overlay (illustrative only)**  
> This file shows how to add **local** vocabulary, product boundaries, and disambiguation on top of the portable [God's Eye Bible](../../docs/37_GODS_EYE.md). Copy and adapt into your own repo as `docs/GODS_EYE_REPO_OVERLAY.md` — do not treat gambling-tracker names as universal law.

# God'sEye Repo Overlay — OneDayMillionaire

**Local layer only.** Portable God'sEye laws, intent ladder, and anti-patterns live in master BAIC **God's Eye Bible**:

`docs/37_GODS_EYE.md (this repository, or your vendored copy)`

This overlay holds **OneDayMillionaire / Gambling Tracker** vocabulary, Swift disambiguation, product boundary, and this repo's connected chain. Do not duplicate portable content here — cross-link **God's Eye Bible** (doc 37).

**Router:** `docs/GODS_EYE_GRAND_SPEC.md` — canonical read order (do not duplicate here).

**Default posture:** **Tier C — Creator-Innovator** (master doc 37 §10). Tracking-only boundary unchanged — Product/QA override on odds, casino glam, loss-chasing (`PLAN.md`).

---

## 1. Code vs Brent's "context" (this repo)

| Term | Meaning |
|------|---------|
| **Brent's context** | Product memory for agents — vocabulary, positioning, boundaries |
| **Code `*Context`** | Swift structs (`BudgetContext`, `SavingContext`, `AllowanceContext`, `PayStubContext`, …) — computed ledger state in ViewModels, **not** SwiftUI `@Environment` |

When Brent says "add context," assume **Brent's context** unless he points at a specific `.swift` file or calculator.

---

## 2. Vocabulary layers (do not collapse)

| Layer | Name (this app) | Where it lives |
|-------|-----------------|----------------|
| Product / category | **Gambling Tracker** | Overlay, `gambling-tracker.mdc`, AGENTS, handoff, README |
| Brand / Xcode target | **OneDayMillionaire** | Xcode, AGENTS, handoff |
| Repo folder (artifact) | **`BankrollCalendar`** | Paths only — not user-facing |
| Code domain | **`bankroll`** — `TrackingMode.bankroll`, `CategoryKind.bankroll`, default "Gambling *" categories | Swift enums — keep after product rename |
| Oversight (this repo) | **God'sEye** | Master doc 37, overlay (this file), `gods-eye-context-intent.mdc`, protocol, learning log |
| BAIC global nickname | **BigBrother** | Master framework — same role as God'sEye |

Adding context at one layer must **not** silently rename another (e.g. category label ≠ rename enum to `gambling`).

Keep code enums and persistence keys as `bankroll`; do not rename domain types to match marketing.

---

## 3. Product boundary (non-negotiable)

**OneDayMillionaire** is a private **Gambling Tracker**: calendar ledger for wins, losses, deposits, withdrawals, income, expenses, and balance over time.

Context additions must preserve: **tracking and financial awareness only** — no odds, casino mechanics, gambling encouragement, or loss-chasing language. Align with user `Documents/PLAN.md` § App Store positioning.

---

## 4. Deep read — telegraphic phrases (this app)

- **"Gambling Tracker"** → product category, not necessarily a code rename.
- **"On the app"** → product domain, not automatically UI change.
- **Tracking-only boundary** is law — no odds, casino mechanics, or loss-chasing copy (`PLAN.md`).

---

## 5. Connected read order (this repo)

**Canonical list:** `docs/GODS_EYE_GRAND_SPEC.md` § Sixty-second session start — do not maintain a second copy here.

### Required chain when adding context

`.cursor/rules/gambling-tracker.mdc` → `AGENTS.md` → `docs/14_SESSION_HANDOFF.md` → `README.md` (when user-facing summary helps) — plus master doc 37 and this overlay when laws or vocabulary change.

---

## 6. Repo-specific anti-patterns

| Anti-pattern | Why it's wrong |
|--------------|----------------|
| Creating a new `*Context.swift` from a product label | Conflates Brent's context with ledger calculator types |
| Changing `TrackingMode` / onboarding copy without explicit UI intent | Skips intent ladder step 3 |
| Re-explaining PLAN.md instead of persisting Brent's label into the chain | Chat-only knowledge |
| Renaming `bankroll` enums to match marketing | Vocabulary layer violation |

(Portable anti-patterns: master doc 37 §6.)

---

## 7. Document map (this repo)

| Document | Role |
|----------|------|
| Master `docs/37_GODS_EYE.md` | **God's Eye Bible** — portable laws, ladder, chain pattern, anti-patterns |
| **`docs/GODS_EYE_REPO_OVERLAY.md`** | **Local** — vocabulary, Swift disambiguation, boundary, **§10 agent pitfalls** |
| `docs/GODS_EYE_GRAND_SPEC.md` | Router — **Agent card** (canonical), session start pointers |
| `.cursor/rules/gods-eye-context-intent.mdc` | Always-on **START HERE** → §0 + overlay |
| `.cursor/rules/gambling-tracker.mdc` | Product vocabulary + tracking boundary |
| `docs/USER_CONTEXT_PROTOCOL.md` | Worked examples, checklist |
| **`docs/MONEY_MANAGEMENT_CONTEXT.md`** | **Product domain** — money mental model, concept → feature map |
| `docs/04_LEARNING_LOG.md` | Durable lessons (append-only) |
| `docs/02_ENGINEERING_CHANGELOG.md` | Engineering history (append-only) |
| `docs/14_SESSION_HANDOFF.md` | Current state, Already done, Recent sessions |
| `AGENTS.md` | Agent conventions, build/test, verify |
| `README.md` | User-facing summary + agent chain entry |
| `.cursor/gods-eye-improvement-loop.md` | Pointer — master improvement loop + local append targets |

---

## 8. God'sEye Improvement Loop (this repo)

**Pointer only:** `.cursor/gods-eye-improvement-loop.md` + **God's Eye Bible** doc 37 **§9–§10** (direct execution; template optional). **Parallel by default** — parallel reads and read-only audits; one `+#` write after synthesis (doc 37 §2.4; master doc 19). Repo cycles append `+#` to local chain files; portable changes go to master doc 37.

---

## 9. Tier C — Creator-Innovator (this app)

**Portable law:** master doc 37 §10. **Local gate:** innovations serve private financial tracking — calendar ledger clarity, solid money UI, dignified copy; no casino glam, odds framing, or loss-chasing (`PLAN.md`). Tier C leads craft; Product/QA own boundary.

---

## 10. Agent pitfalls (quick scan)

Read after master doc 37 **§0 Agent quick start**. **Agent card:** `docs/GODS_EYE_GRAND_SPEC.md` § Agent card (canonical — do not copy).

| Pitfall | Remember |
|---------|----------|
| **Tracking-only drift** | No odds, casino mechanics, loss-chasing copy — `PLAN.md` § App Store positioning |
| **`bankroll` ≠ Gambling Tracker** | Product **category** label ≠ rename `TrackingMode.bankroll` / `CategoryKind.bankroll` enums |
| **Brent's context ≠ Swift `*Context`** | "Add context" = agent memory (§1); `BudgetContext` etc. = ledger calculators in ViewModels |
| **Repo folder ≠ brand** | `BankrollCalendar` = path artifact; user-facing brand = **OneDayMillionaire** |
| **Cross-repo bleed** | Use **this repo's** handoff/changelog only — never import paths or "Already done" from other apps (master doc 37 §2.6, doc 36) |
| **Code before ship signal** | Plan/memory until **code it** / **implement** / **build** — Bible §2.8 |
| **Heavy thread cost** | Context-heavy chat (~80%+) → fresh thread + handoff; one Touch 3 AFTER per session — §2.8 |

---

*Overlay established 2026-06-09. Portable spec: master doc 37. Agent pitfalls §10 added 2026-06-09. Cross-repo isolation pitfall added 2026-06-09. Portable §2.8 pitfalls added 2026-06-09.*
