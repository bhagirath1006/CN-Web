resource "aws_secretsmanager_secret" "app_secrets" {
  name                    = "cloudnexus/app-secrets-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  recovery_window_in_days = 0  # Force immediate deletion of any scheduled secret with same name
  force_overwrite_replica_secret = true
}

resource "aws_secretsmanager_secret_version" "app_secrets" {
  secret_id = aws_secretsmanager_secret.app_secrets.id
  secret_string = jsonencode({
    vault_addr  = var.vault_address
    vault_token = var.vault_token
  })
}
