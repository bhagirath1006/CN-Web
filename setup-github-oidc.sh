#!/bin/bash

# This script sets up GitHub OIDC authentication with AWS
# Run this ONCE locally with AWS admin credentials
# It will:
# 1. Create the OIDC provider if it doesn't exist
# 2. Create the github-actions-role with correct trust policy
# 3. Attach necessary policies for GitHub Actions to work

set -e

ROLE_NAME="github-actions-role"
OIDC_PROVIDER_URL="token.actions.githubusercontent.com"
AWS_ACCOUNT_ID="360477615168"
GITHUB_REPO_OWNER="CloudNexus-Org"
GITHUB_REPO_NAME="CN-Web"

echo "=========================================="
echo "Setting up GitHub OIDC authentication"
echo "=========================================="

# Create OIDC provider if it doesn't exist
echo "Creating OIDC provider..."
aws iam create-open-id-connect-provider \
  --url "https://${OIDC_PROVIDER_URL}" \
  --client-id-list "sts.amazonaws.com" \
  --thumbprint-list "6938fd4d98bab03faadb97b34396831e3780aea1" "1c58a3a8518e8759bf075b76b750d4f2df264fcd" \
  2>/dev/null || echo "OIDC provider already exists"

OIDC_PROVIDER_ARN="arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/${OIDC_PROVIDER_URL}"

# Create the trust policy document
cat > /tmp/trust-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "${OIDC_PROVIDER_ARN}"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "${OIDC_PROVIDER_URL}:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "${OIDC_PROVIDER_URL}:sub": "repo:${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}:*"
        }
      }
    }
  ]
}
EOF

# Create or update the role
echo "Creating IAM role..."
aws iam create-role \
  --role-name "${ROLE_NAME}" \
  --assume-role-policy-document file:///tmp/trust-policy.json \
  2>/dev/null || echo "Role already exists, updating trust policy..."

# Update the trust policy if role exists
aws iam update-assume-role-policy \
  --role-name "${ROLE_NAME}" \
  --policy-document file:///tmp/trust-policy.json

echo "Attaching policies to role..."

# Policy for ECR operations
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
          "ecr:CreateRepository"
        ],
        "Resource": "*"
      }
    ]
  }'

# Policy for Terraform operations
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
          "vpc:*",
          "subnet:*",
          "security-group:*",
          "internet-gateway:*",
          "route-table:*",
          "network-interface:*",
          "elastic-ip:*"
        ],
        "Resource": "*"
      }
    ]
  }'

echo "=========================================="
echo "✅ GitHub OIDC setup completed!"
echo "=========================================="
echo "Role ARN: ${OIDC_PROVIDER_ARN}"
echo "Role Name: ${ROLE_NAME}"
echo ""
echo "Verify the setup:"
echo "  aws iam get-role --role-name ${ROLE_NAME}"
echo ""

# Cleanup
rm /tmp/trust-policy.json

