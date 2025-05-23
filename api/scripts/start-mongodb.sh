#!/bin/sh

echo
echo "--------------------------"
echo "Starting MongoDB container"
echo "--------------------------"
echo

docker container rm mongodb
docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:latest

echo
echo "------------------"
echo "Importing database"
echo "------------------"
echo

docker exec -i mongodb sh -c 'mongorestore --archive' < ./sauf-mongo.archive
