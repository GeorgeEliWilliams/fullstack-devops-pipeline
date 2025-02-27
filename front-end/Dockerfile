FROM node:18 AS builder

# Set working directory
WORKDIR ./app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci 

# Copy the rest of the application
RUN npm run build 

# Serve the App with Nginx
FROM nginx:alpine

# Set the absolute working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy the built Next.js app from the builder stage
COPY --from=builder /app/.next /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]