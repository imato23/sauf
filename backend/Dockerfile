
FROM node:14
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install npm@7
RUN npm install
COPY . .
COPY certs/sauf.home.imato.de/cert.pem /etc/ssl/sauf.home.imato.de/
COPY certs/sauf.home.imato.de/key.pem /etc/ssl/sauf.home.imato.de/
COPY environments/environment.prod.env /etc/sauf/environment.env
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]