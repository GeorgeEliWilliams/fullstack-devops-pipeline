resource "aws_ecr_repository" "this" {
  name                 = "${var.project}/frontend"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Name        = "${var.project}-${var.env}-frontend-Repository"
  }
}



