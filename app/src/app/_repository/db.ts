// 開発インスタンスのホットリロードでprismaインスタンスが複数作成されてエラーになるのを防ぐ。
// 本番環境はリクエストごとに独立したプロセスであるため、プロセスごとにprismaインスタンスを使い回す。
// https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from "@prisma/client";
// import { isDevelopment } from '@utils/environment'
const isDevelopment = true;

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (isDevelopment) globalThis.prisma = prisma;
