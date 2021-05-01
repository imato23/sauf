
FROM node:14
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install npm@7
RUN npm install
COPY . .
COPY environments/cert.pem /etc/ssl/
COPY environments/key.pem /etc/ssl/
COPY environments/environment.prod.env /etc/sauf/environment.env
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]