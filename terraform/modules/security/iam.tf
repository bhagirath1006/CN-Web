# Reference existing OIDC Provider for GitHub Actions
data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

# Reference existing IAM Role for GitHub Actions (managed outside Terraform)
data "aws_iam_role" "github_actions" {
  name = "github-actions-role"
}

# Note: IAM policies are managed separately to avoid permission issues
# They are already configured in the AWS console with all necessary permissions
