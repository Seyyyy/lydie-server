import prisma from "@/app/_repository/db"
import { Resolvers } from "@/gql/server";
import { ENV } from "@/constants";
import { mock } from "@/constants"
import fs from 'fs';
import path from 'path';

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
    Mutation: {
        createStore: async (_parent, args, _context, _info) => {
            const { title, filePath } = args;
            const tempFilePath = path.join(ENV.BASE_OBJECT_PATH!, ENV.TEMP_OBJECT_PATH, filePath);
            const finalFilePath = path.join(ENV.BASE_OBJECT_PATH!, filePath);
            // ファイルを移動
            fs.renameSync(tempFilePath, finalFilePath);

            // 拡張子を抽出
            const fileExtension = path.extname(filePath).slice(1);

            const store = await prisma.store.create({
                data: {
                    title,
                    userId: mock.user.id,
                    image: {
                        create: {
                            filePath,
                            fileExtension,
                        },
                    },
                },
                include: {
                    image: true,
                },
            });

            return store;
        },
    },
};
