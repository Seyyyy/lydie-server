import { PrismaClient } from "@prisma/client";
import { Resolvers } from "@/gql/server";

const prisma = new PrismaClient();

export const resolvers: Resolvers = {
    Query: {
        indexStores: async (_parent, args, _context, _info) => {
            const page = args.page ? args.page : 1;
            const pageSize = args.pageSize ? args.pageSize : 10;
            const stores = await prisma.store.findMany({
                skip: (page - 1) * pageSize,
                take: pageSize,
                select: {
                    id: true,
                    title: true,
                },
            });
            return stores;
        },
    },
};
