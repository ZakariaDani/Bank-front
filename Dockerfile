#stage 1
#add specific and light version of node
FROM node:16.15.0-alpine3.15 as node
WORKDIR /app
#copy packages to not reinstall npm packages everytime
COPY package*.json .
RUN npm install

COPY . .
EXPOSE 4200

RUN npm run build --prod
#stage 2
FROM nginx:1.21.6-alpine
COPY --from=node /app/dist/bank-front /usr/share/nginx/html