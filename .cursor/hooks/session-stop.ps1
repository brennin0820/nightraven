# God's Eye Phase 2 - stop (Touch 3 After) + Always Sync commit/push
# Fail-open: git errors never block Cursor.

$ErrorActionPreference = 'Continue'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $ScriptDir 'lib.ps1')

$inputJson = Read-HookInput
$projectRoot = Get-GodsEyeProjectRoot $inputJson
$loopCount = Get-JsonNumberField $inputJson "loop_count"
if ([string]::IsNullOrWhiteSpace($loopCount)) { $loopCount = "0" }

$syncLines = @()

$fastPath = Get-GodsEyeSessionSyncFastPath $projectRoot
if ($fastPath) {
    $syncLines += $fastPath
} else {
    if (-not (Test-GodsEyeShouldSkipStopPull $projectRoot)) {
        $pullResult = Invoke-GitPullFfOnly $projectRoot
        $syncLines += $pullResult.Message
    } else {
        $syncLines += "Autosync pull skipped - session-start recent (see .cursor/.autosync-session)."
    }

    $commitResult = Invoke-GitSessionCommit $projectRoot
    $syncLines += $commitResult.Message

    $pushResult = Invoke-GitPushIfAhead $projectRoot
    $syncLines += $pushResult.Message

    if ($pushResult.Deferred) {
        Add-PushDeferToHandoff $projectRoot $pushResult.Reason
        $syncLines += "Push defer recorded in docs/14_SESSION_HANDOFF.md Recent sessions (+# only)."
    }
}

if ([int]$loopCount -gt 0) {
    $syncOnly = "God's Eye - Always Sync [cursor hook]`n`n" + ($syncLines -join "`n")
    Emit-FollowupMessage $syncOnly
    exit 0
}

if (Test-GodsEyeTouch3Disabled $projectRoot) {
    $syncOnly = "God's Eye - Always Sync [cursor hook]`n`n" + ($syncLines -join "`n") + "`n`nTouch 3 AFTER paused - no mandatory handoff batch."
    Emit-FollowupMessage $syncOnly
    exit 0
}

$handoffPath = Get-GodsEyeRelPath $projectRoot "docs/14_SESSION_HANDOFF.md"

$message = "God's Eye - Touch 3 - AFTER - before you finish"
$message += "`n`n**Always Sync [cursor hook]**"
$message += "`n" + ($syncLines -join "`n")
$message += "`n`nIf this was a real session (tier >= 1): append one +# line to **Recent sessions** in $handoffPath. "
$message += "Keep prior session lines (newest first). Never -# or replace the whole section."
$message += "`n`nRecord Everything (Tier 2+): also append docs/02_ENGINEERING_CHANGELOG.md when work was meaningful; "
$message += "docs/04_LEARNING_LOG.md for new patterns; wire cross-links (rule, Bible, overlay, AGENTS, handoff)."
$message += "`n`n+# only - this repo only - no new template scaffolds per cycle."

Emit-FollowupMessage $message
exit 0
