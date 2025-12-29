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
  iam_instance_profile        = aws_iam_instance_profile.ec2_profile.name

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
}
