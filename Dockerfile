FROM node:latest

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json ./

COPY apps ./apps

COPY packages ./packages

#INSALLING depedencies

RUN npm install

RUN npm run db:generate


CMD ["npm","run","start-user-app"]