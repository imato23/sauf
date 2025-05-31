#!/bin/sh

echo
echo "--------------------------"
echo "Starting MongoDB container"
echo "--------------------------"
echo

docker container rm sauf-mongo
docker run --name sauf-mongo -d mongodb/mongodb-community-server:latest

echo
echo "------------------"
echo "Importing database"
echo "------------------"
echo

docker exec -i sauf-mongo sh -c 'mongorestore --archive' < ./sauf-mongo.archive
docker network connect sauf sauf-mongo
