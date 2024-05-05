FROM node:20-bookworm

WORKDIR /app
COPY package*.json ./
# 本来は`npm install --productionでdependenciesのみをインストールしたいが、`npx graphql-codegen`が依存関係不足で失敗するため、devDependenciesもインストールする
RUN npm i
COPY . .

RUN npm run db:generate
RUN npm run gqlgen

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]