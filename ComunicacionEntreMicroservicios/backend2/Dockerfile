FROM node:14.15.3-alpine

ARG basedir="backend2"

WORKDIR /app

COPY ${basedir}/package*.json ./

RUN npm install --silent

COPY ${basedir}/ ./

CMD ["npm", "run", "start"]