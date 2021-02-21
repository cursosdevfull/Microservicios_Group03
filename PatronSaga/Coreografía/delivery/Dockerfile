FROM node:10.16.3-alpine as BUILD

RUN apk add bash

ADD package.json /tmp/package.json
ADD package-lock.json /tmp/package-lock.json
RUN cd /tmp && npm install

RUN mkdir /app && cp -a /tmp/node_modules /app/

WORKDIR /app
ADD . /app

RUN npm run test

RUN npm run server:build

FROM node:10.16.3-alpine

LABEL DEV=SERGIO-HIDALGO

RUN apk add bash

RUN mkdir /app
WORKDIR /app
COPY --from=BUILD /app/dist /app/dist
COPY --from=BUILD /app/node_modules /app/node_modules
COPY --from=BUILD /app/package.json /app/package.json
COPY --from=BUILD /app/package-lock.json /app/package-lock.json
COPY --from=BUILD /app/env.yaml /app/env.yaml

EXPOSE 80

CMD ["npm", "run", "server"]
