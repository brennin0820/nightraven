# Shared helpers for God's Eye Phase 2 hooks (PowerShell - no external deps).

$script:GodsEyeInstallRoot = if ($env:GODS_EYE_INSTALL_ROOT) { $env:GODS_EYE_INSTALL_ROOT } else { Join-Path $env:USERPROFILE "Projects\gods-eye" }

function Escape-ForJson {
    param([string]$Text)
    if ($null -eq $Text) { return "" }
    $Text -replace '\\', '\\' `
           -replace '"', '\"' `
           -replace "`r", '\r' `
           -replace "`n", '\n' `
           -replace "`t", '\t'
}

function Emit-AdditionalContext {
    param([string]$Message)
    $escaped = Escape-ForJson $Message
    Write-Output "{`n  `"additional_context`": `"$escaped`"`n}"
}

function Emit-FollowupMessage {
    param([string]$Message)
    $escaped = Escape-ForJson $Message
    Write-Output "{`n  `"followup_message`": `"$escaped`"`n}"
}

function Emit-SessionStart {
    param(
        [string]$Message,
        [string]$GodsEyeRoot
    )
    $msgEscaped = Escape-ForJson $Message
    $rootEscaped = Escape-ForJson $GodsEyeRoot
    Write-Output "{`n  `"env`": { `"GODS_EYE_ROOT`": `"$rootEscaped`" },`n  `"additional_context`": `"$msgEscaped`"`n}"
}

function Get-JsonField {
    param(
        [string]$Json,
        [string]$Field
    )
    if ([string]::IsNullOrWhiteSpace($Json)) { return "" }
    if ($Json -match "`"$([regex]::Escape($Field))`"\s*:\s*`"([^`"]*)`"") {
        return $Matches[1]
    }
    return ""
}

function Get-JsonNumberField {
    param(
        [string]$Json,
        [string]$Field
    )
    if ([string]::IsNullOrWhiteSpace($Json)) { return "" }
    if ($Json -match "`"$([regex]::Escape($Field))`"\s*:\s*(\d+)") {
        return $Matches[1]
    }
    return ""
}

function Get-JsonWorkspaceRoot {
    param([string]$Json)
    if ([string]::IsNullOrWhiteSpace($Json)) { return "" }
    if ($Json -match '"workspace_roots"\s*:\s*\[\s*"([^"]*)"') {
        return $Matches[1]
    }
    return ""
}

function Get-GodsEyeProjectRoot {
    param([string]$InputJson = "")
    if ($env:CURSOR_PROJECT_DIR -and (Test-Path -LiteralPath $env:CURSOR_PROJECT_DIR)) {
        return $env:CURSOR_PROJECT_DIR
    }
    if ($env:CLAUDE_PROJECT_DIR -and (Test-Path -LiteralPath $env:CLAUDE_PROJECT_DIR)) {
        return $env:CLAUDE_PROJECT_DIR
    }
    $ws = Get-JsonWorkspaceRoot $InputJson
    if ($ws -and (Test-Path -LiteralPath $ws)) {
        return $ws
    }
    try {
        $gitRoot = git rev-parse --show-toplevel 2>$null
        if ($LASTEXITCODE -eq 0 -and $gitRoot) {
            return $gitRoot.Trim()
        }
    } catch { }
    return (Get-Location).Path
}

function Resolve-GodsEyeRoot {
    param([string]$ProjectRoot)
    $localBible = Join-Path $ProjectRoot "docs\37_GODS_EYE.md"
    if (Test-Path -LiteralPath $localBible) {
        return $ProjectRoot
    }
    if ($env:GODS_EYE_ROOT -and (Test-Path -LiteralPath (Join-Path $env:GODS_EYE_ROOT "docs\37_GODS_EYE.md"))) {
        return $env:GODS_EYE_ROOT
    }
    $installBible = Join-Path $script:GodsEyeInstallRoot "docs\37_GODS_EYE.md"
    if (Test-Path -LiteralPath $installBible) {
        return $script:GodsEyeInstallRoot
    }
    return $script:GodsEyeInstallRoot
}

function Get-GodsEyeRelPath {
    param(
        [string]$ProjectRoot,
        [string]$Rel
    )
    $full = Join-Path $ProjectRoot $Rel
    if (Test-Path -LiteralPath $full) {
        return $Rel
    }
    return "($Rel - create when bootstrapped)"
}

function Test-GodsEyeTouch3Disabled {
    param([string]$ProjectRoot = "")
    switch -Regex ($env:GODS_EYE_TOUCH3) {
        '^(0|off|OFF|false|FALSE|no|NO)$' { return $true }
    }
    switch -Regex ($env:GODS_EYE_TOUCH3_DISABLED) {
        '^(1|true|TRUE|yes|YES)$' { return $true }
    }
    $godsEyeRootMarker = if ($env:GODS_EYE_ROOT) { Join-Path $env:GODS_EYE_ROOT ".cursor\touch3.disabled" } else { "" }
    $markers = @(
        (Join-Path $env:USERPROFILE ".cursor\touch3.disabled"),
        $godsEyeRootMarker,
        (Join-Path $script:GodsEyeInstallRoot ".cursor\touch3.disabled")
    )
    foreach ($marker in $markers) {
        if ($marker -and (Test-Path -LiteralPath $marker)) {
            return $true
        }
    }
    if ($ProjectRoot) {
        $projectMarker = Join-Path $ProjectRoot ".cursor\touch3.disabled"
        if (Test-Path -LiteralPath $projectMarker) {
            return $true
        }
    }
    return $false
}

function Test-SecretPath {
    param([string]$RelativePath)
    $normalized = $RelativePath -replace '\\', '/'
    $patterns = @(
        '^\.env($|\.)',
        '(^|/)\.env\.',
        '(^|/)credentials\.json$',
        '(^|/)secrets?(\.|/|$)',
        '(^|/)id_rsa($|\.)',
        '\.pem$',
        '(^|/)\.npmrc$',
        '(^|/)auth\.json$',
        '(^|/)\.aws/credentials$'
    )
    foreach ($pat in $patterns) {
        if ($normalized -match $pat) { return $true }
    }
    return $false
}

function Test-SafeAutosyncPath {
    param([string]$RelativePath)
    $normalized = $RelativePath -replace '\\', '/'
    if (Test-SecretPath $normalized) { return $false }
    $safePrefixes = @(
        'docs/',
        '.cursor/',
        'templates/',
        'examples/',
        'scripts/',
        'mcp-server/'
    )
    foreach ($prefix in $safePrefixes) {
        if ($normalized -like "$prefix*") { return $true }
    }
    $safeFiles = @('AGENTS.md', 'README.md', 'CHANGELOG.md', 'LICENSE', 'install.sh')
    foreach ($file in $safeFiles) {
        if ($normalized -eq $file) { return $true }
    }
    return $false
}

function Invoke-GitInRoot {
    param(
        [string]$ProjectRoot,
        [string[]]$GitArgs
    )
    Push-Location -LiteralPath $ProjectRoot
    try {
        $output = @(& git @GitArgs 2>&1 | ForEach-Object { "$_" })
        return @{
            ExitCode = $LASTEXITCODE
            Output = $output
        }
    } finally {
        Pop-Location
    }
}

function Invoke-GitPullFfOnly {
    param([string]$ProjectRoot)
    $result = @{
        Ok = $false
        Message = ""
    }
    if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot ".git"))) {
        $result.Message = "Autosync pull skipped - not a git repository."
        return $result
    }
    $git = Invoke-GitInRoot $ProjectRoot @('pull', '--ff-only')
    if ($git.ExitCode -eq 0) {
        $result.Ok = $true
        $summary = ($git.Output | Select-Object -Last 3) -join ' '
        if ([string]::IsNullOrWhiteSpace($summary)) {
            $summary = "Already up to date."
        }
        $result.Message = "Autosync pull: $summary"
    } else {
        $detail = ($git.Output | Select-Object -Last 2) -join ' '
        $result.Message = "Autosync pull failed (fail-open): $detail"
    }
    return $result
}

function Get-SafeDirtyFiles {
    param([string]$ProjectRoot)
    Push-Location -LiteralPath $ProjectRoot
    try {
        $porcelain = git status --porcelain 2>$null
        if ($LASTEXITCODE -ne 0) { return @() }
        $files = @()
        foreach ($line in ($porcelain -split "`n")) {
            if ([string]::IsNullOrWhiteSpace($line)) { continue }
            $path = $line.Substring(3).Trim()
            if ($path.StartsWith('"') -and $path.EndsWith('"')) {
                $path = $path.Substring(1, $path.Length - 2)
            }
            if ($path -match ' -> ') {
                $path = ($path -split ' -> ')[-1].Trim()
                if ($path.StartsWith('"') -and $path.EndsWith('"')) {
                    $path = $path.Substring(1, $path.Length - 2)
                }
            }
            $path = $path -replace '\\', '/'
            if (Test-SafeAutosyncPath $path) {
                $files += $path
            }
        }
        return ($files | Select-Object -Unique)
    } finally {
        Pop-Location
    }
}

function Invoke-GitSessionCommit {
    param([string]$ProjectRoot)
    $result = @{
        Committed = $false
        Message = ""
    }
    $safeFiles = @(Get-SafeDirtyFiles $ProjectRoot)
    if ($safeFiles.Count -eq 0) {
        $result.Message = "Autosync commit skipped - no safe tracked changes (docs/.cursor/AGENTS/README or secret paths excluded)."
        return $result
    }
    $addArgs = @('add', '--') + @($safeFiles)
    $gitAdd = Invoke-GitInRoot $ProjectRoot $addArgs
    if ($gitAdd.ExitCode -ne 0) {
        $addedAny = $false
        foreach ($file in $safeFiles) {
            $singleAdd = Invoke-GitInRoot $ProjectRoot @('add', '--', $file)
            if ($singleAdd.ExitCode -eq 0) { $addedAny = $true }
        }
        if (-not $addedAny) {
            $detail = ($gitAdd.Output | Select-Object -Last 2) -join ' '
            if ([string]::IsNullOrWhiteSpace($detail)) { $detail = "git add failed" }
            $result.Message = "Autosync commit skipped - git add failed: $detail"
            return $result
        }
    }
    $gitDiff = Invoke-GitInRoot $ProjectRoot @('diff', '--cached', '--quiet')
    if ($gitDiff.ExitCode -eq 0) {
        $result.Message = "Autosync commit skipped - nothing staged after safe-path filter."
        return $result
    }
    $commitMsg = "chore(sync): session autosync [cursor hook]"
    $gitCommit = Invoke-GitInRoot $ProjectRoot @('commit', '-m', $commitMsg)
    if ($gitCommit.ExitCode -ne 0 -and (($gitCommit.Output -join ' ') -match 'Author identity unknown|unable to auto-detect email')) {
        $lastAuthorResult = Invoke-GitInRoot $ProjectRoot @('log', '-1', '--format=%an <%ae>')
        $lastAuthor = ($lastAuthorResult.Output | Select-Object -First 1).Trim()
        if ($lastAuthor -match '^(.+) <(.+)>$') {
            $gitCommit = Invoke-GitInRoot $ProjectRoot @(
                '-c', "user.name=$($Matches[1])",
                '-c', "user.email=$($Matches[2])",
                'commit', '-m', $commitMsg
            )
        }
    }
    if ($gitCommit.ExitCode -eq 0) {
        $result.Committed = $true
        $result.Message = "Autosync commit: $commitMsg ($($safeFiles.Count) file(s))."
    } else {
        $detail = ($gitCommit.Output | Select-Object -Last 2) -join ' '
        if ([string]::IsNullOrWhiteSpace($detail)) { $detail = "commit rejected" }
        $result.Message = "Autosync commit failed (fail-open): $detail"
    }
    return $result
}

function Invoke-GitPushIfAhead {
    param([string]$ProjectRoot)
    $result = @{
        Pushed = $false
        Message = ""
        Deferred = $false
        Reason = ""
    }
    Push-Location -LiteralPath $ProjectRoot
    try {
        $branch = (git rev-parse --abbrev-ref HEAD 2>$null).Trim()
        if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($branch)) {
            $result.Message = "Autosync push skipped - could not resolve branch."
            return $result
        }
        $upstream = "origin/$branch"
        git rev-parse --verify $upstream 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) {
            $result.Message = "Autosync push skipped - no upstream $upstream."
            return $result
        }
        $ahead = git rev-list --count "$upstream..HEAD" 2>$null
        if ($LASTEXITCODE -ne 0 -or [int]$ahead -le 0) {
            $result.Message = "Autosync push skipped - not ahead of $upstream."
            return $result
        }
        $git = Invoke-GitInRoot $ProjectRoot @('push', 'origin', 'HEAD')
        if ($git.ExitCode -eq 0) {
            $result.Pushed = $true
            $result.Message = "Autosync push: origin/$branch ($ahead commit(s))."
        } else {
            $detail = ($git.Output | Select-Object -Last 2) -join ' '
            $result.Deferred = $true
            $result.Reason = $detail
            $result.Message = "Autosync push failed (fail-open): $detail"
        }
    } finally {
        Pop-Location
    }
    return $result
}

function Add-PushDeferToHandoff {
    param(
        [string]$ProjectRoot,
        [string]$Reason
    )
    $handoff = Join-Path $ProjectRoot "docs\14_SESSION_HANDOFF.md"
    if (-not (Test-Path -LiteralPath $handoff)) { return }
    $today = Get-Date -Format "yyyy-MM-dd"
    $cleanReason = ($Reason -replace '\s+', ' ').Trim()
    if ($cleanReason.Length -gt 120) {
        $cleanReason = $cleanReason.Substring(0, 117) + "..."
    }
    $line = "- **$today** - Autosync push deferred [cursor hook]: $cleanReason"
    try {
        $content = Get-Content -LiteralPath $handoff -Raw
        if ($content -match '## Recent sessions') {
            $updated = $content -replace '(## Recent sessions\r?\n)', "`$1$line`r`n"
            Set-Content -LiteralPath $handoff -Value $updated -NoNewline
        }
    } catch {
        # fail-open - handoff append is best-effort
    }
}

function Read-HookInput {
    try {
        return [Console]::In.ReadToEnd()
    } catch {
        return ""
    }
}
