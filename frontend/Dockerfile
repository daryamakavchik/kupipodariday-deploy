FROM node:16-alpine as build

WORKDIR /app

COPY package*.json /app/

RUN npm i

COPY . .

RUN npm run build


FROM nginx:1.23.1-alpine

EXPOSE 8081

COPY --from=build /app/build/ /usr/share/nginx/html

COPY --from=build /app/nginx/default.conf  /etc/nginx/conf.d
