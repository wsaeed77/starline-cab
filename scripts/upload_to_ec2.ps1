# PowerShell script to upload files to EC2 for initial setup
# Usage: .\scripts\upload_to_ec2.ps1

$EC2_HOST = "54.163.213.74"
$EC2_USER = "ubuntu"
$EC2_KEY = "E:\Keys\Teamdoctor2023.pem"
$REMOTE_PATH = "/var/www/startline-cab"

Write-Host "Uploading application files to EC2..." -ForegroundColor Green

# Create releases directory on remote
ssh -i $EC2_KEY ${EC2_USER}@${EC2_HOST} "sudo mkdir -p ${REMOTE_PATH}/releases/initial"
ssh -i $EC2_KEY ${EC2_USER}@${EC2_HOST} "sudo chown -R ubuntu:ubuntu ${REMOTE_PATH}"

# Upload files (excluding node_modules, vendor, .git, etc.)
Write-Host "Uploading files..." -ForegroundColor Yellow
scp -i $EC2_KEY -r `
    --exclude="node_modules" `
    --exclude="vendor" `
    --exclude=".git" `
    --exclude=".env" `
    --exclude="storage" `
    --exclude="public/build" `
    . ${EC2_USER}@${EC2_HOST}:${REMOTE_PATH}/releases/initial/

Write-Host "Files uploaded successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. SSH into the server: ssh -i $EC2_KEY ${EC2_USER}@${EC2_HOST}"
Write-Host "2. Run: sudo bash ${REMOTE_PATH}/releases/initial/scripts/setup_ec2_server.sh"
Write-Host "3. Run: sudo bash ${REMOTE_PATH}/releases/initial/scripts/setup_shared_storage_ec2.sh"
Write-Host "4. Run: sudo bash ${REMOTE_PATH}/releases/initial/scripts/first_deploy.sh"
