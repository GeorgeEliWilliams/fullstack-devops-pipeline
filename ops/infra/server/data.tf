data "http" "my_ip" {
  url = "https://api.ipify.org"
}

data "aws_vpc" "this" {
  filter {
    name   = "tag:Name"
    values = ["default-vpc"]
  }
}

data "aws_subnet" "public" {
  filter {
    name   = "tag:Name"
    values = ["public-subnet-1c"]
  }
}