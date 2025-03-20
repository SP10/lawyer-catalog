# Use official Node.js Alpine base image
FROM node:20.18.0 AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /next-app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY src ./src
COPY public ./public
COPY next.config.ts .
COPY tsconfig.json .
COPY .env.production ./
COPY codegen.ts .
COPY schema.graphql .

# Define build-time environment variables
ARG API_TOKEN=96a9e735aed74bd2aa8fbd99f4e9d8e03f979cfd1f25a02931ce85e8662ee584bbf433c8d14e03a096323a9a70273b7606296f7fdae48a217fafaa14ba16527fc85ddb51fc868d00f9e29d5ff2cb2028c874e351a54610e218ccda5426b130a5ffe21f3641df2d5975020e2572db32963e7b6657934b99f57f9f261486f7e15f
ARG API=https://api-lawyercatalog.pavlovych.synology.me
ARG HOST=https://lawyercatalog.pavlovych.synology.me

ENV API_TOKEN=${API_TOKEN}
ENV API=${API}
ENV HOST=${HOST}

# Disable Next.js telemetry at build time
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /next-app

ENV NODE_ENV production

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /next-app/public ./public
COPY --from=builder --chown=nextjs:nodejs /next-app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /next-app/.next/static ./.next/static

# Redefine runtime environment variables
ENV API_TOKEN=${API_TOKEN}
ENV API=${API}
ENV HOST=${HOST}

# Disable Next.js telemetry at runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Run the Next.js application
CMD ["node", "server.js"]
