#!/bin/bash
# Setup script to create IAM resources that GitHub Actions can't manage
# Run this manually once before deploying with Terraform

echo "Creating EC2 SSM Role..."

# Create the role
aws iam create-role \
  --role-name ec2-ssm-role \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "ec2.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }' 2>/dev/null || echo "Role already exists"

# Attach the SSM policy
aws iam attach-role-policy \
  --role-name ec2-ssm-role \
  --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore

# Create instance profile
aws iam create-instance-profile \
  --instance-profile-name ec2-ssm-profile 2>/dev/null || echo "Instance profile already exists"

# Add role to instance profile
aws iam add-role-to-instance-profile \
  --instance-profile-name ec2-ssm-profile \
  --role-name ec2-ssm-role 2>/dev/null || echo "Role already in instance profile"

echo "✓ EC2 SSM role and instance profile created successfully!"
echo "You can now run: terraform apply"
