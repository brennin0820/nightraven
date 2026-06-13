# NightRaven Phase 2 - sessionStart (Touch 1 Before) + Always Sync pull
# Fail-open: git errors never block Cursor.

$ErrorActionPreference = 'Continue'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $ScriptDir 'lib.ps1')

$inputJson = Read-HookInput
$projectRoot = Get-NightRavenProjectRoot $inputJson
$nightravenRoot = Resolve-NightRavenRoot $projectRoot
$handoffHint = Get-NightRavenRelPath $projectRoot "docs/14_SESSION_HANDOFF.md"
$bibleHint = "docs/37_NIGHTRAVEN.md"
if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $bibleHint))) {
    $bibleHint = Join-Path $nightravenRoot "docs/37_NIGHTRAVEN.md"
}

if (Test-NightRavenShouldSkipStopPull $projectRoot) {
    $pullMessage = "Autosync pull skipped - session recent (see .cursor/.autosync-session)."
} else {
    $pullResult = Invoke-GitPullFfOnly $projectRoot
    Set-NightRavenSessionPulled $projectRoot $pullResult.Ok
    $pullMessage = $pullResult.Message
}
Update-NightRavenTouch3Cache $projectRoot

$message = @"
NightRaven - Touch 1 - BEFORE (soft reminder, not a hard block)

Always Sync - session start: $pullMessage

Three-touch: Before -> During -> After on every real task.

Before substantive edits:
1. Parallel-read: always-on rule -> $bibleHint section 0 -> overlay (if any) -> router (if any) -> $handoffHint -> AGENTS.md
   Tier 0-1 fast path: rule + handoff scan only — skip full Bible chain unless scope is cross-cutting
2. Classify tier (0-3) and intent ladder - default stop: memory + wire
3. MEMORY CHECK: dedup against this repo only; never import other repos' handoff

During: guard scope, +# only on memory docs, parallel independent workstreams
"@

if (Test-NightRavenTouch3Disabled $projectRoot) {
    $message += "`nTouch 3 AFTER: paused (.cursor/touch3.disabled or ~/.cursor/touch3.disabled) - skip session-close follow-up batch"
} else {
    $message += "`nAfter (Touch 3): **last turn only** - session-stop hook batches handoff + changelog + learning; never mid-session or while subagents run"
}

$message += "`n`nPortable law: $bibleHint - Session tree: docs/NIGHTRAVEN_SESSION_SPEC_TREES.md (or NIGHTRAVEN_ROOT)"
$message += "`nNIGHTRAVEN_ROOT=$nightravenRoot"

Emit-SessionStart $message $nightravenRoot
exit 0
