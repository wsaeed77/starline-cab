# Setup Instructions for Startline Cab

## Quick Start Guide

### Step 1: Install Dependencies

**Backend (PHP/Composer):**
```bash
composer install
```

**Frontend (Node.js/npm):**
```bash
npm install
```

### Step 2: Environment Setup

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Generate application key:
   ```bash
   php artisan key:generate
   ```

3. Configure your database in `.env`:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=startline_cab
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

### Step 3: Database Setup

1. Create the database:
   ```sql
   CREATE DATABASE startline_cab;
   ```

2. Run migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```

This will:
- Create all necessary tables
- Set up default pricing configuration
- Create sample cab entries

### Step 4: Create Admin User

Run Laravel Tinker:
```bash
php artisan tinker
```

Then create an admin user:
```php
\App\Models\User::create([
    'name' => 'Admin',
    'email' => 'admin@startlinecab.com',
    'password' => bcrypt('password'),
]);
```

**Important:** Change the password immediately after first login!

### Step 5: Start Development Servers

**Terminal 1 - Laravel Server:**
```bash
php artisan serve
```

**Terminal 2 - Vite Dev Server:**
```bash
npm run dev
```

### Step 6: Access the Application

- **Frontend:** http://localhost:8000
- **Admin Panel:** http://localhost:8000/admin/dashboard
- **Login:** http://localhost:8000/login

## Default Admin Credentials

- **Email:** admin@startlinecab.com
- **Password:** password

⚠️ **Change these immediately in production!**

## Using Custom PHP Path (MAMP)

If you need to use a specific PHP version from MAMP:

```bash
# For PHP 8.2.2
C:\MAMP\bin\php\php8.2.2\php.exe artisan serve

# Or set as alias in your shell
alias php="C:\MAMP\bin\php\php8.2.2\php.exe"
```

## Troubleshooting

### Issue: Composer not found
- Make sure Composer is installed and in your PATH
- Or use the full path to composer.phar

### Issue: Node modules errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

### Issue: Database connection error
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists

### Issue: Vite not working
- Make sure both servers are running (Laravel + Vite)
- Check that port 5173 is available for Vite
- Clear browser cache

## Production Build

When ready for production:

1. Build assets:
   ```bash
   npm run build
   ```

2. Optimize Laravel:
   ```bash
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   ```

3. Set environment:
   ```env
   APP_ENV=production
   APP_DEBUG=false
   ```

## Next Steps

1. Configure your pricing in Admin Panel → Pricing Configuration
2. Add your cabs in Admin Panel → Manage Cabs
3. Customize the homepage content
4. Set up email configuration for contact forms
5. Configure Google Maps API for accurate distance calculations
