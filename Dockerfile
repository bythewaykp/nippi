FROM node:alpine

RUN mkdir -p /usr/app

WORKDIR /usr/app

RUN apk add --no-cache bash
RUN apk add --no-cache chromium

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "start" ]

