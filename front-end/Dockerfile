FROM node:18-alpine AS base

FROM base AS deps
WORKDIR /app

COPY package*.json ./

RUN apk add --no-cache libc6-compat && \
    npm install --legacy-peer-deps

FROM base AS builder
WORKDIR /app  

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
ENV PORT=3000
EXPOSE 3000

# HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD [ "wget", "-q0", "http://127.0.0.1:3000" ]

CMD ["node", "server.js"]