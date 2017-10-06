FROM node:8-alpine

EXPOSE 8080
WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn install

ADD index.js default-conf.js /app/

CMD node index.js
