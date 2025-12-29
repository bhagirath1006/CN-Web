variable "github_repository_owner" {
  type        = string
  description = "GitHub repository owner (organization or username)"
  default     = "*"
}

variable "github_repository_name" {
  type        = string
  description = "GitHub repository name"
  default     = "*"
}

variable "vpc_id" {
  type        = string
  description = "VPC ID where security group will be created"
  default     = null
}

