FROM node:22-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy lock and manifest for dependency installation
COPY pnpm-lock.yaml ./
COPY package.json ./

# Install dependencies
RUN pnpm install --frozen-lockfile --ignore-scripts && \
    # Rebuild platform-specific deps
    pnpm rebuild

# Copy all source files
COPY client/ ./client/
COPY server/ ./server/
COPY scripts/ ./scripts/
COPY shared/ ./shared/
COPY attached_assets/ ./attached_assets/
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY components.json ./
COPY patches/ ./patches/
COPY template.json ./

# Build: Vite frontend → dist/public/ + SSG + esbuild server → dist/index.js
RUN pnpm build

# Runtime stage
FROM node:22-alpine

WORKDIR /app

# Copy production build artifacts
COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./
COPY --from=base /app/pnpm-lock.yaml ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]