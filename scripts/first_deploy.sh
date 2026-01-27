#!/bin/bash

# Startline Cab - First Time Manual Deployment Script
# Run this ONCE manually to deploy the application for the first time

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() { echo -e "${GREEN}[✓]${NC} $1"; }
print_error() { echo -e "${RED}[✗]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[!]${NC} $1"; }

# Configuration
DEPLOY_PATH="/var/www/startline-cab"
RELEASE=$(date +%Y%m%d%H%M%S)

print_status "Starting first-time deployment..."

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root (use sudo)"
    exit 1
fi

# Create directories
print_status "Creating deployment directories..."
mkdir -p ${DEPLOY_PATH}/releases/${RELEASE}
mkdir -p ${DEPLOY_PATH}/shared

# Set up shared storage
print_status "Setting up shared storage..."
bash ${DEPLOY_PATH}/releases/${RELEASE}/scripts/setup_shared_storage_ec2.sh || true

# Copy application files (assuming you've uploaded them)
print_status "Application files should be in: ${DEPLOY_PATH}/releases/${RELEASE}/"
print_warning "Please ensure application files are uploaded to: ${DEPLOY_PATH}/releases/${RELEASE}/"

read -p "Press Enter when files are uploaded..."

# Go to release directory
cd ${DEPLOY_PATH}/releases/${RELEASE}

# Install PHP dependencies
print_status "Installing PHP dependencies..."
composer install --optimize-autoloader --no-dev

# Install Node.js dependencies
print_status "Installing Node.js dependencies..."
npm ci

# Build frontend assets
print_status "Building frontend assets..."
npm run build

# Set up .env file
if [ ! -f ${DEPLOY_PATH}/shared/.env ]; then
    print_status "Creating .env file..."
    if [ -f .env.example ]; then
        cp .env.example ${DEPLOY_PATH}/shared/.env
        php artisan key:generate
    
        read -p "Enter APP_URL (e.g., http://54.163.213.74): " APP_URL
        read -p "Enter database name: " DB_NAME
        read -p "Enter database username: " DB_USER
        read -sp "Enter database password: " DB_PASSWORD
        echo
        
        # Update .env file
        sed -i "s|APP_URL=.*|APP_URL=${APP_URL}|" ${DEPLOY_PATH}/shared/.env
        sed -i "s|DB_DATABASE=.*|DB_DATABASE=${DB_NAME}|" ${DEPLOY_PATH}/shared/.env
        sed -i "s|DB_USERNAME=.*|DB_USERNAME=${DB_USER}|" ${DEPLOY_PATH}/shared/.env
        sed -i "s|DB_PASSWORD=.*|DB_PASSWORD=${DB_PASSWORD}|" ${DEPLOY_PATH}/shared/.env
        sed -i "s|APP_ENV=.*|APP_ENV=production|" ${DEPLOY_PATH}/shared/.env
        sed -i "s|APP_DEBUG=.*|APP_DEBUG=false|" ${DEPLOY_PATH}/shared/.env
    else
        print_error ".env.example not found. Please create .env manually."
        exit 1
    fi
fi

# Symlink .env
ln -sf ${DEPLOY_PATH}/shared/.env ${DEPLOY_PATH}/releases/${RELEASE}/.env

# Set up storage symlink
rm -rf ${DEPLOY_PATH}/releases/${RELEASE}/storage
ln -sf ${DEPLOY_PATH}/shared/storage ${DEPLOY_PATH}/releases/${RELEASE}/storage

# Set permissions
print_status "Setting permissions..."
chown -R www-data:www-data ${DEPLOY_PATH}/releases/${RELEASE}
chmod -R 755 ${DEPLOY_PATH}/releases/${RELEASE}
chmod -R 775 ${DEPLOY_PATH}/shared/storage
chmod -R 775 ${DEPLOY_PATH}/releases/${RELEASE}/bootstrap/cache

# Run migrations
print_status "Running database migrations..."
php artisan migrate --force

# Seed database
read -p "Do you want to seed the database? (y/N): " SEED_DB
if [ "$SEED_DB" == "y" ] || [ "$SEED_DB" == "Y" ]; then
    php artisan db:seed --force
fi

# Optimize Laravel
print_status "Optimizing application..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Create storage link
php artisan storage:link || true

# Point current to release
ln -sfn ${DEPLOY_PATH}/releases/${RELEASE} ${DEPLOY_PATH}/current

# Restart services
print_status "Restarting services..."
systemctl restart php8.2-fpm
systemctl restart nginx

print_status "First deployment complete!"
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎉 Startline Cab is now deployed!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
echo "  🌐 Application URL: http://54.163.213.74"
echo "  📁 Application Directory: ${DEPLOY_PATH}/current"
echo "  🔑 Release: ${RELEASE}"
echo
