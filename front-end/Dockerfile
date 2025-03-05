# Stage 1: Build Next.js app
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json first to leverage caching
COPY package.json package-lock.json ./

# Install dependencies with legacy peer support
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Production runtime (Node.js for SSR)
FROM node:18 AS runner

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json
COPY --from=builder /app/public public

# Expose Next.js default port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
