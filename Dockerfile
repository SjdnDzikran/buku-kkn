# syntax=docker/dockerfile:1.7

# ---- builder ----
# Bun image for fast install + build of the Vite/React app.
FROM oven/bun:1-alpine AS builder
WORKDIR /app

# Cache deps layer separately from source.
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source and produce the static bundle in dist/.
COPY . .
RUN bun run build

# ---- runtime ----
# nginx:alpine serves the static dist/ (~7 MB base) with SPA fallback.
FROM nginx:alpine AS runtime

# Drop the default nginx static-server config that proxies to a non-existent node app.
RUN rm -f /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# nginx:alpine's mime.types maps "js" but not "mjs", so PDF.js's module worker
# is served as application/octet-stream and rejected by browsers. Add mjs to
# the JavaScript MIME mapping.
RUN sed -i '/application\/javascript/ s/ js;/ js mjs;/' /etc/nginx/mime.types

# Static build output only — no node_modules, no source, no .git.
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# nginx in foreground.
CMD ["nginx", "-g", "daemon off;"]
