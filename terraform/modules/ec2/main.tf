data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_instance" "app" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = "t2.micro"
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [var.security_group_id]
  associate_public_ip_address = true
  key_name                    = var.key_name

  user_data = base64encode(<<-EOF
#!/bin/bash
set -e

exec > >(tee -a /var/log/user-data.log)
exec 2>&1

echo "[$(date)] Starting user data script"

apt-get update -y
apt-get install -y docker.io awscli
systemctl start docker
systemctl enable docker

echo "[$(date)] Docker installed and started"

# Add ubuntu user to docker group
usermod -aG docker ubuntu

# Export variables from Terraform
export DOCKER_IMAGE_URI="${var.docker_image_uri}"
export AWS_REGION="${var.aws_region}"

# Extract ECR registry using bash (runtime-safe)
ECR_REGISTRY=$(echo "$DOCKER_IMAGE_URI" | cut -d'/' -f1)

echo "[$(date)] ECR Registry: $ECR_REGISTRY"
echo "[$(date)] Docker image URI: $DOCKER_IMAGE_URI"

echo "[$(date)] Attempting ECR login"
aws ecr get-login-password --region "$AWS_REGION" \
  | docker login --username AWS --password-stdin "$ECR_REGISTRY"

echo "[$(date)] Pulling Docker image"
docker pull "$DOCKER_IMAGE_URI"

echo "[$(date)] Starting Docker container"
docker run -d -p 5173:5173 \
  -e VAULT_ADDR="${var.vault_address}" \
  -e VAULT_TOKEN="${var.vault_token}" \
  "$DOCKER_IMAGE_URI"

echo "[$(date)] User data script completed"
docker ps
EOF
  )
}
