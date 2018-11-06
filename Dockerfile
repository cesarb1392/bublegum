FROM node:8.11.4-alpine

ENV PROJECT_ROOT /opt/app

RUN npm install -g pm2
RUN npm install -g yarn

COPY package.json /opt/app/package.json
COPY yarn.lock /opt/app/yarn.lock

RUN cd /opt/app/ && yarn install --frozen-lockfile

WORKDIR /opt/app


