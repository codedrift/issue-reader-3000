FROM node:latest AS builder
# ENV NODE_ENV=production
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . .
RUN npm run build

FROM nginx:latest
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build/ /srv/www/web

CMD ["nginx", "-g", "daemon off;"]