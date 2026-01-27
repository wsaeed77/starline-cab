# Fix PHP Extensions for MAMP

Your MAMP PHP installation needs the OpenSSL and cURL extensions enabled to use Composer.

## Quick Fix Steps:

1. **Find your php.ini file:**
   ```powershell
   C:\MAMP\bin\php\php8.2.2\php.exe --ini
   ```
   This will show you the path to php.ini

2. **Edit php.ini:**
   - Open the php.ini file in a text editor (as Administrator)
   - Find these lines (they might be commented with `;`):
     ```
     ;extension=openssl
     ;extension=curl
     ```
   - Remove the semicolons to uncomment them:
     ```
     extension=openssl
     extension=curl
     ```

3. **Save the file and restart your server**

4. **Verify extensions are loaded:**
   ```powershell
   C:\MAMP\bin\php\php8.2.2\php.exe -m | Select-String -Pattern "openssl|curl"
   ```

## Alternative: Use MAMP's php.ini

MAMP usually has its php.ini at:
- `C:\MAMP\bin\php\php8.2.2\php.ini`

Or check the output of `php --ini` command above.

## After Enabling Extensions:

Run composer install again:
```powershell
C:\MAMP\bin\php\php8.2.2\php.exe composer.phar install
```
