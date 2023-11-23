FROM node:18.10.0

WORKDIR /appq

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

