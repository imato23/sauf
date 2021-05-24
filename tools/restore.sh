#!/bin/sh

# This script restores the "sauf" database from /var/backups/sauf/sauf-mongo.archive

docker exec -i sauf-mongo sh -c 'mongorestore --archive' < /var/backups/sauf/sauf-mongo.archive 