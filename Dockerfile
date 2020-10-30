FROM node:12
RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN npm install --quiet
COPY . .
EXPOSE 4000
USER node
