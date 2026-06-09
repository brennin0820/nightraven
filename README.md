# God's Eye

**Portable AI agent oversight for Cursor** — durable project memory that watches work, compounds knowledge, and prevents wasted repeat effort.

> **Motto:** *Always watches.* Watch the work. Learn from it. Waste nothing. **Forget nothing.**

God's Eye is **not** user surveillance. It is a **benevolent oversight model** for coding agents: classify what the user meant, read the right docs in parallel, guard scope, and append outcomes with **`+#` only** (never delete history from memory docs).

The same role appears in the author's broader **BAIC / BigBrother** constitution; **God's Eye** is the **portable, repo-local name** you can adopt in any project.

---

## What you get

| Artifact | Description |
|----------|-------------|
| [**God's Eye Bible**](docs/37_GODS_EYE.md) | Canonical portable spec — laws, intent ladder, agent quick start, Tier C, improvement loop |
| [**Unified stack**](docs/GODS_EYE_UNIFIED_STACK.md) | L0–L4 layers — Memory Bank mapping, handoff, Mem0/Zep, hooks, Plan Mode, phased roadmap |
| [**Session tree**](docs/GODS_EYE_SESSION_TREE.md) | Visual flow: tiers, Record Everything mode, doc hierarchy (ASCII + Mermaid) |
| [**Improvement loop**](docs/GODS_EYE_IMPROVEMENT_LOOP.md) | Six virtual “teams,” one `+#` step per cycle |
| [**Spec router**](docs/GODS_EYE_GRAND_SPEC.md) | Thin index — Bible + local overlay + Cursor rule |
| [**Example Cursor rule**](.cursor/rules/gods-eye-context-intent.mdc) | Copy into your repo's `.cursor/rules/` (adapt paths) |
| [**Example overlay**](examples/overlay/GODS_EYE_REPO_OVERLAY.example.md) | How to add product vocabulary on top of portable law |
| [**Example user-context protocol**](examples/appendix/USER_CONTEXT_PROTOCOL.example.md) | Worked “add context” examples |
| [**Optional Cursor hooks (Phase 2)**](docs/HOOKS_SETUP.md) | Soft three-touch reminders — session start, stop, after memory-doc edits |

---

## How it works (60 seconds)

1. **Intent ladder** — Default stop: **memory + wire** (update durable docs and cross-links). Drop to UI/copy or code only when the user names those layers. See [§3 in the Bible](docs/37_GODS_EYE.md).
2. **Always parallel** — Batch-read disjoint docs; run independent workstreams in parallel; one writer per file.
3. **`+#` only** — Changelog, handoff, learning log: append; use **Supersedes** for corrections; never `-#` heading blocks.
4. **Repo overlay** — Portable law stays in the Bible; your app’s names, boundaries, and disambiguation live in `docs/GODS_EYE_REPO_OVERLAY.md` (see examples).
5. **Tier C default** — Creator-Innovator posture; Product/QA win on product boundaries.

---

## Quick start in your repo

1. **Vendor or submodule** this repository, or copy `docs/37_GODS_EYE.md` plus the files you need.
2. Add **`.cursor/rules/gods-eye-context-intent.mdc`** (from this repo) and point reads at your copy of the Bible.
3. Create **`docs/GODS_EYE_REPO_OVERLAY.md`** for local vocabulary (start from [`examples/overlay/`](examples/overlay/GODS_EYE_REPO_OVERLAY.example.md)).
4. Optional: **`docs/GODS_EYE_GRAND_SPEC.md`** as a router; **`.cursor/gods-eye-improvement-loop.md`** as a loop pointer.
5. Session start: rule → Bible **§0** → overlay → handoff / `AGENTS.md`.
6. **Optional Phase 2:** copy [`.cursor/hooks.json`](.cursor/hooks.json) + [`.cursor/hooks/`](.cursor/hooks/) for soft Cursor hook nudges (three-touch + Record Everything). See [`docs/HOOKS_SETUP.md`](docs/HOOKS_SETUP.md).

For a visual map of session flow and tiers, open [`docs/GODS_EYE_SESSION_TREE.md`](docs/GODS_EYE_SESSION_TREE.md).

---

## Repository layout

```text
docs/
  37_GODS_EYE.md              # Portable Bible (start at §0)
  GODS_EYE_UNIFIED_STACK.md   # L0–L4 stack map (Memory Bank, hooks, index)
  GODS_EYE_GRAND_SPEC.md      # Router
  GODS_EYE_IMPROVEMENT_LOOP.md
  GODS_EYE_SESSION_TREE.md
  HOOKS_SETUP.md              # Optional Phase 2 hooks — enable/disable
.cursor/
  rules/gods-eye-context-intent.mdc
  gods-eye-improvement-loop.md
  hooks.json                  # Optional Phase 2 — see docs/HOOKS_SETUP.md
  hooks/                      # session-start · session-stop · after-file-edit
examples/
  overlay/                    # Illustrative local overlay
  appendix/                   # Illustrative user-context protocol
```

---

## Relationship to BAIC / BigBrother

The Bible references **BAIC doc 37** and **BigBrother** as the author's master constitution nickname. You do **not** need BAIC to use God's Eye — this repo is self-contained. If you run the full BAIC stack, treat BigBrother and God's Eye as the **same oversight intent**, different scope labels.

---

## License

[MIT](LICENSE) — use, fork, and adapt; attribution appreciated.

---

*God's Eye always watches — so the next agent does not start from zero.*
