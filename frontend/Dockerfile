FROM node:16-alpine as build

WORKDIR /var/www/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build


FROM nginx:1.23.1-alpine

WORKDIR /var/www/app

EXPOSE 8081

COPY --from=build /var/www/app/build /usr/share/nginx/html

COPY --from=build /var/www/app/nginx/default.conf  /etc/nginx/conf.d
