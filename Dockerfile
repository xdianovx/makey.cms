FROM node:lts-alpine as build-stage

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY ./mackey_admin .

RUN npm run build

EXPOSE 5000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=5000

CMD ["node", "/app/.output/server/index.mjs"]