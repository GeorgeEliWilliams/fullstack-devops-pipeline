# Use a lightweight Node.js image for building the frontend
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application files
COPY . .

# Build the frontend
RUN npm run build

# Use Nginx as the base image for serving the frontend
FROM nginx:alpine

# Copy the built frontend files from the builder stage to Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom Nginx configuration 
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
