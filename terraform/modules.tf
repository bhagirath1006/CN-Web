module "security" {
  source = "./modules/security"
}

module "vpc" {
  source = "./modules/vpc"

  aws_region = var.aws_region
}
# bhagat
module "ec2" {
  source = "./modules/ec2"

  aws_region        = var.aws_region
  subnet_id         = module.vpc.subnet_id
  security_group_id = module.security.security_group_id
  docker_image_uri  = var.docker_image_uri
  vault_address     = var.vault_address
  vault_token       = var.vault_token
}

module "vault" {
  source = "./modules/vault"

  vault_address = var.vault_address
  vault_token   = var.vault_token
}
