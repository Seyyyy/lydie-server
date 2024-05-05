FROM node:20-bookworm

WORKDIR /app
COPY package*.json ./
# 本来は`npm install --productionでdependenciesのみをインストールしたい
RUN npm i
COPY . .

RUN npm run db:generate
RUN npm run gqlgen

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]