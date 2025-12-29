output "app_url" {
  value       = "http://${module.ec2.instance_public_ip}:5173"
  description = "URL to access the CloudNexus application"
}

output "instance_ip" {
  value       = module.ec2.instance_public_ip
  description = "Public IP address of the EC2 instance"
}
