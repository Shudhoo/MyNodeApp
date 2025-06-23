# Stage 1: Build the Vite app
#FROM node:18-alpine AS builder
#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm run build

# Stage 2: Serve the built app with a static server
#FROM node:18-alpine
#RUN npm install -g serve
#WORKDIR /app
#COPY --from=builder /app/dist ./dist
#EXPOSE 5173
#CMD ["serve", "-s", "dist", "--listen", "tcp://0.0.0.0:5173"] */

# Stage 1: Build the Vite app
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve the built app with a static server
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

