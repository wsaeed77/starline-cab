#!/usr/bin/env bash
set -euo pipefail

DEPLOY_PATH=${1:?"DEPLOY_PATH required"}
RELEASE=${2:?"RELEASE SHA required"}

CURRENT=${DEPLOY_PATH}/current
RELEASE_DIR=${DEPLOY_PATH}/releases/${RELEASE}

# Ensure shared storage directory exists with proper structure (use sudo to create)
echo "Creating shared storage directories..."
sudo mkdir -p ${DEPLOY_PATH}/shared/storage/app/public
sudo mkdir -p ${DEPLOY_PATH}/shared/storage/framework/cache/data
sudo mkdir -p ${DEPLOY_PATH}/shared/storage/framework/sessions
sudo mkdir -p ${DEPLOY_PATH}/shared/storage/framework/views
sudo mkdir -p ${DEPLOY_PATH}/shared/storage/logs

# Always ensure shared storage has correct permissions (www-data needs to write)
echo "Setting permissions on shared storage..."
sudo chown -R www-data:www-data ${DEPLOY_PATH}/shared/storage
sudo chmod -R 775 ${DEPLOY_PATH}/shared/storage

# Go to release directory
cd ${RELEASE_DIR}

# Remove release storage and symlink to shared storage
rm -rf ${RELEASE_DIR}/storage
ln -sf ${DEPLOY_PATH}/shared/storage ${RELEASE_DIR}/storage

# Symlink .env from shared if exists
if [ -f ${DEPLOY_PATH}/shared/.env ]; then
  ln -sf ${DEPLOY_PATH}/shared/.env ${RELEASE_DIR}/.env
fi

# Install Composer dependencies (vendor is excluded from rsync)
echo "Installing Composer dependencies..."
if [ -f ${RELEASE_DIR}/composer.json ]; then
  # Try to find composer in common locations
  COMPOSER_CMD="composer"
  if ! command -v composer &> /dev/null; then
    if [ -f /usr/local/bin/composer ]; then
      COMPOSER_CMD="/usr/local/bin/composer"
    elif [ -f /usr/bin/composer ]; then
      COMPOSER_CMD="/usr/bin/composer"
    else
      echo "Error: Composer not found. Please install Composer on the server."
      exit 1
    fi
  fi
  ${COMPOSER_CMD} install --no-dev --prefer-dist --no-interaction --optimize-autoloader --no-scripts
else
  echo "Warning: composer.json not found, skipping composer install"
fi

# Create bootstrap/cache if it doesn't exist
mkdir -p ${RELEASE_DIR}/bootstrap/cache

# Set permissions for bootstrap/cache (this is in the release, so ubuntu owns it)
chmod -R 775 ${RELEASE_DIR}/bootstrap/cache

# Optimize Laravel (run as www-data to ensure proper permissions)
echo "Clearing Laravel caches..."
sudo -u www-data php artisan config:clear || true
sudo -u www-data php artisan cache:clear || true
sudo -u www-data php artisan route:clear || true
sudo -u www-data php artisan view:clear || true

echo "Running migrations..."
sudo -u www-data php artisan migrate --force || true

echo "Caching Laravel configuration..."
sudo -u www-data php artisan config:cache
sudo -u www-data php artisan route:cache
sudo -u www-data php artisan view:cache

# Point current to new release
ln -sfn ${RELEASE_DIR} ${CURRENT}

# Fix permissions for bootstrap/cache in release (let www-data write to it)
sudo chown -R www-data:www-data ${RELEASE_DIR}/bootstrap/cache || true
sudo chmod -R 775 ${RELEASE_DIR}/bootstrap/cache || true

# Restart services
sudo systemctl reload php8.2-fpm || sudo systemctl restart php8.2-fpm || true
sudo systemctl reload nginx || sudo systemctl restart nginx || true

echo "Deploy complete: ${RELEASE}"
