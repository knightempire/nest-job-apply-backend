# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Expose port (default NestJS port)
EXPOSE 3002

# Start the NestJS app
CMD ["npm", "run", "start:prod"]
