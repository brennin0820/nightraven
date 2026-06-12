# Gods Eye Phase 2 - afterFileEdit
# Soft nudge when memory-chain files change: +# only, consider exit writes.
# Fast path: skip lib load when edit is outside memory-chain paths.

$ErrorActionPreference = 'Continue'

function Read-HookInputFast {
    try { return [Console]::In.ReadToEnd() } catch { return "" }
}

function Get-JsonFieldFast {
    param([string]$Json, [string]$Field)
    if ([string]::IsNullOrWhiteSpace($Json)) { return "" }
    if ($Json -match "`"$([regex]::Escape($Field))`"\s*:\s*`"([^`"]*)`"") {
        return $Matches[1]
    }
    return ""
}

function Test-MemoryChainPath {
    param([string]$FilePath)
    if ([string]::IsNullOrWhiteSpace($FilePath)) { return $false }
    $normalized = $FilePath -replace '\\', '/'
    foreach ($prefix in @('docs/', '.cursor/rules/', 'examples/overlay/')) {
        if ($normalized -like "$prefix*") { return $true }
    }
    return ($normalized -eq 'AGENTS.md')
}

$inputJson = Read-HookInputFast
$filePath = Get-JsonFieldFast $inputJson "file_path"
if ([string]::IsNullOrWhiteSpace($filePath)) {
    $filePath = Get-JsonFieldFast $inputJson "path"
}

if (-not (Test-MemoryChainPath $filePath)) {
    Write-Output '{}'
    exit 0
}

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
. (Join-Path $ScriptDir 'lib.ps1')

$message = "God's Eye memory edit ($filePath):"
$message += "`n`n- +# only - append; use **Supersedes** for corrections; never -# heading blocks or trim **Already done** / **Recent sessions**"
$projectRoot = Get-GodsEyeProjectRoot $inputJson
if (Test-GodsEyeTouch3Disabled $projectRoot) {
    $message += "`n- Touch 3 paused - wire cross-links when asked; no mandatory session-close batch"
} else {
    $message += "`n- Defer Touch 3 batch (changelog, learning log, handoff Recent sessions) to session-stop **last turn** - not mid-session"
    $message += "`n- Mid-session memory append only when Brent explicitly asks"
}
$message += "`n- One writer per file per pass; parallel reads are fine"

Emit-AdditionalContext $message
exit 0
