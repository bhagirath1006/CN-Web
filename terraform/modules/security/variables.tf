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

variable "github_environments" {
  type        = list(string)
  description = "List of GitHub environments allowed to assume the role (leave empty to allow all)"
  default     = []
}

