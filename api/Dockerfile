
FROM node:22
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install npm@10
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
