import { graphql } from "graphql";
import { Resolvers, typeDefs } from "@/gql/server";
import { makeExecutableSchema } from "graphql-tools";
import prisma from "@/app/_repository/db";

const resolvers: Resolvers = {
  Query: {
    getUser: async (_parent, args, _context, _info) => {
      console.log("GQLリクエスト", args);
      return {
        id: args.id + "success",
        username: "成功",
      };
    },
  },
  Mutation: {
    createUser: async (_parent, args, _context, _info) => {
      const user = await prisma.user.create({
        data: {
          name: args.username,
        },
      });
      console.log("GQLリクエスト", args);
      return {
        id: user.id,
        username: user.name,
      };
    },
  },
};

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers,
});

export async function GET(request: Request) {
  console.log("GETリクエスト");

  return new Response("Hello world!", {
    headers: { "content-type": "text/plain" },
  });
}

export async function POST(request: Request) {
  console.log("POSTリクエスト");
  const body = await request.json();
  console.log(body);

  const res = await graphql({
    schema,
    source: body.query,
    variableValues: body.variables,
  });

  console.log("完了", res);

  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}
