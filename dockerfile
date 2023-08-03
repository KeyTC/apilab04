FROM node:18.17.0

WORKDIR /server

EXPOSE 8080

COPY . .

RUN npm install

CMD [ "npm", "start" ]
