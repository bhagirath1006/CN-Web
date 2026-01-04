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

  aws_region      = var.aws_region
  subnet_id       = module.vpc.subnet_id
  security_group_id = module.vpc.security_group_id
  ecr_registry    = module.ecr.registry_url
  ecr_repository  = module.ecr.repository_name
  image_tag       = var.image_tag
  vault_address   = var.vault_address
  key_name        = var.key_name
}

module "vault" {
  source = "./modules/vault"

  vault_address = var.vault_address
  vault_token   = var.vault_token 
}