FROM node:20-alpine

WORKDIR /home/node/app
COPY ./package*.json ./
RUN npm config set registry http://registry.npmjs.org/ && \
    npm update --save caniuse-lite browserslist
RUN npm i && npm install sass@latest --save-dev
RUN npm install --omit=dev


COPY ./ ./

RUN cd ../app/ && npm run build
WORKDIR /home/node/app
EXPOSE 3000
USER node

CMD [ "npm","run","start" ]
