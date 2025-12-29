#!/bin/bash
set -e

# Update system
apt-get update
apt-get install -y \
  docker.io \
  curl \
  wget \
  jq \
  git \
  awscli

# Start Docker
systemctl start docker
systemctl enable docker

# Add Ubuntu user to docker group
usermod -aG docker ubuntu

# Create app directory
mkdir -p /app
cd /app

# Log in to ECR
aws ecr get-login-password --region $(ec2-metadata --availability-zone | cut -d " " -f 2 | sed 's/[a-z]$//') | \
  docker login --username AWS --password-stdin ${docker_image_uri%/*}

# Pull and run docker image
docker pull ${docker_image_uri}

# Create docker run script
cat > /usr/local/bin/start-app.sh << 'DOCKER_SCRIPT'
#!/bin/bash
VAULT_ADDR="${vault_addr}"
VAULT_TOKEN="${vault_token}"

# Get secrets from Vault
export APP_CONFIG=$(curl -s \
  -H "X-Vault-Token: $VAULT_TOKEN" \
  -H "Content-Type: application/json" \
  "$VAULT_ADDR/v1/secret/data/cloudnexus/app" | jq -r '.data.data')

# Run Docker container
docker run -d \
  --name ${app_name} \
  -p ${container_port}:${container_port} \
  -e VAULT_ADDR="$VAULT_ADDR" \
  -e VAULT_TOKEN="$VAULT_TOKEN" \
  -e APP_CONFIG="$APP_CONFIG" \
  --restart always \
  --health-cmd="curl -f http://localhost:${container_port} || exit 1" \
  --health-interval=30s \
  --health-timeout=10s \
  --health-retries=3 \
  ${docker_image_uri}
DOCKER_SCRIPT

chmod +x /usr/local/bin/start-app.sh

# Start the application
/usr/local/bin/start-app.sh

# Send log to CloudWatch
echo "Application started" > /var/log/app-startup.log
