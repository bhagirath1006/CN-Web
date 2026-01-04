#!/bin/bash

# This script sets up GitHub OIDC authentication with AWS
# Run this ONCE locally with AWS admin credentials with admin permissions

set -e

ROLE_NAME="github-actions-role"
OIDC_PROVIDER_URL="token.actions.githubusercontent.com"
AWS_ACCOUNT_ID="360477615168"
GITHUB_REPO_OWNER="CloudNexus-Org"
GITHUB_REPO_NAME="CN-Web"
AWS_REGION="us-east-1"

echo "=========================================="
echo "Setting up GitHub OIDC authentication"
echo "=========================================="
echo "Account ID: $AWS_ACCOUNT_ID"
echo "Region: $AWS_REGION"
echo "========================================"

# Create OIDC provider if it doesn't exist
echo "Step 1: Creating OIDC provider..."
aws iam create-open-id-connect-provider \
  --url "https://${OIDC_PROVIDER_URL}" \
  --client-id-list "sts.amazonaws.com" \
  --thumbprint-list "6938fd4d98bab03faadb97b34396831e3780aea1" "1c58a3a8518e8759bf075b76b750d4f2df264fcd" \
  --region "$AWS_REGION" \
  2>/dev/null || echo "OIDC provider already exists"

OIDC_PROVIDER_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/${OIDC_PROVIDER_URL}"

echo "OIDC Provider ARN: $OIDC_PROVIDER_ARN"

# Create the trust policy document with correct configuration
cat > /tmp/trust-policy.json <<'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::360477615168:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": [
            "repo:CloudNexus-Org/CN-Web:*",
            "repo:CloudNexus-Org/CN-Web:ref:refs/heads/main"
          ]
        }
      }
    }
  ]
}
EOF

# Create or update the role
echo "Step 2: Creating/updating IAM role..."
if aws iam get-role --role-name "${ROLE_NAME}" --region "$AWS_REGION" 2>/dev/null; then
  echo "Role already exists, updating trust policy..."
  aws iam update-assume-role-policy \
    --role-name "${ROLE_NAME}" \
    --policy-document file:///tmp/trust-policy.json \
    --region "$AWS_REGION"
else
  echo "Creating new role..."
  aws iam create-role \
    --role-name "${ROLE_NAME}" \
    --assume-role-policy-document file:///tmp/trust-policy.json \
    --region "$AWS_REGION"
fi

echo "Step 3: Attaching ECR policy..."
aws iam put-role-policy \
  --role-name "${ROLE_NAME}" \
  --policy-name "github-ecr-policy" \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:CreateRepository",
          "ecr:DescribeRepositories",
          "ecr:ListImages"
        ],
        "Resource": "*"
      }
    ]
  }' \
  --region "$AWS_REGION"

echo "Step 4: Attaching Terraform/Infrastructure policy..."
aws iam put-role-policy \
  --role-name "${ROLE_NAME}" \
  --policy-name "github-terraform-policy" \
  --policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": [
          "ec2:*",
          "ecr:*",
          "secretsmanager:*",
          "iam:*",
          "s3:*",
          "sts:AssumeRole"
        ],
        "Resource": "*"
      }
    ]
  }' \
  --region "$AWS_REGION"

# Get the actual role ARN
ROLE_ARN=$(aws iam get-role --role-name "${ROLE_NAME}" --query 'Role.Arn' --output text --region "$AWS_REGION")

echo ""
echo "=========================================="
echo "✅ GitHub OIDC setup completed!"
echo "=========================================="
echo ""
echo "📋 SAVE THESE VALUES:"
echo "   Role Name: ${ROLE_NAME}"
echo "   Role ARN: ${ROLE_ARN}"
echo ""
echo "🔑 Add this to GitHub Secrets:"
echo "   Secret Name: AWS_ROLE_ARN"
echo "   Secret Value: ${ROLE_ARN}"
echo ""
echo "✅ Verify trust relationship:"
aws iam get-role --role-name "${ROLE_NAME}" --query 'Role.AssumeRolePolicyDocument' --output json --region "$AWS_REGION"

echo ""
echo "Cleanup..."
rm /tmp/trust-policy.json

