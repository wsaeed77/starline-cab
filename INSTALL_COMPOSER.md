# Installing Composer Dependencies

Since Composer is not in your PATH, you have a few options:

## Option 1: Install Composer Globally (Recommended)

1. Download Composer from: https://getcomposer.org/download/
2. Run the Windows installer
3. Restart your terminal
4. Run: `composer install`

## Option 2: Use Composer.phar Directly

1. Download `composer.phar` to your project root
2. Run: `C:\MAMP\bin\php\php8.2.2\php.exe composer.phar install`

## Option 3: Use PHP with Composer.phar (If you have it)

If you have composer.phar in your project:
```powershell
C:\MAMP\bin\php\php8.2.2\php.exe composer.phar install
```

## Quick Fix - Download Composer.phar

You can download composer.phar directly:
```powershell
# Download composer.phar
Invoke-WebRequest -Uri "https://getcomposer.org/download/latest-stable/composer.phar" -OutFile "composer.phar"

# Then run
C:\MAMP\bin\php\php8.2.2\php.exe composer.phar install
```
