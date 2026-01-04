#!/bin/bash
set -e

exec > >(tee -a /var/log/user-data.log)
exec 2>&1

echo "[$(date)] Starting EC2 bootstrap"

# -----------------------------
# Install packages
# -----------------------------
apt-get update -y
apt-get install -y docker.io curl wget jq git awscli

systemctl start docker
systemctl enable docker

usermod -aG docker ubuntu

# -----------------------------
# Variables injected by Terraform
# -----------------------------
AWS_REGION="${aws_region}"
DOCKER_IMAGE_URI="${docker_image_uri}"
APP_NAME="${app_name}"
CONTAINER_PORT="${container_port}"
VAULT_ADDR="${vault_addr}"
VAULT_TOKEN="${vault_token}"

# -----------------------------
# Login to ECR
# -----------------------------
echo "[$(date)] Logging into ECR"
aws ecr get-login-password --region "$AWS_REGION" | \
docker login --username AWS --password-stdin "${docker_image_uri%/*}"

# -----------------------------
# Pull image
# -----------------------------
echo "[$(date)] Pulling Docker image"
docker pull "$DOCKER_IMAGE_URI"

# -----------------------------
# Stop old container
# -----------------------------
docker stop "$APP_NAME" || true
docker rm "$APP_NAME" || true

# -----------------------------
# Fetch secrets from Vault
# -----------------------------
echo "[$(date)] Fetching secrets from Vault"
APP_CONFIG=$(curl -s \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  "$VAULT_ADDR/v1/secret/data/cloudnexus/app" | jq -r '.data.data')

# -----------------------------
# Run container
# -----------------------------
echo "[$(date)] Starting container"
docker run -d \
  --name "$APP_NAME" \
  -p "$CONTAINER_PORT:$CONTAINER_PORT" \
  -e VAULT_ADDR="$VAULT_ADDR" \
  -e APP_CONFIG="$APP_CONFIG" \
  --restart always \
  --health-cmd="curl -f http://localhost:$CONTAINER_PORT || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  "$DOCKER_IMAGE_URI"

# -----------------------------
# Verify
# -----------------------------
sleep 10
if docker ps | grep "$APP_NAME"; then
  echo "[$(date)] Application started successfully"
else
  echo "[$(date)] Application failed to start"
  docker logs "$APP_NAME"
  exit 1
fi
