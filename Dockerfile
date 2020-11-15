FROM node:12
EXPOSE 3000
RUN mkdir -p /app /app/.next /app/node_modules && \
    chown -R node:node /app
WORKDIR /app
USER node
COPY package*.json ./
RUN npm install --quiet
