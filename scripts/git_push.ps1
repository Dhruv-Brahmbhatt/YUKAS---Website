Param(
    [string]$RepoPath = "."
)

Set-Location -LiteralPath $RepoPath
Write-Output '--- GIT STATUS ---'
git status --porcelain --branch | ForEach-Object { Write-Output $_ }

$branch = git rev-parse --abbrev-ref HEAD
Write-Output '--- BRANCH ---'
Write-Output $branch

Write-Output '--- STAGING CHANGES ---'
git add -A

Write-Output '--- CHECKING FOR STAGED CHANGES ---'
# git diff --staged --quiet sets $LASTEXITCODE: 0 = no changes, non-zero = changes
git diff --staged --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Output 'No staged changes to commit'
} else {
    git commit -m 'Update from workspace'
}

Write-Output '--- PUSHING ---'
if ([string]::IsNullOrWhiteSpace($branch)) { $branch = 'main' }
try {
    git push origin $branch
} catch {
    Write-Output "Push failed: $_"
}
