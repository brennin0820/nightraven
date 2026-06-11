# NightRaven — unified product (monorepo)

**Scope:** Brent's **umbrella brand** for agent-native engineering — memory, orchestration, guidance UI, and consumer apps. **This repo** is the NightRaven **platform monorepo** (framework + apps).

**Do not collapse vocabulary layers** — see table below. Portable law stays in [`37_GODS_EYE.md`](37_GODS_EYE.md).

---

## One ecosystem, four names (layers)

| Layer | Name | Role | Location |
|-------|------|------|----------|
| **Umbrella / brand** | **NightRaven** | Product family — what Brent ships and talks about | This doc · public README |
| **Memory framework** | **God's Eye** | Repo-native agent memory — Bible, handoff, hooks, `+#` | Repo root · `install.sh` |
| **Orchestration** | **NightRaven Core** | Adaptive Builder/Auditor — `/nightraven` | `.claude/skills/nightraven/SKILL.md` |
| **Guidance UI** | **NightRaven Compass** | Next-step dashboard for non-coder builder | `apps/compass/` |
| **Greenfield app** | **HimFLer** | New consumer project (bootstrapped) | `E:\NightRaven\HimFLer` |
| **Consumer app** | **NightRaven** (iOS) | Gambling tracker · ship name; Xcode target TBD | **External repo** — merge pending |

**Motto chain (Compass identity):** God's Eye thinks · NightRaven builds · Auditor verifies · Compass points.

---

## Monorepo layout (2026-06-11)

```text
NightRaven/                    ← platform monorepo (GitHub: gods-eye until rename)
├── docs/                      ← framework memory chain (L2–L3)
├── .cursor/                   ← rules · hooks · MCP
├── .claude/skills/nightraven/ ← NightRaven Core
├── apps/
│   ├── README.md
│   └── compass/               ← NightRaven Compass Phase 1 (subtree from sibling repo)
├── install.sh
└── scripts/install-gods-eye-nightraven.sh
```

**Merge status:**

| Piece | Status |
|-------|--------|
| God's Eye framework | **Root** (canonical) |
| NightRaven Core skill | **Root** |
| NightRaven Compass | **Merged** → `apps/compass/` (`git subtree` squash) |
| NightRaven iOS app | **Not on this machine** — add as `apps/ios/` or submodule when repo available |
| Legacy `E:\NightRaven\nightraven-compass` | Sibling folder — archive after monorepo verified |
| Legacy `E:\NightRaven\gods-eye` nested clone | Stale — use `gods-eye-1` / this monorepo only |

---

## Memory isolation (still mandatory)

| Memory | Scope |
|--------|--------|
| Framework handoff | `docs/14_SESSION_HANDOFF.md` — **this repo's framework work only** |
| Compass product docs | `apps/compass/docs/` — Compass scope, audits, build reports |
| iOS app handoff | Future `apps/ios/docs/14` or external until merged — **never paste into framework handoff** |

Cross-link in Recent sessions; do not `-#` or merge handoff bodies.

---

## GitHub rename (deferred — Brent decision)

Public repo may remain `brennin0820/gods-eye` while product brand is **NightRaven**. Rename to `NightRaven` or `nightraven-platform` when ready — update remote, inventory, CURSOR_INSTALL, and adopters.

---

## Related

- [`GODS_EYE_UNIFIED_STACK.md`](GODS_EYE_UNIFIED_STACK.md) §13
- [`GODS_EYE_REPO_OVERLAY.md`](GODS_EYE_REPO_OVERLAY.md) §1 NightRaven unified
- [`14_SESSION_HANDOFF.md`](14_SESSION_HANDOFF.md)
- [`apps/compass/README.md`](../apps/compass/README.md)
