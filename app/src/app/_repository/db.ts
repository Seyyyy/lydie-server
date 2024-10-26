import { PrismaClient } from "@prisma/client";
import { useTranslation } from "react-i18next";

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
