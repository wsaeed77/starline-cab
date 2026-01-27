# PowerShell script to enable PHP extensions in MAMP

$phpIniPath = "C:\MAMP\bin\php\php8.2.2\php.ini"
$phpIniTemplate = "C:\MAMP\bin\php\php8.2.2\php.ini.template"

Write-Host "Setting up PHP extensions for MAMP..." -ForegroundColor Yellow

# Check if php.ini exists
if (Test-Path $phpIniPath) {
    Write-Host "Found php.ini at: $phpIniPath" -ForegroundColor Green
    
    # Backup original
    Copy-Item $phpIniPath "$phpIniPath.backup" -Force
    Write-Host "Backup created: $phpIniPath.backup" -ForegroundColor Green
    
    # Read content
    $content = Get-Content $phpIniPath -Raw
    
    # Enable openssl
    $content = $content -replace ';extension=openssl', 'extension=openssl'
    $content = $content -replace ';extension=curl', 'extension=curl'
    
    # Write back
    Set-Content -Path $phpIniPath -Value $content -NoNewline
    Write-Host "Extensions enabled!" -ForegroundColor Green
    
} elseif (Test-Path $phpIniTemplate) {
    Write-Host "Found php.ini.template, copying..." -ForegroundColor Yellow
    Copy-Item $phpIniTemplate $phpIniPath
    
    $content = Get-Content $phpIniPath -Raw
    $content = $content -replace ';extension=openssl', 'extension=openssl'
    $content = $content -replace ';extension=curl', 'extension=curl'
    Set-Content -Path $phpIniPath -Value $content -NoNewline
    Write-Host "php.ini created and extensions enabled!" -ForegroundColor Green
} else {
    Write-Host "Could not find php.ini or template. Please enable extensions manually." -ForegroundColor Red
    Write-Host "Location should be: $phpIniPath" -ForegroundColor Yellow
}

Write-Host "`nVerifying extensions..." -ForegroundColor Yellow
$modules = & "C:\MAMP\bin\php\php8.2.2\php.exe" -m
if ($modules -match "openssl" -and $modules -match "curl") {
    Write-Host "✓ OpenSSL and cURL are enabled!" -ForegroundColor Green
} else {
    Write-Host "✗ Extensions may not be enabled. Check manually." -ForegroundColor Red
}
