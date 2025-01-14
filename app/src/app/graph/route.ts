import { graphql } from "graphql";
import { Resolvers, typeDefs } from "@/gql/server";
import { makeExecutableSchema } from "@graphql-tools/schema";
import prisma from "@/app/_repository/db";
import { resolvers as imageResolvers } from "./_image";
import { resolvers as storeResolaves } from "./_store"
import pino from "pino";

const resolvers: Resolvers = {
  Query: {
    ...imageResolvers.Query,
    ...storeResolaves.Query,
    getUser: async (_parent, args, _context, _info) => {
      console.log("GQLリクエスト", args);
      return {
        id: args.id + "success",
        username: "成功",
      };
    },
  },
  Mutation: {
    ...storeResolaves.Mutation,
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
  const body = await request.json();

  const logger = pino();
  const child = logger.child({
    sessionId: "",
    query: body.query,
  });

  const res = await graphql({
    schema,
    source: body.query,
    variableValues: body.variables,
    contextValue: { sessionId: "", logger: child },
  });

  if (res.errors) {
    for (const error of res.errors) {
      child.error(error);
    }

    return new Response(JSON.stringify(res.errors[0]), {
      headers: { "content-type": "application/json" },
      status: 400,
    });
  }

  return new Response(JSON.stringify(res), {
    headers: { "content-type": "application/json" },
  });
}
