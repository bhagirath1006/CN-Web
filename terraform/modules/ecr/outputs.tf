output "repository_url" {
  value       = data.aws_ecr_repository.app.repository_url
  description = "URL of the ECR repository"
}

output "repository_name" {
  value       = data.aws_ecr_repository.app.name
  description = "Name of the ECR repository"
}

output "repository_arn" {
  value       = data.aws_ecr_repository.app.arn
  description = "ARN of the ECR repository"
}
