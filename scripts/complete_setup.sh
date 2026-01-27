#!/bin/bash
# Complete setup script for Startline Cab on EC2
# This script handles database setup and initial deployment

set -e

DEPLOY_PATH="/var/www/startline-cab"
RELEASE_DIR="${DEPLOY_PATH}/releases/initial"

echo "=== Complete Setup Script ==="

# Create release directory if it doesn't exist
mkdir -p ${RELEASE_DIR}

# Setup MySQL database
echo "Setting up MySQL database..."
sudo mysql << 'SQL'
CREATE DATABASE IF NOT EXISTS startline_cab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER IF NOT EXISTS 'startline_user'@'localhost' IDENTIFIED BY 'Startline2024!';
GRANT ALL PRIVILEGES ON startline_cab.* TO 'startline_user'@'localhost';
FLUSH PRIVILEGES;
SELECT 'Database configured successfully' AS status;
SQL

echo "Database setup complete!"

# If files are already uploaded, proceed with deployment
if [ -f "${RELEASE_DIR}/artisan" ]; then
    echo "Application files found. Proceeding with deployment..."
    
    cd ${RELEASE_DIR}
    
    # Install dependencies
    echo "Installing PHP dependencies..."
    composer install --optimize-autoloader --no-dev --no-interaction
    
    echo "Installing Node.js dependencies..."
    npm ci
    
    echo "Building frontend assets..."
    npm run build
    
    # Link .env
    if [ -f "${DEPLOY_PATH}/shared/.env" ]; then
        ln -sf ${DEPLOY_PATH}/shared/.env ${RELEASE_DIR}/.env
        echo "Linked .env file"
    fi
    
    # Generate app key if not set
    if ! grep -q "APP_KEY=base64:" ${DEPLOY_PATH}/shared/.env 2>/dev/null; then
        php artisan key:generate --force
        echo "Generated application key"
    fi
    
    # Link storage
    rm -rf ${RELEASE_DIR}/storage
    ln -sf ${DEPLOY_PATH}/shared/storage ${RELEASE_DIR}/storage
    
    # Set permissions
    sudo chown -R www-data:www-data ${RELEASE_DIR}
    sudo chmod -R 755 ${RELEASE_DIR}
    sudo chmod -R 775 ${DEPLOY_PATH}/shared/storage
    sudo chmod -R 775 ${RELEASE_DIR}/bootstrap/cache
    
    # Run migrations
    echo "Running database migrations..."
    php artisan migrate --force
    
    # Seed database
    read -p "Do you want to seed the database? (y/N): " SEED_DB
    if [ "$SEED_DB" == "y" ] || [ "$SEED_DB" == "Y" ]; then
        php artisan db:seed --force
    fi
    
    # Optimize
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    
    # Create storage link
    php artisan storage:link || true
    
    # Point current to release
    ln -sfn ${RELEASE_DIR} ${DEPLOY_PATH}/current
    
    # Restart services
    sudo systemctl restart php8.2-fpm
    sudo systemctl restart nginx
    
    echo ""
    echo "=== Deployment Complete! ==="
    echo "Application URL: http://54.163.213.74"
else
    echo "Application files not found in ${RELEASE_DIR}"
    echo "Please upload your application files first, then run this script again."
    echo ""
    echo "You can:"
    echo "1. Use git clone if your repo is on GitHub"
    echo "2. Use scp/rsync to upload files"
    echo "3. Use GitHub Actions for automated deployment"
fi
