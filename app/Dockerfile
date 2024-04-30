FROM node:20-bookworm

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

RUN npx prisma generate
RUN npx graphql-codegen --config codegen.ts

RUN npm run build
RUN ls -la

EXPOSE 3000

CMD ["npm", "run", "start"]