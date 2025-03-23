#!/bin/bash

set -e

# Navigate to the project directory
cd "$PROJECT_DIR"

# Authenticate Docker to the Amazon ECR registry
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$REGISTRY"

# Pull the latest image for the specified service
docker-compose pull "$SERVICE"

# Recreate and start the specified service
docker-compose up --no-deps -d "$SERVICE"