# Hardcoded OIDC Provider ARN (already exists in AWS)
locals {
  oidc_provider_arn = "arn:aws:iam::360477615168:oidc-provider/token.actions.githubusercontent.com"
}

# Reference existing IAM Role for GitHub Actions (created manually, not via Terraform)
data "aws_iam_role" "github_actions" {
  name = "github-actions-role"
}
