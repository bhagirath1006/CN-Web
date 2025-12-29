variable "github_repository" {
  type        = string
  description = "GitHub repository in format 'owner/repo' or '*' for all repos"
  default     = "*"
}


variable "github_org" {
  type    = string
  default = "*"
  description = "GitHub organization"
}
