#!/bin/sh

#This script fetches the latest versions of the "sauf" images 
# and then restarts all containers.

docker-compose pull
docker-compose up -d --remove-orphans