FROM node:16 AS builder
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm test

FROM node:16
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist/ dist/
USER node
EXPOSE 8080
HEALTHCHECK CMD curl -f http://localhost:8080/health || exit 1;
ENTRYPOINT ["node","dist/main.js"]