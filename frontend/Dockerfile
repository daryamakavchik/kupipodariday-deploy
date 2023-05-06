FROM node:16-alpine as build

WORKDIR /var/www/app

COPY package*.json /app/

RUN npm i

COPY . .

RUN npm run build


FROM nginx:1.23.1-alpine

COPY nginx/default.conf /etc/nginx/conf.d

COPY --from=build /var/www/app/build/ /usr/share/nginx/html

EXPOSE 8081
