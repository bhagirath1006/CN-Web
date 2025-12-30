terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# Root Module - Orchestrates all infrastructure modules

module "security" {
  source = "./modules/security"
  
  vpc_id                  = module.vpc.vpc_id
  github_repository_owner = "CloudNexus-Org"
  github_repository_name  = "CN-Web"
}

module "vpc" {
  source = "./modules/vpc"

  aws_region = var.aws_region
}

module "ecr" {
  source = "./modules/ecr"

  repository_name = "cloudnexus-web"
}

module "ec2" {
  source = "./modules/ec2"

  aws_region        = var.aws_region
  subnet_id         = module.vpc.subnet_id
  security_group_id = module.security.security_group_id
  docker_image_uri  = var.docker_image_uri
  vault_address     = var.vault_address
  vault_token       = var.vault_token
  key_name          = var.key_name
}

module "vault" {
  source = "./modules/vault"

  vault_address = var.vault_address
  vault_token   = var.vault_token
}