output "secrets_manager_secret_id" {
  value = aws_secretsmanager_secret.app_secrets.id
}
