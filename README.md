# Startline Cab - Taxi & Care Transport Service

A full-stack application for managing taxi and care transport services, built with Laravel 10, React, and Inertia.js.

## Features

- **Dual Service Types**: Support for both standard taxi service and specialized care transport
- **Quote Calculator**: Real-time fare estimation based on distance and time
- **Cab Management**: Admin panel for managing vehicle fleet
- **Pricing Configuration**: Flexible pricing formula (Base + Per Mile + Per Minute)
- **Beautiful UI**: Modern, responsive design with Tailwind CSS

## Technology Stack

### Backend
- Laravel 10
- PHP 8.1+
- MySQL Database
- Laravel Sanctum (Authentication)
- Inertia.js Laravel Adapter

### Frontend
- React 18
- Inertia.js (React adapter)
- Vite 5
- Tailwind CSS 3
- Headless UI
- Heroicons

## Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js and npm
- MySQL

### Setup Steps

1. **Install PHP Dependencies**
   ```bash
   composer install
   ```

2. **Install Node Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configure Database**
   Edit `.env` file with your database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=startline_cab
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Run Migrations and Seeders**
   ```bash
   php artisan migrate --seed
   ```

6. **Create Admin User**
   You can create an admin user using Laravel Tinker:
   ```bash
   php artisan tinker
   ```
   Then run:
   ```php
   \App\Models\User::create([
       'name' => 'Admin',
       'email' => 'admin@startlinecab.com',
       'password' => bcrypt('password'),
   ]);
   ```

7. **Start Development Servers**
   
   Terminal 1 (Laravel):
   ```bash
   php artisan serve
   ```
   
   Terminal 2 (Vite):
   ```bash
   npm run dev
   ```

8. **Access the Application**
   - Frontend: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin/dashboard (login required)

## Default Credentials

After seeding, you can use:
- Email: admin@startlinecab.com
- Password: password

**Note**: Change these credentials immediately in production!

## Project Structure

```
startline-cab/
├── app/
│   ├── Http/
│   │   ├── Controllers/        # Application controllers
│   │   └── Middleware/         # Custom middleware
│   └── Models/                 # Eloquent models
├── database/
│   ├── migrations/             # Database migrations
│   └── seeders/                # Database seeders
├── resources/
│   ├── js/
│   │   ├── Pages/              # Inertia React pages
│   │   ├── Layouts/            # Layout components
│   │   └── app.jsx             # Main React entry point
│   └── views/
│       └── app.blade.php       # Main Blade template
├── routes/
│   ├── web.php                 # Web routes
│   └── auth.php                # Authentication routes
└── public/                      # Public assets
```

## Key Features

### Public Pages
- **Home**: Landing page with service overview
- **Quote Calculator**: Get fare estimates for journeys
- **Contact**: Contact form
- **About**: Company information

### Admin Panel
- **Dashboard**: Overview statistics
- **Cab Management**: CRUD operations for vehicles
- **Pricing Configuration**: Set base price, price per mile, and price per minute

## Development

### Running Tests
```bash
php artisan test
```

### Code Formatting
```bash
./vendor/bin/pint
```

### Building for Production
```bash
npm run build
```

## License

MIT License
