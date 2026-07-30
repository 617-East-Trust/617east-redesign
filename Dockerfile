FROM node:22-alpine AS base

WORKDIR /app

# Copy the compiled bundle and static assets
COPY dist/index.js ./dist/index.js
COPY dist/public ./dist/public

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]