FROM node:16-alpine as build

WORKDIR /var/www/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build


FROM nginx:1.23.1-alpine

EXPOSE 8081

WORKDIR /var/www/app/frontend

COPY --from=build /var/www/app/build /var/www/app/frontend

COPY ./nginx/default.conf  /etc/nginx/conf.d
