FROM node:14.15.3-alpine

ARG basedir="backend1"

WORKDIR ${basedir}/ .

COPY ${basedir}/package*.json ./

RUN npm install --silent

COPY ${basedir}/ ./

CMD ["npm", "run", "start"]