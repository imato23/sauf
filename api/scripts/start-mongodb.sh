#!/bin/sh
docker container rm mongodb
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:latest

docker exec -i mongodb sh -c 'mongorestore --archive' < ./sauf-mongo.archive
