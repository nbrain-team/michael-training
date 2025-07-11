# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install Python and build dependencies
RUN apk add --no-cache python3 py3-pip python3-dev build-base

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install Node dependencies
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm install -g typescript && \
    tsc

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install Python and runtime dependencies
RUN apk add --no-cache python3 py3-pip dumb-init && \
    python3 -m pip install --upgrade pip

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy Python requirements if they exist
COPY requirements.txt* ./

# Install Python dependencies
RUN if [ -f requirements.txt ]; then pip install --no-cache-dir -r requirements.txt; fi

# Copy built application
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nodejs:nodejs /app/dist ./dist
COPY --from=builder --chown=nodejs:nodejs /app/package*.json ./

# Copy Python scripts if they exist
COPY --chown=nodejs:nodejs scripts* ./scripts

# Switch to non-root user
USER nodejs

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1); });"

# Start application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "dist/index.js"] 