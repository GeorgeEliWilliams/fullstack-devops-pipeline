variable "project" {
  type    = string
  default = "tmp-project"
}

variable "env" {
  type    = string
  default = "Dev"
  
}

variable "github_repo" {
   default = "fullstack-devops-pipeline" 
}
  

variable "github_owner" {
  description = "GitHub organization or user"
  type        = string
  default     = "GeorgeEliWilliams"
}

variable "github_service_repo" {
  description = "GitHub repository name"
  type        = string
  default     = "fullstack-devops-pipeline"
}