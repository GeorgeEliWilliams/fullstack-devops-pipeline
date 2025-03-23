#!/bin/bash
# This script installs the Amazon SSM Agent on a Red Hat instance.
# The region is provided as a templated variable.

set -e

REGION="${region}" # 'region' will be replaced by the Terraform template

echo "Updating system packages..."
sudo yum update -y

echo "Installing Amazon SSM Agent for region $REGION..."
sudo yum install -y "https://s3.$REGION.amazonaws.com/amazon-ssm-$REGION/latest/linux_amd64/amazon-ssm-agent.rpm"

echo "Enabling and starting the amazon-ssm-agent service..."
sudo systemctl enable amazon-ssm-agent
sudo systemctl start amazon-ssm-agent

echo "Amazon SSM Agent installation complete. Verifying service status..."
sudo systemctl status amazon-ssm-agent --no-pager

sudo hostnamectl set-hostname lab-jar


# Install dependencies
sudo yum update -y
sudo yum install -y docker amazon-linux-extras unzip aws-cli

# Enable Docker & start service
sudo systemctl enable docker
sudo systemctl start docker
sudo usermod -aG docker ec2-user  # Allow ec2-user to run Docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose


sudo reboot