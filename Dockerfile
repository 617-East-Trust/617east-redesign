FROM node:22-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package.json ./
COPY patches/ ./patches/

RUN pnpm install --frozen-lockfile --ignore-scripts && \
    pnpm rebuild

COPY client/ ./client/
COPY server/ ./server/
COPY scripts/ ./scripts/
COPY shared/ ./shared/
COPY tsconfig.json ./
COPY vite.config.ts ./
COPY components.json ./
COPY template.json ./

RUN pnpm build

FROM node:22-alpine AS runtime

WORKDIR /app

COPY --from=base /app/dist ./dist
COPY --from=base /app/package.json ./
COPY --from=base /app/pnpm-lock.yaml ./
COPY --from=base /app/node_modules ./node_modules

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
