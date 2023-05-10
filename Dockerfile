FROM node:18-alpine

ENV PORT=8000
ENV NODE_ENV="Production Mode"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000 27017 6379

 CMD ["npm", "start"]

