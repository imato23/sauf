#!/bin/sh

# Write environment variable to /usr/share/nginx/html/config.json
echo "{\"apiUrl\": \"$API_URL1\"}" > /usr/share/nginx/html/de/assets/config.json

envsubst "${API_URL2}" < /etc/nginx/template/default.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx
nginx -g 'daemon off;'
