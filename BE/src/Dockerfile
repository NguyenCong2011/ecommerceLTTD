FROM node:18.12-slim
WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start"]