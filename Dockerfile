
FROM node:22.16.0-alpine
WORKDIR /app

COPY package.json package-lock.json* ./ 

RUN npm install


COPY . .

CMD ["npm", "start"]
