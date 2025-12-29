# Deployment Guide - CloudNexus Web

## Overview

This document describes how to deploy CloudNexus Web application to AWS EC2 using Docker containers, Terraform modules, and HashiCorp Vault for secrets management.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    GitHub Actions                    │
│         (Build, Test, Deploy Workflow)              │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │   Docker Registry   │
        │      (ECR)          │
        └────────┬───────────┘
                 │
                 ▼
    ┌────────────────────────────────┐
    │      Terraform Modules         │
    │  ├─ Networking (VPC, ALB)      │
    │  ├─ Security (IAM, SG)         │
    │  ├─ Compute (EC2)              │
    │  └─ Vault (Secrets, KMS)       │
    └────────────┬────────────────────┘
                 │
                 ▼
    ┌──────────────────────────────────┐
    │          AWS EC2 Instance         │
    │  ┌──────────────────────────────┐ │
    │  │   Docker Container           │ │
    │  │   CloudNexus Web App         │ │
    │  └──────────────────────────────┘ │
    │                                    │
    │  ┌──────────────────────────────┐ │
    │  │  Vault Agent (Secret Mgmt)   │ │
    │  └──────────────────────────────┘ │
    └───────────┬─────────────────────────┘
                │
                ▼
    ┌────────────────────────┐
    │ HashiCorp Vault Server │
    │ (Secrets Management)   │
    └────────────────────────┘
```

## Prerequisites

### Local Development
- Docker & Docker Compose
- Node.js 18+
- Terraform 1.5+
- AWS CLI v2
- Git

### AWS Account Setup
- AWS credentials configured
- ECR repository created
- IAM roles configured
- S3 bucket for Terraform state (optional but recommended)
- DynamoDB table for Terraform locks (optional but recommended)

### Vault Setup
- HashiCorp Vault instance running
- Vault token with appropriate permissions
- Secrets mounted at `secret/data/cloudnexus/app`

## Local Development with Docker Compose

### Start the Application Locally

```bash
# Clone the repository
git clone <repository-url>
cd CN-Web-main

# Build and start services
docker-compose up -d

# Check service status
docker-compose ps

# View logs
docker-compose logs -f app
docker-compose logs -f vault
```

### Access Local Services

- **Application**: http://localhost:5173
- **Vault**: http://localhost:8200 (Token: `myroot`)

### Stop Services

```bash
docker-compose down
```

## Deployment to AWS

### Step 1: Prepare AWS Account

```bash
# Set AWS credentials
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
export AWS_REGION="us-east-1"

# Create ECR repository
aws ecr create-repository --repository-name cloudnexus-web --region us-east-1
```

### Step 2: Configure GitHub Secrets

Add the following secrets to your GitHub repository settings:

```
AWS_ROLE_ARN              # ARN of the IAM role for GitHub Actions
TF_STATE_BUCKET          # S3 bucket for Terraform state
VAULT_ADDR               # Vault server address (e.g., https://vault.example.com:8200)
VAULT_TOKEN              # Vault authentication token
```

### Step 3: Create Feature Branch

```bash
# Create and switch to feature branch
git checkout -b feature/bhagirath

# Make your changes
git add .
git commit -m "Add deployment configuration"

# Push the branch
git push origin feature/bhagirath
```

### Step 4: Create Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select `feature/bhagirath` as the compare branch
4. Fill in PR details
5. Create PR

The PR checks will automatically run:
- ESLint validation
- Docker build test
- Terraform validation
- Security scanning with Trivy

### Step 5: Deploy to Production

#### Option A: Via GitHub Actions (Recommended)

Once PR is merged to `main`:

```bash
# Merge PR to main
git checkout main
git pull origin main

# GitHub Actions will automatically:
# 1. Build Docker image
# 2. Push to ECR
# 3. Deploy with Terraform
```

#### Option B: Manual Deployment

```bash
# Navigate to Terraform directory
cd terraform

# Copy and edit the variables file
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values

# Initialize Terraform
terraform init \
  -backend-config="bucket=your-tf-state-bucket" \
  -backend-config="key=cloudnexus/terraform.tfstate" \
  -backend-config="region=us-east-1"

# Validate configuration
terraform validate

# Plan deployment
terraform plan -out=tfplan

# Apply deployment
terraform apply tfplan

# Get outputs
terraform output
```

## Terraform Module Details

### Networking Module (`terraform/modules/networking/`)
- Creates VPC with public and private subnets
- Sets up Application Load Balancer (ALB)
- Configures security groups for ALB and EC2
- Manages Internet Gateway and route tables

**Key Resources:**
- VPC, Subnets, IGW, Route Tables
- ALB with target group and listener
- Security groups for ALB and EC2

### Security Module (`terraform/modules/security/`)
- Creates IAM roles for EC2 instances
- Sets up IAM policies for AWS services access
- Configures Vault role for secret management
- Provides instance profile for EC2

**Key Resources:**
- IAM roles and policies
- Instance profiles
- Permission management

### Compute Module (`terraform/modules/compute/`)
- Launches EC2 instance with Ubuntu 22.04
- Configures user data script for Docker setup
- Sets up CloudWatch logging
- Attaches instance to ALB

**Key Resources:**
- EC2 instance
- CloudWatch log group
- Target group attachment

### Vault Module (`terraform/modules/vault/`)
- Creates AWS Secrets Manager secret
- Sets up KMS encryption key
- Configures DynamoDB backend for Vault (optional)
- Creates CloudWatch log group for Vault

**Key Resources:**
- Secrets Manager secret
- KMS key and alias
- DynamoDB table (optional)
- CloudWatch logs

## Accessing the Deployment

After deployment, access your application:

```bash
# Get the load balancer DNS
terraform output load_balancer_dns

# Get the EC2 instance IP
terraform output ec2_instance_ip
```

Visit: `http://<load-balancer-dns>`

## Managing Secrets with Vault

### Store Secrets

```bash
# Login to Vault
vault login -method=token token=your-token

# Store application secrets
vault kv put secret/cloudnexus/app \
  api_key="your-api-key" \
  database_url="your-db-url" \
  jwt_secret="your-jwt-secret"
```

### Retrieve Secrets from EC2

The EC2 instance automatically retrieves secrets via the user data script:

```bash
# SSH into EC2 instance
ssh -i your-key.pem ubuntu@<instance-ip>

# View running container
docker ps

# View container logs
docker logs cloudnexus-web
```

## Monitoring and Logs

### CloudWatch Logs

```bash
# View EC2 application logs
aws logs tail /aws/ec2/cloudnexus --follow

# View Vault logs
aws logs tail /aws/vault/cloudnexus --follow
```

### Application Health

```bash
# Check application status
curl http://<load-balancer-dns>/

# Check container health
docker inspect --format='{{.State.Health.Status}}' cloudnexus-web
```

## Scaling and Updates

### Update Application Code

1. Push changes to `feature/bhagirath` branch
2. Create PR with desired changes
3. Once approved and merged to `main`:
   - GitHub Actions builds new Docker image
   - Image pushed to ECR
   - Terraform updates EC2 with new image

### Scale EC2 Instance

Edit `terraform/terraform.tfvars`:

```hcl
instance_type = "t3.large"  # Change instance type
```

Then apply:

```bash
cd terraform
terraform apply
```

### Update Secrets

```bash
# Update in Vault
vault kv put secret/cloudnexus/app new_key="new_value"

# Restart container to pick up changes
ssh -i your-key.pem ubuntu@<instance-ip>
docker restart cloudnexus-web
```

## Cleanup and Destruction

### Remove All Infrastructure

```bash
cd terraform
terraform destroy

# Confirm with 'yes' when prompted
```

### Manual Steps After Terraform Destroy

```bash
# Remove ECR image
aws ecr delete-repository \
  --repository-name cloudnexus-web \
  --force \
  --region us-east-1

# Remove Secrets Manager secret
aws secretsmanager delete-secret \
  --secret-id cloudnexus/app-secrets \
  --force-delete-without-recovery
```

## Troubleshooting

### Deployment Fails

```bash
# Check Terraform logs
cd terraform
terraform plan -no-color > plan.log

# Check GitHub Actions logs
# View in GitHub UI: Actions tab

# Check EC2 user data script
aws ec2 describe-instances --filters "Name=tag:Name,Values=cloudnexus-instance" \
  --query 'Reservations[0].Instances[0].UserData'
```

### Application Not Starting

```bash
# SSH into EC2
ssh -i your-key.pem ubuntu@<instance-ip>

# Check Docker logs
docker logs cloudnexus-web

# Check system logs
tail -f /var/log/app-startup.log

# Restart container
docker restart cloudnexus-web
```

### Vault Connection Issues

```bash
# Verify Vault token
curl -s -H "X-Vault-Token: your-token" \
  https://vault.example.com:8200/v1/auth/token/lookup-self

# Check network connectivity
curl -I https://vault.example.com:8200

# Verify IAM permissions
aws iam get-role --role-name cloudnexus-vault-role
```

## Security Best Practices

1. **Secrets Management**
   - Always use Vault for sensitive data
   - Rotate tokens regularly
   - Use AWS Secrets Manager for backup

2. **Network Security**
   - Use security groups to restrict access
   - Enable VPC Flow Logs for monitoring
   - Use SSL/TLS for all communications

3. **IAM Security**
   - Use least privilege principle
   - Enable MFA for AWS console access
   - Audit IAM permissions regularly

4. **Container Security**
   - Scan images for vulnerabilities
   - Use read-only file systems when possible
   - Run containers as non-root user

5. **Terraform State**
   - Store state in S3 with encryption
   - Enable versioning on S3 bucket
   - Use DynamoDB for state locking
   - Restrict access to state files

## Support and Documentation

- [Terraform AWS Provider](https://registry.terraform.io/providers/hashicorp/aws/latest/docs)
- [HashiCorp Vault Documentation](https://www.vaultproject.io/docs)
- [AWS EC2 User Guide](https://docs.aws.amazon.com/ec2/)
- [Docker Documentation](https://docs.docker.com/)
