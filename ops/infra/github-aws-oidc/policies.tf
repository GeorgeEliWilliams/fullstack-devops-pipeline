# Attach Policies
resource "aws_iam_policy" "ecr" {
  name        = "${var.project}-${var.env}-github-actions-policy"
  path        = "/"
  description = "Allow pushing images to ECR and EC2/SSM actions"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:BatchCheckLayerAvailability",
          "ecr:PutImage",
          "ecr:InitiateLayerUpload",
          "ecr:UploadLayerPart",
          "ecr:CompleteLayerUpload",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage",
          "ecr:ListImages",
        ]
        Resource = [
          data.aws_ecr_repository.front-end.arn,
          data.aws_ecr_repository.back-end.arn,
        ]
      },
      {
        Effect   = "Allow"
        Action   = "ecr:GetAuthorizationToken"
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ec2:DescribeInstances",
          "ssm:SendCommand",
          "ssm:ListCommandInvocations",
          "ssm:DescribeInstanceInformation",
        ]
        Resource = "*"
      }
    ]
  })

  tags = {
    Name = "${var.project}-${var.env}-github-actions-policy"
  }
}

resource "aws_iam_role_policy_attachment" "ecr" {
  role       = aws_iam_role.oidc.name
  policy_arn = aws_iam_policy.ecr.arn
}