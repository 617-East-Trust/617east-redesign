FROM node:22-alpine AS builder
WORKDIR /build

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Copy dependency manifests
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc patches /build/
COPY patches /build/patches

# Install dependencies (no prepare scripts — avoid build-time side effects)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source files
COPY client /build/client
COPY server /build/server
COPY shared /build/shared
COPY scripts /build/scripts
COPY tsconfig.json tsconfig.node.json vite.config.ts /build/

# Build the Vite frontend (outputs to dist/public)
RUN pnpm vite build

# Build the Node server (outputs to dist/index.js)
RUN pnpm esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outfile=dist/index.js

# --- Runtime stage ---
FROM node:22-alpine
WORKDIR /app

# Copy production build artifacts
COPY --from=builder /build/dist ./dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/index.js"]