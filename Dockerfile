FROM node:20 as dist

WORKDIR /build

COPY . .

RUN npm install --global npm
RUN npm install --global yarn --force
RUN yarn install
RUN yarn build

### App code
FROM node:20-slim

RUN apt-get update \
  && apt-get install -y wget gnupg \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN groupadd -r naverlanduser && useradd -r -g naverlanduser -G audio,video naverlanduser \
  && mkdir -p /home/naverlanduser/Downloads \
  && chown -R naverlanduser:naverlanduser /home/naverlanduser

USER naverlanduser

COPY --chown=naverlanduser:naverlanduser --from=dist /build/node_modules ./node_modules
COPY --chown=naverlanduser:naverlanduser --from=dist /build/package*.json ./
COPY --chown=naverlanduser:naverlanduser --from=dist /build/dist ./dist

EXPOSE 8000

ENTRYPOINT ["node", "--es-module-specifier-resolution=node", "dist/main.js"]