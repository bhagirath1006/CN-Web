terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}

resource "aws_security_group" "app" {
  name = "cloudnexus-sg"
  ingress {
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t2.micro"
  vpc_security_group_ids = [aws_security_group.app.id]

  user_data = base64encode(<<-EOF
    #!/bin/bash
    set -e

    apt-get update -y
    apt-get install -y docker.io awscli
    systemctl start docker
    systemctl enable docker

    ECR_REGISTRY="${join("/", slice(split("/", var.docker_image_uri), 0, 1))}"

    aws ecr get-login-password --region ${var.aws_region} \
      | docker login --username AWS --password-stdin $ECR_REGISTRY

    docker run -d -p 5173:5173 \
      -e VAULT_ADDR=${var.vault_address} \
      -e VAULT_TOKEN=${var.vault_token} \
      ${var.docker_image_uri}
  EOF
  )

  tags = {
    Name = "cloudnexus-app"
  }
}