resource "aws_secretsmanager_secret" "app_secrets" {
  name = "cloudnexus/app-secrets"
}

resource "aws_secretsmanager_secret_version" "app_secrets" {
  secret_id = aws_secretsmanager_secret.app_secrets.id
  secret_string = jsonencode({
    vault_addr  = var.vault_address
    vault_token = var.vault_token
  })
}
