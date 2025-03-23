
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