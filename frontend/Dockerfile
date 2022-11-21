# Stage 0: compile angular frontend
FROM node:16 as build
WORKDIR /app
COPY . .
RUN npm install npm@8
RUN npm install -g @angular/cli
RUN npm install
RUN ng build --localize --configuration production

# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/frontend  /usr/share/nginx/html
COPY nginx_conf/nginx.conf /etc/nginx/conf.d/default.conf
COPY certs/sauf.home.imato.de/cert.pem /etc/ssl/sauf.home.imato.de/
COPY certs/sauf.home.imato.de/key.pem /etc/ssl/sauf.home.imato.de/
EXPOSE 443
