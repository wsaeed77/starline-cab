# Quick Start - EC2 Deployment

## Step 1: Initial Server Setup

### Connect to EC2 and run setup:

```bash
# Connect to EC2
ssh -i E:\Keys\Teamdoctor2023.pem ubuntu@54.163.213.74

# Upload setup script (or clone from GitHub)
# Then run:
sudo bash scripts/setup_ec2_server.sh
```

This installs: Nginx, PHP 8.2, Composer, Node.js 18, MySQL

## Step 2: Set Up Shared Storage

```bash
sudo bash scripts/setup_shared_storage_ec2.sh
```

## Step 3: Configure Database

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE startline_cab CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'startline_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON startline_cab.* TO 'startline_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 4: Create .env File

```bash
sudo nano /var/www/startline-cab/shared/.env
```

Copy from `.env.example` and update:
- `APP_URL=http://54.163.213.74`
- `DB_DATABASE=startline_cab`
- `DB_USERNAME=startline_user`
- `DB_PASSWORD=your_password`

Generate key:
```bash
cd /var/www/startline-cab/shared
php artisan key:generate
```

## Step 5: Configure GitHub Actions

### Add Secrets in GitHub:
1. Go to: Repository → Settings → Secrets and variables → Actions
2. Add these secrets:

| Secret Name | Value |
|------------|-------|
| `SSH_USER` | `ubuntu` |
| `SSH_HOSTNAME` | `54.163.213.74` |
| `SSH_PORT` | `22` |
| `SSH_KEY` | Contents of `E:\Keys\Teamdoctor2023.pem` |
| `DEPLOY_PATH` | `/var/www/startline-cab` |

### Get SSH Key Content (Windows PowerShell):
```powershell
Get-Content E:\Keys\Teamdoctor2023.pem
```

Copy the entire output (including BEGIN and END lines) and paste as `SSH_KEY` secret.

## Step 6: Deploy

Push to main branch:
```bash
git add .
git commit -m "Setup deployment"
git push origin main
```

GitHub Actions will automatically deploy!

## Manual First Deploy (Alternative)

If you prefer manual first deployment:

```bash
# From Windows, upload files:
scp -i E:\Keys\Teamdoctor2023.pem -r . ubuntu@54.163.213.74:/var/www/startline-cab/releases/initial/

# SSH and run:
ssh -i E:\Keys\Teamdoctor2023.pem ubuntu@54.163.213.74
cd /var/www/startline-cab
sudo bash scripts/first_deploy.sh
```

## Verify

Visit: `http://54.163.213.74`

## Troubleshooting

### Check logs:
```bash
# Nginx
sudo tail -f /var/log/nginx/error.log

# Laravel
sudo tail -f /var/www/startline-cab/shared/storage/logs/laravel.log

# PHP-FPM
sudo systemctl status php8.2-fpm
```

### Restart services:
```bash
sudo systemctl restart nginx
sudo systemctl restart php8.2-fpm
```

### Fix permissions:
```bash
sudo chown -R www-data:www-data /var/www/startline-cab/current
sudo chmod -R 775 /var/www/startline-cab/shared/storage
```
