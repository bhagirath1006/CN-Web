# CloudNexus Web Infrastructure

Complete infrastructure-as-code setup for deploying CloudNexus Web to AWS EC2 with Docker, Terraform, and HashiCorp Vault.

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint
```

### Docker Setup

```bash
# Build Docker image
docker build -t cloudnexus:latest .

# Run with docker-compose (includes Vault)
docker-compose up -d

# Access application
open http://localhost:5173
```

### Deployment to AWS

```bash
# Navigate to terraform directory
cd terraform

# Copy and configure variables
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your AWS and Vault details

# Initialize Terraform
terraform init

# Plan deployment
terraform plan

# Apply configuration
terraform apply
```

## Directory Structure

```
.
├── .github/
│   └── workflows/
│       ├── deploy.yml          # Main deployment workflow
│       └── pr-checks.yml       # PR validation checks
├── terraform/
│   ├── main.tf                 # Root configuration
│   ├── variables.tf            # Input variables
│   ├── outputs.tf              # Output values
│   ├── modules.tf              # Module definitions
│   ├── terraform.tfvars.example # Example terraform variables
│   └── modules/
│       ├── networking/         # VPC, subnets, security groups
│       ├── compute/            # EC2, user data, CloudWatch
│       ├── security/           # IAM roles, policies
│       └── vault/              # Secrets Manager, KMS
├── src/
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   ├── App.jsx                 # Main app component
│   └── main.jsx                # Entry point
├── Dockerfile                  # Multi-stage Docker build
├── docker-compose.yml          # Docker compose for local testing
├── DEPLOYMENT.md               # Detailed deployment guide
└── package.json                # Node dependencies
```

## Features

### Infrastructure as Code
- **Terraform Modules**: Organized, reusable infrastructure components
- **Version Control**: All infrastructure tracked in Git
- **State Management**: Remote state support with S3 backend

### Containerization
- **Multi-stage Docker Build**: Optimized image size
- **Docker Compose**: Local development with Vault integration
- **Health Checks**: Container health monitoring

### High Availability
- **Application Load Balancer**: Distributes traffic
- **Auto-Healing**: EC2 instance health monitoring
- **CloudWatch Logs**: Centralized logging

### Security
- **HashiCorp Vault**: Secrets management
- **IAM Roles**: Fine-grained AWS permissions
- **KMS Encryption**: Data encryption at rest
- **Secrets Manager**: AWS native secrets storage
- **Security Groups**: Network access control

### CI/CD Pipeline
- **GitHub Actions**: Automated deployment
- **Code Quality Checks**: ESLint, build validation
- **Security Scanning**: Dependencies and container scanning
- **Terraform Validation**: Infrastructure code quality
- **Docker Image Registry**: ECR integration

## Configuration

### Environment Variables

Create a `.env` file for local development:

```env
VITE_APP_API_URL=http://localhost:8200
NODE_ENV=development
```

### Terraform Variables

Edit `terraform/terraform.tfvars`:

```hcl
aws_region     = "us-east-1"
environment    = "production"
project_name   = "cloudnexus"
app_name       = "cloudnexus-web"
instance_type  = "t3.medium"
container_port = 5173
vault_address  = "https://your-vault-instance.com:8200"
vault_token    = "your-vault-token"
docker_image_uri = "your-account-id.dkr.ecr.us-east-1.amazonaws.com/cloudnexus:latest"
```

### GitHub Secrets

Configure in GitHub repository settings:

- `AWS_ROLE_ARN`: IAM role for OIDC provider
- `VAULT_ADDRESS`: Vault server URL
- `VAULT_TOKEN`: Vault authentication token
- `SLACK_WEBHOOK_URL`: (Optional) Slack notifications

## Deployment

### Manual Deployment

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### Automated Deployment (GitHub Actions)

1. Create feature branch:
   ```bash
   git checkout -b feature/bhagirath
   ```

2. Make changes and commit:
   ```bash
   git add .
   git commit -m "feat: deployment infrastructure"
   ```

3. Push and create PR:
   ```bash
   git push origin feature/bhagirath
   ```

4. GitHub Actions will:
   - Run code quality checks
   - Validate Terraform
   - Build Docker image
   - Deploy to EC2 (on merge to main)

## Monitoring

### Application Health

```bash
# Get load balancer DNS
terraform output load_balancer_dns

# Test application
curl http://<load-balancer-dns>
```

### Logs

```bash
# Docker logs (local)
docker logs cloudnexus-web

# EC2 logs
aws logs tail /aws/ec2/cloudnexus --follow

# Application logs
ssh ubuntu@<ec2-public-ip>
docker logs cloudnexus-web
```

### Metrics

CloudWatch metrics available:
- EC2 CPU utilization
- Network in/out
- ALB request count
- Target response time

## Scaling

### Vertical Scaling

Increase instance type:
```bash
# Edit terraform.tfvars
instance_type = "t3.large"

# Apply
terraform apply
```

### Horizontal Scaling

Update for Auto Scaling Group (future enhancement):
```hcl
desired_capacity = 3
min_size         = 2
max_size         = 5
```

## Cost Estimation

Approximate monthly costs (US East 1):
- **EC2 t3.medium**: ~$30
- **Load Balancer**: ~$16
- **Secrets Manager**: ~$0.40
- **CloudWatch**: ~$5
- **Data Transfer**: Variable

**Total**: ~$50-100/month (varies by usage)

## Troubleshooting

### Deployment Fails

1. Check Terraform plan:
   ```bash
   terraform plan -out=tfplan
   ```

2. Verify AWS credentials:
   ```bash
   aws sts get-caller-identity
   ```

3. Check GitHub Actions logs

### Application Not Running

1. Check EC2 instance:
   ```bash
   aws ec2 describe-instances --filters "Name=tag:Name,Values=cloudnexus-instance"
   ```

2. SSH and check Docker:
   ```bash
   ssh ubuntu@<public-ip>
   docker ps -a
   docker logs cloudnexus-web
   ```

3. Check security groups allow traffic

### Vault Connection Issues

1. Verify Vault is accessible:
   ```bash
   curl $VAULT_ADDR/v1/sys/health
   ```

2. Check IAM role has Vault permissions

3. Verify token is valid:
   ```bash
   curl -H "X-Vault-Token: $VAULT_TOKEN" $VAULT_ADDR/v1/auth/token/lookup-self
   ```

## See Also

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Docker Documentation](https://docs.docker.com/)
- [HashiCorp Vault](https://www.vaultproject.io/)

## License

[Your License Here]

## Support

For issues and questions:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting section
2. Review GitHub Actions logs
3. Check infrastructure logs in CloudWatch
4. Open GitHub issue with details
