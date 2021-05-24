import React from "react";
import { useQuery } from "react-query";
import request, { gql } from "graphql-request";
import { RequestDocument } from "graphql-request/dist/types";

const endpoint = "https://graphql-pokeapi.vercel.app/api/graphql";
const pokemonQuery = gql`
  query Pokemon($name: String!) {
    pokemon(name: $name) {
      name
    }
  }
`;

const graphqlRequest = async (query: RequestDocument, variables: any) =>
  await request(endpoint, query, variables);

const querySinglePokemon = (pokemonName: string) =>
  graphqlRequest(pokemonQuery, { name: pokemonName });

type Props = {
  pokemonName: string;
};

export function Pokemon({ pokemonName }: Props) {
  const query = useQuery("pokemon", () => querySinglePokemon(pokemonName));

  if (query.isFetching) {
    return <h1>Loading...</h1>;
  }

  if (query.isError) {
    return <h1>Something went wrong</h1>;
  }

  return <h1>{query.data.pokemon.name}</h1>;
}
