variable "aws_region" {
  description = "AWS region"
  type        = string
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.micro"
}

variable "subnet_id" {
  description = "Subnet ID for EC2"
  type        = string
}

variable "security_group_id" {
  description = "Security Group ID for EC2"
  type        = string
}

variable "key_name" {
  description = "SSH key pair name for EC2 access"
  type        = string
}

# 🔽 ADD THESE (THIS FIXES VALIDATION)

variable "ecr_registry" {
  description = "ECR registry URL"
  type        = string
}

variable "ecr_repository" {
  description = "ECR repository name"
  type        = string
}

variable "image_tag" {
  description = "Docker image tag"
  type        = string
}

variable "vault_address" {
  description = "Vault address"
  type        = string
}
