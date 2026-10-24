##### DEPENDENCIES #####

FROM --platform=linux/amd64 node:22-bookworm-slim AS deps

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Prisma schema
COPY prisma ./prisma

# Copy package files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --non-interactive


##### BUILDER #####

FROM --platform=linux/amd64 node:22-bookworm-slim AS builder

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Public environment variables required during build
ARG NEXT_PUBLIC_CT_SITE_KEY
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID
ARG NEXT_PUBLIC_GRAPHQL_URL

WORKDIR /app

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy application source
COPY . .

# Disable Next.js telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV SKIP_ENV_VALIDATION=1

# Generate Prisma Client, lint and build Next.js
RUN yarn prisma:generate && \
    yarn lint && \
    SKIP_ENV_VALIDATION=1 yarn build


##### RUNNER #####

FROM --platform=linux/amd64 node:22-bookworm-slim AS runner

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 --ingroup nodejs nextjs

# Create writable Next.js cache directory
RUN mkdir -p .next && \
    chown nextjs:nodejs .next

# Copy application configuration and public assets
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Copy standalone production output
COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/standalone ./

# Copy static assets
COPY --from=builder --chown=nextjs:nodejs \
    /app/.next/static ./.next/static

# Run as non-root user
USER nextjs

EXPOSE 3000

# Start Next.js standalone server
CMD ["node", "server.js"]