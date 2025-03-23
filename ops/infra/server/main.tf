resource "aws_instance" "this" {
  ami                         = var.ec2_ami
  instance_type               = var.ec2_type
  iam_instance_profile        = aws_iam_instance_profile.this.name
  key_name                    = aws_key_pair.this.key_name
  subnet_id                   = data.aws_subnet.public.id
  availability_zone           = data.aws_subnet.public.availability_zone
  vpc_security_group_ids      = [aws_security_group.this.id]

  user_data = templatefile("${path.module}/userdata/install_ssm.sh", {
    region = var.region
  })

  associate_public_ip_address = true

  ebs_block_device {
    device_name = "/dev/sda1"
    volume_size = 30
  }

  metadata_options {
    http_tokens = "required"
  }

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${var.project}"
  }
}

resource "tls_private_key" "this" {
  algorithm = "RSA"
}

resource "aws_key_pair" "this" {
  key_name   = "${var.project}-key"
  public_key = tls_private_key.this.public_key_openssh
}

resource "local_sensitive_file" "this" {
  filename        = "${var.user_home_directory}/.ssh/${var.project}-key.pem"
  content         = tls_private_key.this.private_key_pem
  file_permission = "0400"
}
