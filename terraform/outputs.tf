output "app_url" {
  value = "http://${aws_instance.app.public_ip}:5173"
}

output "instance_ip" {
  value = aws_instance.app.public_ip
}
