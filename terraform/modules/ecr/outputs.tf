output "registry_url" {
  value       = aws_ecr_repository.app.repository_url
  description = "ECR registry URL (e.g., 123456789.dkr.ecr.us-east-1.amazonaws.com)"
}

output "repository_name" {
  value       = aws_ecr_repository.app.name
  description = "Name of the ECR repository"
}

output "repository_arn" {
  value       = aws_ecr_repository.app.arn
  description = "ARN of the ECR repository"
}
