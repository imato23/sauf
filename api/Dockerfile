
FROM node:22
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install npm@10
RUN npm install
COPY . .
COPY environments/environment.prod.env /etc/sauf/environment.env
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
