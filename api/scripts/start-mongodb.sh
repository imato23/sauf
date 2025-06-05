#!/bin/sh

echo
echo "--------------------------"
echo "Starting MongoDB container"
echo "--------------------------"
echo

docker container rm sauf-mongo
docker run --name sauf-mongo -p 27017:27017 -d mongodb/mongodb-community-server:latest

echo
echo "------------------"
echo "Importing database"
echo "------------------"
echo

docker exec -i sauf-mongo sh -c 'mongorestore --archive' < ./sauf-mongo.archive
docker network create sauf_default
docker network connect sauf_default sauf-mongo
