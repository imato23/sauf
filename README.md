# S.A.U.F.

[![Docker](https://github.com/imato23/sauf/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/imato23/sauf/actions/workflows/docker-publish.yml)

## Introduction

An application for private wine cellar management

## Deployment

### Change to the directory with docker compose config.

``` bash
cd /home/thomas/tools/sauf
``` 

### Pull the latest images

``` bash
docker-compose pull
``` 

### Restart containers with new images

``` bash
docker-compose up -d --remove-orphans
``` 

## Backup and Restore

### Backup

Execute the following script. It will dump the sauf MongoDB collection and store it to `/var/backups/sauf/sauf-mongo.archive` 

``` bash
docker exec sauf-mongo sh -c 'exec mongodump -d sauf --archive' > /var/backups/sauf/sauf-mongo.archive
```

UrBackup will backup all files in the folder `/var/backups` regularly.

### Restore

1. Copy the sauf-mongo-archive file from urbackup Backup to `/var/backups/sauf/sauf-mongo.archive`
2. Execute the following script to restore the archive file to the MongoDB in the sauf-mongo container

``` bash
docker exec -i sauf-mongo sh -c 'mongorestore --archive' < /var/backups/sauf/sauf-mongo.archive 
``` 