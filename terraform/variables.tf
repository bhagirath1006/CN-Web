variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "vault_address" {
  type = string
}

variable "vault_token" {
  type      = string
  sensitive = true
}

variable "oidc_provider_arn" {
  type    = string
  default = "arn:aws:iam::360477615168:oidc-provider/token.actions.githubusercontent.com"
}

variable "docker_image_uri" {
  description = "Docker image URI (ECR)"
  type        = string
}

variable "enable_vault" {
  description = "Enable HashiCorp Vault integration"
  type        = bool
  default     = true
}

variable "key_name" {
  description = "SSH key pair name for EC2 instance access"
  type        = string
}