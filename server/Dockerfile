# This is Dockerfile for Node.js and Express.js
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3001

CMD ["npm", "start"]