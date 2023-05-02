FROM node:16-alpine AS builder

WORKDIR /var/www/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:16-alpine as production

WORKDIR /var/www/app

COPY --from=builder /var/www/app/package*.json ./

RUN npm i --omit=dev 

RUN npm install pm2 -g

COPY --from=builder /var/www/app/dist ./dist/

EXPOSE 3000

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]

#CMD ["pm2-runtime", "/dist/main.js"]