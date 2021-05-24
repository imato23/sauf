#!/bin/sh

# This script dumps the "sauf" database to /var/backups/saufsauf-mongo.archive

docker exec sauf-mongo sh -c 'exec mongodump -d sauf --archive' > /var/backups/sauf/sauf-mongo.archive