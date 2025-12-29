output "security_group_id" {
  value = aws_security_group.app.id
}

output "github_actions_role_arn" {
  value       = aws_iam_role.github_actions.arn
  description = "ARN of the GitHub Actions IAM role"
}

output "github_actions_role_name" {
  value       = aws_iam_role.github_actions.name
  description = "Name of the GitHub Actions IAM role"
}

output "oidc_provider_arn" {
  value       = aws_iam_openid_connect_provider.github.arn
  description = "ARN of the GitHub OIDC provider"
}
