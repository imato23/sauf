#!/bin/sh

./start-mongodb.sh

echo
read -p "Press Enter to start the API"
echo

./start-api.sh
