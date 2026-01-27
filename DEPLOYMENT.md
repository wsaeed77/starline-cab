# Startline Cab - Deployment Guide

This guide covers deploying the Startline Cab application to an EC2 instance with automated CI/CD pipeline.

## Prerequisites

- EC2 Ubuntu instance (20.04 or 22.04)
- SSH access to EC2 instance
- GitHub repository with Actions enabled
- Domain name (optional, for SSL)

## Initial Server Setup

### 1. Connect to EC2 Instance

```bash
ssh -i E:\Keys\Teamdoctor2023.pem ubuntu@54.163.213.74
```

### 2. Run Initial Server Setup

Once connected to the EC2 instance, run:

```bash
# Download the setup script
wget https://raw.githubusercontent.com/YOUR_USERNAME/startline-cab/main/scripts/setup_ec2_server.sh
# OR upload it manually via SCP

# Make it executable
chmod +x setup_ec2_server.sh

# Run as root
sudo bash setup_ec2_server.sh
```

This will install:
- Nginx web server
- PHP 8.2 with required extensions
- Composer
- Node.js 18.x
- MySQL database server
- Configure Nginx for Laravel

### 3. Set Up Shared Storage

```bash
# Navigate to application directory
cd /var/www/startline-cab

# Download or upload setup_shared_storage_ec2.sh
chmod +x scripts/setup_shared_storage_ec2.sh
sudo bash scripts/setup_shared_storage_ec2.sh
```

### 4. Configure MySQL Database

```bash
# Login to MySQL
sudo mysql -u root -p

# Create database and user
CREATE DATABASE startline_cab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'startline_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON startline_cab.* TO 'startline_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 5. Create .env File

```bash
# Create .env in shared directory
sudo nano /var/www/startline-cab/shared/.env
```

Add the following configuration:

```env
APP_NAME="Startline Cab"
APP_ENV=production
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=false
APP_URL=http://54.163.213.74

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=startline_cab
DB_USERNAME=startline_user
DB_PASSWORD=your_secure_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailpit
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

VITE_APP_NAME="${APP_NAME}"
```

Generate APP_KEY:
```bash
cd /var/www/startline-cab/shared
php artisan key:generate
```

## GitHub Actions Setup

### 1. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add:

- `SSH_USER`: `ubuntu`
- `SSH_HOSTNAME`: `54.163.213.74`
- `SSH_PORT`: `22`
- `SSH_KEY`: Contents of your private key file (`E:\Keys\Teamdoctor2023.pem`)
- `DEPLOY_PATH`: `/var/www/startline-cab`

### 2. Get SSH Private Key Content

On Windows:
```powershell
Get-Content E:\Keys\Teamdoctor2023.pem | Out-String
```

Copy the entire output (including `-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`) and paste it as the `SSH_KEY` secret.

### 3. Push to Main Branch

Once secrets are configured, push to the `main` or `master` branch to trigger deployment:

```bash
git add .
git commit -m "Initial deployment setup"
git push origin main
```

## Manual First Deployment (Alternative)

If you prefer to deploy manually the first time:

### 1. Upload Application Files

```bash
# From your local machine
scp -i E:\Keys\Teamdoctor2023.pem -r . ubuntu@54.163.213.74:/var/www/startline-cab/releases/initial/
```

### 2. Run First Deploy Script

```bash
# SSH into server
ssh -i E:\Keys\Teamdoctor2023.pem ubuntu@54.163.213.74

# Navigate and run
cd /var/www/startline-cab
sudo bash scripts/first_deploy.sh
```

## Post-Deployment

### 1. Set Up SSL (Optional)

If you have a domain name:

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

### 2. Configure Firewall

Ensure EC2 Security Group allows:
- Port 22 (SSH)
- Port 80 (HTTP)
- Port 443 (HTTPS)

### 3. Verify Deployment

Visit `http://54.163.213.74` in your browser to verify the application is running.

## Troubleshooting

### Check Nginx Logs
```bash
sudo tail -f /var/log/nginx/error.log
```

### Check Laravel Logs
```bash
sudo tail -f /var/www/startline-cab/shared/storage/logs/laravel.log
```

### Check PHP-FPM Status
```bash
sudo systemctl status php8.2-fpm
```

### Restart Services
```bash
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm
```

### Check File Permissions
```bash
sudo chown -R www-data:www-data /var/www/startline-cab/current
sudo chmod -R 755 /var/www/startline-cab/current
sudo chmod -R 775 /var/www/startline-cab/shared/storage
```

## Automated Deployment

After initial setup, every push to the `main` branch will automatically:
1. Build the application
2. Install dependencies
3. Deploy to EC2
4. Run migrations
5. Clear and cache configs
6. Restart services

## Rollback

To rollback to a previous release:

```bash
# SSH into server
ssh -i E:\Keys\Teamdoctor2023.pem ubuntu@54.163.213.74

# List releases
ls -la /var/www/startline-cab/releases/

# Point current to previous release
sudo ln -sfn /var/www/startline-cab/releases/PREVIOUS_RELEASE /var/www/startline-cab/current

# Restart services
sudo systemctl restart php8.2-fpm
sudo systemctl restart nginx
```
