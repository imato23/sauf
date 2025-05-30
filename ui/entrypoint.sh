#!/bin/sh

# Write environment variable to /usr/share/nginx/html/config.json
echo "{\"apiUrl\": \"$API_URL\"}" > /usr/share/nginx/html/de/assets/config.json

# Start nginx
nginx -g 'daemon off;'
