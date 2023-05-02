FROM node:16-alpine as build

WORKDIR /var/www/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build


FROM nginx:1.23.1-alpine

WORKDIR /var/www/app/frontend

COPY --from=build /app/build /bin/www

COPY ./nginx/default.conf  /etc/nginx/conf.d

EXPOSE 8081

CMD [ "nginx", "-g", "daemon off;" ]