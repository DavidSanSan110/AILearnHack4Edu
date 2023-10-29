FROM node:18

WORKDIR /app/web

ADD /web /app/web

RUN npm install

RUN npm run build

WORKDIR /app/server

ADD /server /app/server

RUN npm install

EXPOSE 10000

CMD ["npm", "start"]

