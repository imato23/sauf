# Stage 0: compile angular frontend
FROM node:14 as build
WORKDIR /app
COPY . .
RUN npm install npm@7
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --prod

# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/frontend  /usr/share/nginx/html
COPY nginx_conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx_conf/saratoga.crt /etc/ssl/
COPY nginx_conf/saratoga.key /etc/ssl/
EXPOSE 443