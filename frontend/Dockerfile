FROM node:16-alpine as build

WORKDIR /app/frontend

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build


FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d

COPY --from=build /app/frontend/build .

EXPOSE 8081
