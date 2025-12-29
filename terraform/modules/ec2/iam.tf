# Reference existing IAM Role for EC2 SSM access
# This role must be created manually in AWS console with SSM policy attached
data "aws_iam_role" "ec2_ssm_role" {
  name = "ec2-ssm-role"
}

# Reference the instance profile
data "aws_iam_instance_profile" "ec2_profile" {
  name = "ec2-ssm-profile"
}
