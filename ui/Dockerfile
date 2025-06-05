# Stage 0: compile angular frontend
FROM node:22 AS build
WORKDIR /app
COPY . .

RUN npm install npm@10 && npm install -g @angular/cli && npm install
RUN npm run build --localize --configuration=production

# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/ui/browser  /usr/share/nginx/html
COPY nginx_conf/default.conf.template /etc/nginx/template/default.conf.template

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
CMD ["/entrypoint.sh"]

EXPOSE 443
