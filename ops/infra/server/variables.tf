variable "env" {
  description = "Deployment environment"
  type        = string
  default     = "Dev"
}

variable "region" {
  description = "AWS region for deployment"
  type        = string
  default     = "eu-west-1"
}

variable "project" {
  description = "Name of the project deployment"
  type        = string
  default     = "tmp-project"
}


variable "ec2_ami" {
  description = "AMI ID for the EC2 instance"
  type        = string
  default     = "ami-08f9a9c699d2ab3f9"
}

variable "ec2_type" {
  description = "Instance type for the EC2 instance"
  type        = string
  default     = "t3a.medium"
}


variable "user_home_directory" {
  description = "Path to the user's home directory"
  default     = "/Users/user"
}