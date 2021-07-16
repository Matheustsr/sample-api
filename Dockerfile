FROM node:latest
LABEL maintainer="Matheus Vieira"
COPY . /var/www
WORKDIR /var/www
RUN npm install
ENTRYPOINT npm start
EXPOSE 3333
