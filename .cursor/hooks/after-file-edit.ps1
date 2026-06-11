# Gods Eye Phase 2 - afterFileEdit
# Soft nudge when memory-chain files change: +# only, consider exit writes.

$ErrorActionPreference = 'Continue'
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $ScriptDir 'lib.ps1')

$inputJson = Read-HookInput
$filePath = Get-JsonField $inputJson "file_path"
if ([string]::IsNullOrWhiteSpace($filePath)) {
    $filePath = Get-JsonField $inputJson "path"
}

$normalized = $filePath -replace '\\', '/'
$matchesPath = $false
foreach ($prefix in @('docs/', '.cursor/rules/', 'examples/overlay/')) {
    if ($normalized -like "$prefix*") { $matchesPath = $true; break }
}
if (-not $matchesPath -and $normalized -notin @('AGENTS.md')) {
    Write-Output '{}'
    exit 0
}

$message = "Gods Eye memory edit ($filePath):"
$message += "`n`n- +# only - append; use **Supersedes** for corrections; never -# heading blocks or trim **Already done** / **Recent sessions**"
$projectRoot = Get-GodsEyeProjectRoot $inputJson
if (Test-GodsEyeTouch3Disabled $projectRoot) {
    $message += "`n- Touch 3 paused - wire cross-links when asked; no mandatory session-close batch"
} else {
    $message += "`n- If meaningful work: wire cross-links and plan Touch 3 writes (changelog, learning log, handoff Recent sessions)"
}
$message += "`n- One writer per file per pass; parallel reads are fine"

Emit-AdditionalContext $message
exit 0
