variable "aws_region" {
  type = string
}

variable "github_repository_owner" {
  type        = string
  description = "GitHub repository owner (organization or username)"
  default     = "CloudNexus-Org"
}

variable "github_repository_name" {
  type        = string
  description = "GitHub repository name"
  default     = "CN-Web"
}
