FROM node:18

RUN mkdir /app

WORKDIR /app

ADD /web /app/web

RUN npm install --prefix ./web

RUN npm run build --prefix ./web

EXPOSE 10001

CMD ["npm", "run", "start", "--prefix", "./web"]