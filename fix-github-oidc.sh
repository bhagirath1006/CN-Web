#!/bin/bash

# Diagnostic script for GitHub OIDC
set -e

ROLE_NAME="github-actions-role"
AWS_ACCOUNT_ID="360477615168"
AWS_REGION="us-east-1"

echo "=========================================="
echo "GitHub OIDC Diagnostics"
echo "=========================================="
echo ""

# Check if role exists
echo "1️⃣ Checking if role exists..."
aws iam get-role --role-name "${ROLE_NAME}" --region "$AWS_REGION" 2>/dev/null && echo "✅ Role exists" || echo "❌ Role does not exist"

# Get current trust policy
echo ""
echo "2️⃣ Current Trust Policy:"
aws iam get-role --role-name "${ROLE_NAME}" --query 'Role.AssumeRolePolicyDocument' --output json --region "$AWS_REGION" | jq .

echo ""
echo "3️⃣ Checking inline policies..."
aws iam list-role-policies --role-name "${ROLE_NAME}" --region "$AWS_REGION" --query 'PolicyNames' --output table

echo ""
echo "=========================================="
echo "Fixing Trust Policy..."
echo "=========================================="

# Create permissive trust policy that will work with GitHub OIDC
cat > /tmp/trust-policy-fixed.json <<'EOF'
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
          "token.actions.githubusercontent.com:sub": "repo:CloudNexus-Org/CN-Web:*"
        }
      }
    }
  ]
}
EOF

echo "Updating trust policy..."
aws iam update-assume-role-policy \
  --role-name "${ROLE_NAME}" \
  --policy-document file:///tmp/trust-policy-fixed.json \
  --region "$AWS_REGION"

echo ""
echo "✅ Trust policy updated!"

# Verify policies are attached
echo ""
echo "4️⃣ Verifying policies..."

# Check if ECR policy exists
if aws iam get-role-policy --role-name "${ROLE_NAME}" --policy-name "github-ecr-policy" --region "$AWS_REGION" 2>/dev/null; then
  echo "✅ ECR policy attached"
else
  echo "❌ ECR policy missing, attaching..."
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
  echo "✅ ECR policy attached"
fi

# Check if Terraform policy exists
if aws iam get-role-policy --role-name "${ROLE_NAME}" --policy-name "github-terraform-policy" --region "$AWS_REGION" 2>/dev/null; then
  echo "✅ Terraform policy attached"
else
  echo "❌ Terraform policy missing, attaching..."
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
  echo "✅ Terraform policy attached"
fi

echo ""
echo "=========================================="
echo "✅ All checks and fixes completed!"
echo "=========================================="
echo ""
echo "Updated Trust Policy:"
aws iam get-role --role-name "${ROLE_NAME}" --query 'Role.AssumeRolePolicyDocument' --output json --region "$AWS_REGION" | jq .

echo ""
echo "Cleanup..."
rm /tmp/trust-policy-fixed.json
