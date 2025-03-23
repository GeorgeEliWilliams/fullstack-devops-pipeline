resource "aws_iam_role" "this" {
  name = "${var.project}-InstanceRole"

  assume_role_policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "ec2.amazonaws.com"
        },
        "Action" : "sts:AssumeRole"
      }
    ]
  })

  tags = {
    Name = "${var.env}-${var.project}-InstanceRole"
  }
}

resource "aws_iam_role_policy_attachment" "this" {
  for_each = {
    ssm_core_policy        = "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
    ssm_association_policy = "arn:aws:iam::aws:policy/AmazonSSMPatchAssociation"
    ecr_policy             = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryFullAccess"
  }

  policy_arn = each.value
  role       = aws_iam_role.this.name
}


resource "aws_iam_instance_profile" "this" {
  name = "${var.project}-InstanceProfile"
  role = aws_iam_role.this.name
}
