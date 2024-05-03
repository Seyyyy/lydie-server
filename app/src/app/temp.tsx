"use client";

import { GraphQLClient } from "graphql-request";
import { getSdk } from "@/gql/client";
import { Button } from "@/app/_components/Button/Button";

export const Temp = () => {
  const onClick = async () => {
    console.log("onClick");
    const graphQLClient = new GraphQLClient("http://localhost:3000/graph");
    const sampleClient = getSdk(graphQLClient);
    const res = await sampleClient.GetUser({ id: "test" });
    console.log(res.data);
  };

  const mutation = async () => {
    console.log("mutation");
    const graphQLClient = new GraphQLClient("http://localhost:3000/graph");
    const sampleClient = getSdk(graphQLClient);
    const res = await sampleClient.CreateUser({ username: "test" });
    console.log(res.data);
  };
  return (
    <div>
      <p>Temp</p>
      <Button onClick={onClick}>Query</Button>
      <Button onClick={mutation}>Mutation</Button>
    </div>
  );
};
