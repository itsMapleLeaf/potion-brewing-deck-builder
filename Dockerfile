FROM node:slim

WORKDIR /app

COPY ./ /app/

RUN npm i -g pnpm
RUN pnpm install
RUN pnpm run build

CMD [ "pnpm", "run", "start" ]
EXPOSE 3000
