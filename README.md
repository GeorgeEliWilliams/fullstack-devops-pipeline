# Scalable DevOps Pipeline: Docker, Terraform, AWS & GitHub Actions

The Project is a fully containerized full-stack web application utilizing Docker, Terraform for Infrastructure-as-Code (IaC),AWS for cloud resources and CI/CD with GitHub Actions. The architecture ensures scalability, automation, and seamless deployment to AWS.

## **Tech Stack**
- **Frontend**: Next.js (React)
- **Backend**: Laravel (PHP)
- **Containerization**: Docker & Docker Compose
- **Infrastructure**: Terraform (AWS EC2, S3, IAM, ECR, KMS, API Gateway)
- **CI/CD Pipeline**: GitHub Actions (ECR, AWS Systems Manager)
- **Deployment Target**: AWS EC2 with Docker Compose

## **Infrastructure as Code (Terraform)**

The project uses Terraform to define and provision cloud infrastructure. Key AWS resources include:
- **EC2 Instance**: Hosts the containerized application.
- **Elastic Container Registry (ECR)**: Stores Docker images for the frontend and backend.
- **S3 Bucket**: Stores static assets and Terraform state.
- **IAM Roles & Policies**: Secure access management.

## **Setup & Deployment**

1. **Initialize Terraform**

   ```bash
   terraform init 
   ```

2. **Plan Infrastructure Changes**

   ```bash
   terraform plan
   ```

3. **Apply Infrastructure Changes**

   ```bash
   terraform apply -auto-approve
   ```

4. **Destroy Infrastructure**

   ```bash
   terraform destroy -auto-approve
   ```

## **Docker Setup**

Both frontend and backend are Dockerized for consistency across development and production environments.

**Docker Commands**

- Build & Run the Application Locally:

   ```bash
   docker-compose up --build -d
   ```

- Stop and Remove Containers:

   ```bash
   docker-compose down
   ```

- Push Docker Image to AWS ECR:

   ```bash
   aws ecr get-login-password --region <region> | docker login --username AWS --password-stdin <ecr-repo-url>
   docker tag frontend:latest <ecr-repo-url>:latest
   docker push <ecr-repo-url>:latest
   ```

## **CI/CD with GitHub Actions**

This project employs GitHub Actions for automated testing, building, and deployment. The workflow follows:

1. **Continuous Integration (CI)**:

- Triggers on push events to dev.
- Builds Docker images for frontend and backend.
- Tags images with semantic versioning.
- Pushes images to AWS ECR.

2. **Continuous Deployment (CD)**:

- Triggers after a successful CI pipeline.
- Uses AWS Systems Manager (SSM) to deploy new images on EC2.
- Pulls the latest image and restarts the containerized service.


## **Contributing**

1. Fork the repository.
2. Create a feature branch: git checkout -b feature-name.
3. Commit your changes: git commit -m "Add feature"
4. Push the branch: git push origin feature-name
5. Submit a pull request.
