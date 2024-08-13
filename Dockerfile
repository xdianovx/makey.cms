FROM node:lts-alpine as build-stage

WORKDIR /app

COPY ./mackey_admin/package.json .

RUN npm install

COPY ./mackey_admin .

RUN npm run build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", "/app/.output/server/index.mjs"]