# Attach Policies
resource "aws_iam_policy" "ecr" {
  name = "${var.project}-${var.env}-github-actions-ecr-policy"
  path        = "/"
  description = "Allow to push images to ecr"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:ListImages",
        ],
       Resource = [ data.aws_ecr_repository.this.arn]

      },
      {
        Sid : "VisualEditor1",
        Effect : "Allow",
        Action : "ecr:GetAuthorizationToken",
        Resource : "*"
      }
    ]
  })

  tags = {
      Name = "${var.project}-${var.env}-github-actions-ecr-policy"
    }
  
}

resource "aws_iam_role_policy_attachment" "ecr" {
  role       = aws_iam_role.oidc.name
  policy_arn = aws_iam_policy.ecr.arn
}