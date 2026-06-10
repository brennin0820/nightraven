# Learning log — God's Eye framework repo

Durable patterns discovered in this repo. Append-only (`+#`).

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
