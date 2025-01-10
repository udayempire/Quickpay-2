FROM node:latest

WORKDIR /usr/src/app

COPY package.json package-lock.json turbo.json tsconfig.json ./

COPY apps ./apps

COPY packages ./packages

#INSALLING depedencies

RUN npm install

RUN npm run db:generate


CMD ["npm","run","start-user-app"]