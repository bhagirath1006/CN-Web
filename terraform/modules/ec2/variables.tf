variable "aws_region" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "security_group_id" {
  type = string
}

variable "docker_image_uri" {
  type = string
}

variable "vault_address" {
  type = string
}

variable "vault_token" {
  type      = string
  sensitive = true
}
#bhagirath