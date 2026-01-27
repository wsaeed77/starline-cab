#!/bin/bash

# Startline Cab - EC2 Server Initial Setup Script
# Run this ONCE on a fresh EC2 Ubuntu instance

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

print_status() { echo -e "${GREEN}[✓]${NC} $1"; }
print_error() { echo -e "${RED}[✗]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[!]${NC} $1"; }

if [ "$EUID" -ne 0 ]; then 
    print_error "Please run as root (use sudo)"
    exit 1
fi

print_status "Starting EC2 server setup for Startline Cab..."

# Update system
print_status "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install essential packages
print_status "Installing essential packages..."
apt-get install -y \
    software-properties-common \
    curl \
    wget \
    git \
    unzip \
    build-essential \
    ca-certificates \
    gnupg \
    lsb-release

# Install Nginx
print_status "Installing Nginx..."
apt-get install -y nginx
systemctl enable nginx
systemctl start nginx

# Install PHP 8.2 and extensions
print_status "Installing PHP 8.2 and extensions..."
add-apt-repository ppa:ondrej/php -y
apt-get update
apt-get install -y \
    php8.2 \
    php8.2-fpm \
    php8.2-cli \
    php8.2-common \
    php8.2-mysql \
    php8.2-zip \
    php8.2-gd \
    php8.2-mbstring \
    php8.2-curl \
    php8.2-xml \
    php8.2-bcmath \
    php8.2-intl \
    php8.2-readline \
    php8.2-opcache

# Install Composer
print_status "Installing Composer..."
if [ ! -f /usr/local/bin/composer ]; then
    curl -sS https://getcomposer.org/installer | php
    mv composer.phar /usr/local/bin/composer
    chmod +x /usr/local/bin/composer
fi

# Install Node.js 18.x
print_status "Installing Node.js 18.x..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
    apt-get install -y nodejs
fi

# Install MySQL
print_status "Installing MySQL..."
debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'
apt-get install -y mysql-server
systemctl enable mysql
systemctl start mysql

# Create application directory
APP_DIR="/var/www/startline-cab"
print_status "Creating application directory: $APP_DIR"
mkdir -p $APP_DIR
mkdir -p $APP_DIR/releases
mkdir -p $APP_DIR/shared
chown -R ubuntu:ubuntu $APP_DIR

# Configure PHP-FPM
print_status "Configuring PHP-FPM..."
sed -i 's/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/' /etc/php/8.2/fpm/php.ini
sed -i 's/memory_limit = .*/memory_limit = 256M/' /etc/php/8.2/fpm/php.ini
sed -i 's/upload_max_filesize = .*/upload_max_filesize = 20M/' /etc/php/8.2/fpm/php.ini
sed -i 's/post_max_size = .*/post_max_size = 20M/' /etc/php/8.2/fpm/php.ini

# Configure Nginx
print_status "Configuring Nginx..."
NGINX_CONF="/etc/nginx/sites-available/startline-cab"
cat > $NGINX_CONF <<'NGINX_CONFIG'
server {
    listen 80;
    listen [::]:80;
    server_name _;
    root /var/www/startline-cab/current/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
NGINX_CONFIG

# Enable site
ln -sf $NGINX_CONF /etc/nginx/sites-enabled/startline-cab
rm -f /etc/nginx/sites-enabled/default

# Test and restart Nginx
nginx -t
systemctl restart nginx

# Restart PHP-FPM
systemctl restart php8.2-fpm
systemctl enable php8.2-fpm

# Set up Laravel scheduler cron
print_status "Setting up Laravel scheduler..."
(crontab -l 2>/dev/null; echo "* * * * * cd $APP_DIR/current && php artisan schedule:run >> /dev/null 2>&1") | crontab - || true

print_status "Server setup complete!"
echo
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🎉 EC2 Server is ready for deployment!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo
echo "  📁 Application Directory: $APP_DIR"
echo "  🌐 Nginx: Configured and running"
echo "  🐘 PHP 8.2: Installed and configured"
echo "  📦 Composer: Installed"
echo "  📦 Node.js: Installed"
echo "  🗄️  MySQL: Installed and running"
echo
print_warning "Next steps:"
echo "  1. Run: bash scripts/setup_shared_storage_ec2.sh"
echo "  2. Create .env file in $APP_DIR/shared/.env"
echo "  3. Configure GitHub Actions secrets"
echo "  4. Push to main branch to trigger deployment"
echo
print_warning "Important: Make sure your EC2 Security Group allows:"
echo "  - Port 80 (HTTP)"
echo "  - Port 443 (HTTPS)"
echo "  - Port 22 (SSH)"
echo
