import { httpClient } from '../api/httpClient.tsx';
import { IndexedPokemon, ListPokemon, PokemonListResponse, PokemonTypeInfo } from '../interfaces/pokemons.ts';
import { POKEMON_API_POKEMON_SPRITE, POKEMON_API_POKEMON_URL } from '../constants.tsx';
import { useEffect, useState } from 'react';

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<ListPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(POKEMON_API_POKEMON_URL);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemonDetails = async (url: string) => {
    const result = await httpClient.get(url);
    if (result?.data) {
      const types = result.data.types.map((typeInfo: PokemonTypeInfo) => typeInfo.type.name);
      return types;
    }
    return [];
  };

  const indexedPokemonToListPokemon = async (indexedPokemon: IndexedPokemon) => {
    const pokedexNumber = parseInt(indexedPokemon.url.replace(`${POKEMON_API_POKEMON_URL}/`, '').replace('/', ''));
    const types = await fetchPokemonDetails(indexedPokemon.url);
    const listPokemon: ListPokemon = {
      name: indexedPokemon.name.charAt(0).toUpperCase() + indexedPokemon.name.slice(1),
      url: indexedPokemon.url,
      images: `${POKEMON_API_POKEMON_SPRITE}/${pokedexNumber}.png`,
      pokedexNumber,
      types,
    };
    return listPokemon;
  };

  const fetchPokemons = async () => {
    if (nextUrl && !loading) {
      setLoading(true);
      const result = await httpClient.get<PokemonListResponse>(nextUrl);
      if (result?.data?.results) {
        const listPokemonsPromises = result.data.results.map(indexedPokemonToListPokemon);
        const newPokemons = await Promise.all(listPokemonsPromises);
        // Avoid adding duplicates by using a Set based on pokedexNumber
        const uniquePokemons = [
          ...pokemons,
          ...newPokemons.filter(
            (newPokemon) =>
              !pokemons.some((existingPokemon) => existingPokemon.pokedexNumber === newPokemon.pokedexNumber),
          ),
        ];
        setPokemons(uniquePokemons);
        setNextUrl(result.data.next);
      }
      setLoading(false);
    }
  };

  return {
    pokemons,
    fetchNextPage: fetchPokemons,
    hasMorePokemon: !!nextUrl,
    loading,
  };
};

export default usePokemons;
