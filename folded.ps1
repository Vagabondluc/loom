# ===================================================================
# Script: folded.ps1
# Description: Automatically collects all files in the current folder
#              (and its subfolders) and exports their relative paths
#              and contents to structure.json. Excludes the output file itself
#              and common build/temp directories to avoid recursion and bloat.
# ===================================================================

param(
    [string]$RootPath = (Get-Location),
    [string]$OutputJson = "structure.json"
)

# Normalize root path
$RootPath = Resolve-Path $RootPath

Write-Host "Scanning folder: $RootPath"

# Define files and directories to exclude
$excludePatterns = @(
    $OutputJson,  # Exclude the output file itself to prevent recursion
    "*.log",
    "*.tmp",
    "build/",
    "dist/",
    "node_modules/",
    "__pycache__/",
    "*.pyc",
    ".git/",
    "build_temp/"
)

# Collect all files recursively, excluding specified patterns
$allFiles = Get-ChildItem -Path $RootPath -Recurse -File -Name "*"
$files = @()
foreach ($file in $allFiles) {
    $fullName = Join-Path $RootPath $file
    $relativePath = $fullName.Substring($RootPath.Path.Length).TrimStart('\','/')

    # Check if file matches any exclude pattern
    $shouldExclude = $false
    foreach ($pattern in $excludePatterns) {
        if ($relativePath -like "*$pattern*" -or $relativePath -like "$pattern*") {
            $shouldExclude = $true
            break
        }
    }

    if (-not $shouldExclude) {
        $files += Get-Item $fullName
    }
}

Write-Host "Processing $($files.Count) files..."

# Build file data
$fileData = foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($RootPath.Path.Length).TrimStart('\','/')

    # Try to read content as text, fallback to base64 for binary files
    $content = $null
    $isBinary = $false

    try {
        # Test if file can be read as text by checking for null bytes
        $fileBytes = [System.IO.File]::ReadAllBytes($file.FullName)
        if ($fileBytes -contains 0) {
            # Contains null bytes, treat as binary - encode as base64
            $content = [Convert]::ToBase64String($fileBytes)
            $isBinary = $true
        } else {
            # No null bytes, treat as text
            $content = [System.Text.Encoding]::UTF8.GetString($fileBytes)
        }
    }
    catch {
        Write-Warning "Could not read file: $($file.FullName)"
        $content = ""
    }

    [PSCustomObject]@{
        RelativePath = $relativePath
        Content      = $content
        IsBinary     = $isBinary
    }
}

# Convert to formatted JSON
$json = $fileData | ConvertTo-Json -Depth 5 -Compress

# Output JSON file
$json | Out-File -FilePath $OutputJson -Encoding UTF8

Write-Host "JSON written to: $(Resolve-Path $OutputJson)"
Write-Host "Total files processed: $($files.Count)"
