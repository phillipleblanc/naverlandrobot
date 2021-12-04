FROM node:16 as dist

WORKDIR /build

COPY . .

RUN npm install --global npm
RUN npm install --global yarn --force
RUN yarn install
RUN yarn build

### App code
FROM node:16-slim

WORKDIR /app

COPY --from=dist /build/node_modules ./node_modules
COPY --from=dist /build/package*.json ./
COPY --from=dist /build/dist ./dist

ENTRYPOINT ["node", "--es-module-specifier-resolution=node", "dist/main.js"]