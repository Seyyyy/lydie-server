import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/app/graph/**/schema.graphql",
  documents: "src/app/graph/**/document.graphql",
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
