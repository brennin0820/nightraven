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
    $localBible = Join-Path $ProjectRoot "docs\37_GODS_EYE_BIBLE.md"
    if (Test-Path -LiteralPath $localBible) {
        return $ProjectRoot
    }
    if ($env:GODS_EYE_ROOT -and (Test-Path -LiteralPath (Join-Path $env:GODS_EYE_ROOT "docs\37_GODS_EYE_BIBLE.md"))) {
        return $env:GODS_EYE_ROOT
    }
    $installBible = Join-Path $script:GodsEyeInstallRoot "docs\37_GODS_EYE_BIBLE.md"
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
    if ($ProjectRoot) {
        $cachePath = Join-Path $ProjectRoot ".cursor\.touch3-cache"
        if (Test-Path -LiteralPath $cachePath) {
            $cached = (Get-Content -LiteralPath $cachePath -Raw).Trim()
            switch ($cached) {
                '1' { return $true }
                '0' { return $false }
            }
        }
    }
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

function Set-GodsEyeTouch3Cache {
    param(
        [string]$ProjectRoot,
        [bool]$Disabled
    )
    if ([string]::IsNullOrWhiteSpace($ProjectRoot)) { return }
    $cachePath = Join-Path $ProjectRoot ".cursor\.touch3-cache"
    $dir = Split-Path -Parent $cachePath
    if (-not (Test-Path -LiteralPath $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    Set-Content -LiteralPath $cachePath -Value ($(if ($Disabled) { '1' } else { '0' })) -NoNewline
}

function Update-GodsEyeTouch3Cache {
    param([string]$ProjectRoot = "")
    Set-GodsEyeTouch3Cache $ProjectRoot (Test-GodsEyeTouch3Disabled $ProjectRoot)
}

$script:GodsEyeAutosyncSkipStopPullSec = if ($env:GODS_EYE_AUTOSYNC_SKIP_STOP_PULL_SEC) {
    [int]$env:GODS_EYE_AUTOSYNC_SKIP_STOP_PULL_SEC
} else {
    1800
}

function Get-GodsEyeAutosyncSessionMarker {
    param([string]$ProjectRoot)
    return Join-Path $ProjectRoot ".cursor\.autosync-session"
}

function Get-UnixTimestamp {
    $origin = [datetime]'1970-01-01T00:00:00Z'
    return [int]([datetime]::UtcNow - $origin).TotalSeconds
}

function Set-GodsEyeSessionPulled {
    param(
        [string]$ProjectRoot,
        [bool]$PullOk = $true
    )
    $marker = Get-GodsEyeAutosyncSessionMarker $ProjectRoot
    $dir = Split-Path -Parent $marker
    if (-not (Test-Path -LiteralPath $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    $line = "{0}|{1}" -f (Get-UnixTimestamp), $(if ($PullOk) { '1' } else { '0' })
    Set-Content -LiteralPath $marker -Value $line -NoNewline
}

function Test-GodsEyeShouldSkipStopPull {
    param([string]$ProjectRoot)
    $marker = Get-GodsEyeAutosyncSessionMarker $ProjectRoot
    if (-not (Test-Path -LiteralPath $marker)) { return $false }
    $parts = (Get-Content -LiteralPath $marker -Raw).Trim() -split '\|', 2
    if ($parts.Count -lt 2 -or $parts[1] -ne '1') { return $false }
    $fileTs = [int]$parts[0]
    $age = (Get-UnixTimestamp) - $fileTs
    return ($age -ge 0 -and $age -le $script:GodsEyeAutosyncSkipStopPullSec)
}

function Test-HasSafeDirtyFiles {
    param([string]$ProjectRoot)
    Push-Location -LiteralPath $ProjectRoot
    try {
        $porcelain = git status --porcelain 2>$null
        if ($LASTEXITCODE -ne 0) { return $false }
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
            if (Test-SafeAutosyncPath $path) { return $true }
        }
        return $false
    } finally {
        Pop-Location
    }
}

function Test-IsAheadOfUpstream {
    param([string]$ProjectRoot)
    Push-Location -LiteralPath $ProjectRoot
    try {
        $branch = (git rev-parse --abbrev-ref HEAD 2>$null).Trim()
        if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($branch)) { return $false }
        $upstream = "origin/$branch"
        git rev-parse --verify $upstream 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) { return $false }
        $ahead = git rev-list --count "$upstream..HEAD" 2>$null
        return ($LASTEXITCODE -eq 0 -and [int]$ahead -gt 0)
    } finally {
        Pop-Location
    }
}

function Get-GodsEyeSessionSyncFastPath {
    param([string]$ProjectRoot)
    if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot ".git"))) {
        return "Autosync stop skipped - not a git repository."
    }
    if (Test-HasSafeDirtyFiles $ProjectRoot) { return $null }
    if (Test-IsAheadOfUpstream $ProjectRoot) { return $null }
    if (Test-GodsEyeShouldSkipStopPull $ProjectRoot) {
        return "Autosync stop: nothing to sync (no safe dirty, not ahead; pull skipped - session-start recent)."
    }
    return "Autosync stop: nothing to sync (no safe dirty, not ahead)."
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
        'mcp-server/',
        'apps/'
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

function Get-GodsEyeAutosyncCommitMessage {
    param([string[]]$SafeFiles)
    $normalized = @($SafeFiles | ForEach-Object { ($_ -replace '\\', '/').Trim() } | Where-Object { $_ } | Select-Object -Unique)
    if ($normalized.Count -eq 0) {
        return @{ Subject = 'chore(sync): session autosync [cursor hook]'; Body = '' }
    }

    $flags = @{
        Handoff = $false; Changelog = $false; Learning = $false
        Hooks = $false; Rules = $false; OtherDocs = $false
        Agents = $false; Readme = $false; Templates = $false
        Scripts = $false; Mcp = $false; Examples = $false
    }
    $hookNames = @()

    foreach ($path in $normalized) {
        switch -Regex ($path) {
            '^docs/14_SESSION_HANDOFF\.md$' { $flags.Handoff = $true; continue }
            '^docs/02_ENGINEERING_CHANGELOG\.md$' { $flags.Changelog = $true; continue }
            '^docs/04_LEARNING_LOG\.md$' { $flags.Learning = $true; continue }
            '^\.cursor/hooks/' {
                $flags.Hooks = $true
                $hookNames += [System.IO.Path]::GetFileName($path)
                continue
            }
            '^\.cursor/hooks\.json$' {
                $flags.Hooks = $true
                $hookNames += 'hooks.json'
                continue
            }
            '^\.cursor/rules/' { $flags.Rules = $true; continue }
            '^docs/' { $flags.OtherDocs = $true; continue }
            '^AGENTS\.md$' { $flags.Agents = $true; continue }
            '^README\.md$' { $flags.Readme = $true; continue }
            '^templates/' { $flags.Templates = $true; continue }
            '^scripts/' { $flags.Scripts = $true; continue }
            '^mcp-server/' { $flags.Mcp = $true; continue }
            '^examples/' { $flags.Examples = $true; continue }
        }
    }

    $memoryDocCount = @($flags.Handoff, $flags.Changelog, $flags.Learning) | Where-Object { $_ } | Measure-Object | Select-Object -ExpandProperty Count
    $nonHookAreas = @()
    if ($flags.Handoff -or $flags.Changelog -or $flags.Learning) { $nonHookAreas += 'memory docs' }
    if ($flags.OtherDocs) { $nonHookAreas += 'docs' }
    if ($flags.Rules) { $nonHookAreas += 'rules' }
    if ($flags.Agents) { $nonHookAreas += 'AGENTS' }
    if ($flags.Readme) { $nonHookAreas += 'README' }
    if ($flags.Templates) { $nonHookAreas += 'templates' }
    if ($flags.Scripts) { $nonHookAreas += 'scripts' }
    if ($flags.Mcp) { $nonHookAreas += 'mcp-server' }
    if ($flags.Examples) { $nonHookAreas += 'examples' }

    $subject = ''
    if ($flags.Hooks -and $nonHookAreas.Count -eq 0) {
        $hookSubject = 'session hook updates'
        $lowerHooks = @($hookNames | ForEach-Object { $_.ToLower() })
        $hasStop = @($lowerHooks | Where-Object { $_ -match 'session-stop' }).Count -gt 0
        $hasStart = @($lowerHooks | Where-Object { $_ -match 'session-start' }).Count -gt 0
        $hasAfter = @($lowerHooks | Where-Object { $_ -match 'after-file-edit' }).Count -gt 0
        $hasLib = @($lowerHooks | Where-Object { $_ -match '^lib\.(ps1|sh)$' }).Count -gt 0
        if ($hasStop -and $hasLib) {
            $hookSubject = 'auto-generate autosync commit messages on session stop'
        } elseif ($hasStop) {
            $hookSubject = 'autosync on session stop'
        } elseif ($hasAfter) {
            $hookSubject = 'after-file-edit fast paths'
        } elseif ($hasStart) {
            $hookSubject = 'session-start autosync fast paths'
        } elseif ($hasLib) {
            $hookSubject = 'autosync hook helpers'
        }
        $subject = "fix(hooks): $hookSubject"
    } elseif (-not $flags.Hooks -and $memoryDocCount -gt 0 -and -not ($flags.OtherDocs -or $flags.Rules -or $flags.Agents -or $flags.Readme -or $flags.Templates -or $flags.Scripts -or $flags.Mcp -or $flags.Examples)) {
        $touchParts = @()
        if ($flags.Handoff) { $touchParts += 'handoff' }
        if ($flags.Changelog) { $touchParts += 'changelog' }
        if ($flags.Learning) { $touchParts += 'learning log' }
        if ($touchParts.Count -eq 1 -and $flags.Handoff) {
            $subject = 'docs: Touch 3 AFTER handoff'
        } elseif ($touchParts.Count -eq 1 -and $flags.Changelog) {
            $subject = 'docs: engineering changelog'
        } elseif ($touchParts.Count -eq 1 -and $flags.Learning) {
            $subject = 'docs: learning log'
        } elseif ($flags.Handoff -and $flags.Changelog) {
            $subject = 'docs: Touch 3 AFTER handoff and changelog'
        } else {
            $subject = "docs: Touch 3 AFTER $($touchParts -join ' and ')"
        }
    } elseif ($flags.Hooks -and $nonHookAreas.Count -gt 0) {
        $areas = @('hooks') + $nonHookAreas
        $subject = "chore: session sync - $($areas -join ', ')"
    } elseif (-not $flags.Hooks -and $flags.OtherDocs -and $memoryDocCount -eq 0) {
        $subject = 'docs: update project documentation'
    } else {
        $areas = @()
        if ($flags.Hooks) { $areas += 'hooks' }
        $areas += $nonHookAreas
        if ($areas.Count -eq 0) { $areas = @('memory chain') }
        $subject = "chore: session sync - $($areas -join ', ')"
    }

    $body = ''
    if ($normalized.Count -gt 1) {
        $listed = $normalized | Select-Object -First 8
        $body = ($listed | ForEach-Object { "- $_" }) -join "`n"
        if ($normalized.Count -gt 8) {
            $body += "`n- ... and $($normalized.Count - 8) more"
        }
    }

    return @{ Subject = $subject; Body = $body }
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
    $commitParts = Get-GodsEyeAutosyncCommitMessage $safeFiles
    $commitMsg = $commitParts.Subject
    $commitBody = $commitParts.Body
    $commitArgs = @('commit', '-m', $commitMsg)
    if (-not [string]::IsNullOrWhiteSpace($commitBody)) {
        $commitArgs += @('-m', $commitBody)
    }
    $gitCommit = Invoke-GitInRoot $ProjectRoot $commitArgs
    if ($gitCommit.ExitCode -ne 0 -and (($gitCommit.Output -join ' ') -match 'Author identity unknown|unable to auto-detect email')) {
        $lastAuthorResult = Invoke-GitInRoot $ProjectRoot @('log', '-1', '--format=%an <%ae>')
        $lastAuthor = ($lastAuthorResult.Output | Select-Object -First 1).Trim()
        if ($lastAuthor -match '^(.+) <(.+)>$') {
            $retryArgs = @(
                '-c', "user.name=$($Matches[1])",
                '-c', "user.email=$($Matches[2])"
            ) + $commitArgs
            $gitCommit = Invoke-GitInRoot $ProjectRoot $retryArgs
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
