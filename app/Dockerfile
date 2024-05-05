FROM node:20-bookworm

WORKDIR /app
COPY package*.json ./
# 本来は`npm install --productionでdependenciesのみをインストールしたいが、`npx graphql-codegen`が依存関係不足で失敗するため、devDependenciesもインストールする
RUN npm install
COPY . .

RUN npx prisma generate
RUN npx graphql-codegen --config codegen.ts

RUN npm run build
RUN ls -la

EXPOSE 3000

CMD ["npm", "run", "start"]