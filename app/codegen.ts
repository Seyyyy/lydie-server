import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "schema.graphql",
  documents: "query.graphql",
  generates: {
    "src/gql/client.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: true,
      },
    },
    "src/gql/server.ts": {
      plugins: [
        "typescript",
        "typescript-resolvers",
        "scripts/codegen-typedefs.js",
      ],
    },
  },
};

export default config;
