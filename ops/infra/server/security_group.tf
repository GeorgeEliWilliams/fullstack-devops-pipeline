resource "aws_security_group" "this" {
  name   = "${var.env}-${var.project}-SG"
  vpc_id = data.aws_vpc.this.id

  tags = {
    Name = "${var.env}-${var.project}-SG"
  }
}
