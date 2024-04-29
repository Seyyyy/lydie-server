// https://github.com/dotansimha/graphql-code-generator/issues/3899
const { printSchema } = require("graphql");

module.exports = {
  plugin: (schema) => {
    return [
      'import gql from "graphql-tag";',
      "",
      "export const typeDefs = gql`",
      printSchema(schema),
      "`;",
      "",
    ].join("\n");
  },
};
