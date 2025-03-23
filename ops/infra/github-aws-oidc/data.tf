data "aws_ecr_repository" "front-end" {
  name = "tmp-project/frontend"
}

data "aws_ecr_repository" "back-end" {
  name = "tmp-project/backend"
}