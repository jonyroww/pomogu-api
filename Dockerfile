FROM node:10 AS installer
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
ENV NODE_ENV development
RUN npm install

# ---

FROM installer AS builder
WORKDIR /usr/src/app

COPY --from=installer /usr/src/app/ .
COPY src ./src
COPY tsconfig.json tsconfig.build.json ormconfig.js ./

ENV NODE_ENV production
RUN npm run build
RUN npm install

# ---

FROM node:10-slim AS runner
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/ .

ENV PORT 80
ENV HOST 0.0.0.0

EXPOSE 80

ENV NODE_ENV production
CMD ["node", "dist/main.js"]
