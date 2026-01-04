data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

# -------------------------------
# IAM Role for EC2 (ECR + SSM)
# Reference existing role instead of creating
# -------------------------------
data "aws_iam_role" "ec2_role" {
  name = "ec2-app-role"
}

resource "aws_iam_role_policy" "ec2_policy" {
  name = "ec2-app-policy"
  role = data.aws_iam_role.ec2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "ecr:GetAuthorizationToken",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer",
        "ecr:DescribeImages",
        "ssm:SendCommand",
        "ssm:GetCommandInvocation"
      ]
      Resource = "*"
    }]
  })
}

data "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2-app-instance-profile"
}

# -------------------------------
# EC2 Instance
# -------------------------------
resource "aws_instance" "app" {
  ami                         = data.aws_ami.ubuntu.id
  instance_type               = var.instance_type
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = [var.security_group_id]
  associate_public_ip_address = true
  iam_instance_profile        = data.aws_iam_instance_profile.ec2_profile.name
  key_name                    = var.key_name

  user_data = base64encode(<<-EOF
#!/bin/bash
set -e

exec > >(tee -a /var/log/user-data.log)
exec 2>&1

echo "[$(date)] EC2 bootstrap started"

apt-get update -y
apt-get install -y docker.io curl git awscli

systemctl start docker
systemctl enable docker

usermod -aG docker ubuntu

# Install Docker Compose plugin
mkdir -p /usr/local/lib/docker/cli-plugins
curl -SL https://github.com/docker/compose/releases/download/v2.27.0/docker-compose-linux-x86_64 \
  -o /usr/local/lib/docker/cli-plugins/docker-compose
chmod +x /usr/local/lib/docker/cli-plugins/docker-compose

# Prepare app directory
mkdir -p /home/ubuntu/app
chown -R ubuntu:ubuntu /home/ubuntu/app

echo "[$(date)] EC2 bootstrap completed"
EOF
  )

  tags = {
    Name = "cloudnexus-web-app"
  }

  depends_on = [
    data.aws_iam_instance_profile.ec2_profile
  ]
}
#bhagirath