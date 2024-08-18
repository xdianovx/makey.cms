
FROM node:lts

WORKDIR /app

COPY ./cms/package.json .
COPY ./cms/package-lock.json .

RUN npm i

COPY ./cms .

RUN npm run build

ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", ".output/server/index.mjs"]
EXPOSE 3000
