variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "vault_address" {
  type        = string
  description = "Vault server address"
}

variable "oidc_provider_arn" {
  type    = string
  default = "arn:aws:iam::360477615168:oidc-provider/token.actions.githubusercontent.com"
}

variable "image_tag" {
  type        = string
  default     = "latest"
  description = "Docker image tag in ECR"
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

variable "vault_token" {
  description = "Vault authentication token"
  type        = string
  sensitive   = true
}