FROM docker.io/library/node:24-alpine AS build
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package.json package-lock.json .npmrc ./
RUN npm ci --no-audit --no-fund
COPY astro.config.mjs tsconfig.json ./
COPY src ./src
COPY public ./public
RUN npm run check && npm run build

FROM docker.io/nginxinc/nginx-unprivileged:stable-alpine AS runtime
COPY --chown=101:101 nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=101:101 /app/dist /usr/share/nginx/html
USER 101:101
EXPOSE 8080
# Healthcheck is defined in compose.yaml; OCI does not store Docker HEALTHCHECK.
# Skip entrypoint scripts that try to modify files in a read-only runtime.
ENTRYPOINT ["nginx"]
CMD ["-g", "daemon off;"]
