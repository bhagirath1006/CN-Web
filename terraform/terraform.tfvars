aws_region       = "us-east-1"
environment      = "production"
project_name     = "cloudnexus"
git_branch       = "feature/bhagirath"
app_name         = "cloudnexus-web"
container_port   = 5173
instance_type    = "t3.medium"
vpc_cidr         = "10.0.0.0/16"

# These values must be set before running terraform apply
vault_address    = "https://vault.example.com:8200"
vault_token      = "s.xxxxxxxxxxxxxxxx"
docker_image_uri = "123456789.dkr.ecr.us-east-1.amazonaws.com/cloudnexus-web:latest"
enable_vault     = true
