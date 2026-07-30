FROM node:22-alpine AS builder
WORKDIR /build

# Build the Vite frontend
COPY client/package.json client/ ./
RUN cd client && npm install --ignore-scripts

COPY client/ .
RUN cd client && npm install && npx vite build

# Build the Node server
WORKDIR /build/server
COPY server/package.json server/ ./
RUN npm install --ignore-scripts
COPY server/ .
RUN npx esbuild index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

# Runtime stage
FROM node:22-alpine
WORKDIR /app

# Copy pre-built server bundle
COPY --from=builder /build/server/dist/index.js ./dist/index.js

# Copy pre-built client into the server's public dir
COPY --from=builder /build/client/dist ./dist/public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]