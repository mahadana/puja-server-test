FROM node:12
RUN mkdir /app
RUN chown node:node /app
USER node
WORKDIR /app
COPY package*.json ./
RUN npm install --quiet
COPY . .
RUN npm run build
EXPOSE 4000
