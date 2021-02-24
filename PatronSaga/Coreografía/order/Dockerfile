FROM node:10.16.3-alpine as BUILD

ARG basedir="order"

WORKDIR /app

COPY ${basedir}/package*.json ./

RUN npm install --silent

COPY ${basedir}/ ./

RUN npm run server:build

FROM node:10.16.3-alpine

WORKDIR /app

COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/dist ./dist 
COPY --from=BUILD /app/package.json ./

CMD ["npm", "run", "server"]
