# God's Eye Phase 2 - sessionStart (Touch 1 Before) + Always Sync pull
# Fail-open: git errors never block Cursor.

$ErrorActionPreference = 'Continue'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $ScriptDir 'lib.ps1')

$inputJson = Read-HookInput
$projectRoot = Get-GodsEyeProjectRoot $inputJson
$godsEyeRoot = Resolve-GodsEyeRoot $projectRoot
$handoffHint = Get-GodsEyeRelPath $projectRoot "docs/14_SESSION_HANDOFF.md"
$bibleHint = "docs/37_GODS_EYE.md"
if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $bibleHint))) {
    $bibleHint = Join-Path $godsEyeRoot "docs/37_GODS_EYE.md"
}

if (Test-GodsEyeShouldSkipStopPull $projectRoot) {
    $pullMessage = "Autosync pull skipped - session recent (see .cursor/.autosync-session)."
} else {
    $pullResult = Invoke-GitPullFfOnly $projectRoot
    Set-GodsEyeSessionPulled $projectRoot $pullResult.Ok
    $pullMessage = $pullResult.Message
}
Update-GodsEyeTouch3Cache $projectRoot

$message = @"
God's Eye - Touch 1 - BEFORE (soft reminder, not a hard block)

Always Sync - session start: $pullMessage

Three-touch: Before -> During -> After on every real task.

Before substantive edits:
1. Parallel-read: always-on rule -> $bibleHint section 0 -> overlay (if any) -> router (if any) -> $handoffHint -> AGENTS.md
   Tier 0-1 fast path: rule + handoff scan only — skip full Bible chain unless scope is cross-cutting
2. Classify tier (0-3) and intent ladder - default stop: memory + wire
3. MEMORY CHECK: dedup against this repo only; never import other repos' handoff

During: guard scope, +# only on memory docs, parallel independent workstreams
"@

if (Test-GodsEyeTouch3Disabled $projectRoot) {
    $message += "`nTouch 3 AFTER: paused (.cursor/touch3.disabled or ~/.cursor/touch3.disabled) - skip session-close follow-up batch"
} else {
    $message += "`nAfter (Touch 3): append handoff Recent sessions on real exit; Record Everything at Tier 2+"
}

$message += "`n`nPortable law: $bibleHint - Session tree: docs/GODS_EYE_SESSION_TREE.md (or GODS_EYE_ROOT)"
$message += "`nGODS_EYE_ROOT=$godsEyeRoot"

Emit-SessionStart $message $godsEyeRoot
exit 0
