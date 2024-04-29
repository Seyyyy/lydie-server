"use client";

import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/gql/client";

export const Temp = () => {
  const onClick = async () => {
    console.log("onClick");
    const graphQLClient = new GraphQLClient("http://localhost:3000/graph");
    const sampleClient = getSdk(graphQLClient);
    const res = await sampleClient.GetUser({ id: "test" });
    console.log(res.data);
  };
  return (
    <div>
      <p>Temp</p>
      <button onClick={onClick}>Click me</button>
    </div>
  );
};
