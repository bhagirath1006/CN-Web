# Reference existing OIDC Provider for GitHub Actions
data "aws_iam_openid_connect_provider" "github" {
  url = "https://token.actions.githubusercontent.com"
}

# Reference existing IAM Role for GitHub Actions (managed outside Terraform)
data "aws_iam_role" "github_actions" {
  name = "github-actions-role"
}

# Policy for ECR access
resource "aws_iam_role_policy" "github_ecr" {
  name = "github-ecr-policy"
  role = data.aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:BatchCheckLayerAvailability",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload"
        ]
        Resource = "*"
      }
    ]
  })
}

# Policy for Terraform
resource "aws_iam_role_policy" "github_terraform" {
  name = "github-terraform-policy"
  role = data.aws_iam_role.github_actions.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ec2:*",
          "ecr:*",
          "ecs:*",
          "s3:*",
          "dynamodb:*",
          "secretsmanager:*",
          "vpc:*",
          "tags:*"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "iam:PassRole",
          "iam:GetRole",
          "iam:ListOpenIDConnectProviders",
          "iam:GetOpenIDConnectProvider"
        ]
        Resource = "*"
      }
    ]
  })
}
