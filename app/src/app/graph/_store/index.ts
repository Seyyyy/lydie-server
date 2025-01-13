import prisma from "@/app/_repository/db"
import { Resolvers } from "@/gql/server";

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
                    image: {
                        select: {
                            filePath: true,
                            fileExtension: true,
                        },
                    }
                },
            });

            return stores;
        },
    },
};
