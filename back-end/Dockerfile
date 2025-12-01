FROM node:22.16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

# Espera o banco e depois roda seed + servidor
CMD ["npm", "run", "start:docker"]
