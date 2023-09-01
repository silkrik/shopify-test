FROM node:18-alpine3.17
WORKDIR /usr/src/app

COPY . ./

RUN yarn
RUN yarn build:api

RUN yarn global add cross-env

CMD yarn prisma db push --accept-data-loss && node ./dist/src/main.js

