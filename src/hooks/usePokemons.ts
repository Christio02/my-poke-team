import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { httpClient } from '../api/httpClient';
import { IndexedPokemon, PokemonListResponse, PokemonTypeInfo } from '../interfaces/pokemons';
import { POKEMON_API_POKEMON_SPRITE, POKEMON_API_POKEMON_URL } from '../constants';

const fetchPokemonDetails = async (url: string) => {
  const result = await httpClient.get(url);
  if (result?.data) {
    return result.data.types.map((typeInfo: PokemonTypeInfo) => typeInfo.type.name);
  }
  return [];
};

const indexedPokemonToListPokemon = async (indexedPokemon: IndexedPokemon) => {
  const pokedexNumber = parseInt(indexedPokemon.url.replace(`${POKEMON_API_POKEMON_URL}/`, '').replace('/', ''));
  const types = await fetchPokemonDetails(indexedPokemon.url);
  return {
    name: indexedPokemon.name.charAt(0).toUpperCase() + indexedPokemon.name.slice(1),
    url: indexedPokemon.url,
    images: `${POKEMON_API_POKEMON_SPRITE}/${pokedexNumber}.png`,
    pokedexNumber,
    types,
  };
};

const fetchPokemons = async (url: string) => {
  const result = await httpClient.get<PokemonListResponse>(url);
  if (result?.data?.results) {
    const listPokemonsPromises = result.data.results.map(indexedPokemonToListPokemon);
    const pokemons = await Promise.all(listPokemonsPromises);
    return {
      pokemons,
      nextPage: result.data.next,
      prevPage: result.data.previous,
    };
  }
  return { pokemons: [], nextPage: null, prevPage: null };
};

const usePokemons = () => {
  const [currentUrl, setCurrentUrl] = useState(POKEMON_API_POKEMON_URL);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['pokemons', currentUrl],
    queryFn: () => fetchPokemons(currentUrl),
  });

  const fetchNextPage = () => {
    if (data?.nextPage) {
      setCurrentUrl(data.nextPage);
    }
  };

  const fetchPrevPage = () => {
    if (data?.prevPage) {
      setCurrentUrl(data.prevPage);
    }
  };

  return {
    pokemons: data?.pokemons ?? [],
    fetchNextPage,
    fetchPrevPage,
    hasNextPage: !!data?.nextPage,
    hasPrevPage: !!data?.prevPage,
    isLoading,
    isFetching,
  };
};

export default usePokemons;
