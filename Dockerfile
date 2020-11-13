FROM node:12
COPY --chown=node:node . /app
WORKDIR /app
USER node
RUN mkdir -p .next node_modules
RUN npm install --quiet
EXPOSE 3000
