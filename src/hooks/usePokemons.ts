import { httpClient } from '../api/httpClient.tsx';
import { IndexedPokemon, ListPokemon, PokemonListResponse, PokemonTypeInfo } from '../interfaces/pokemons.ts';
import { POKEMON_API_POKEMON_SPRITE, POKEMON_API_POKEMON_URL } from '../constants.tsx';
import { useEffect, useState } from 'react';

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<ListPokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(POKEMON_API_POKEMON_URL);
  const [loading, setLoading] = useState<boolean>(false);
  const [prevUrl, setPrevUrl] = useState<string | null>(POKEMON_API_POKEMON_URL);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchPokemons(POKEMON_API_POKEMON_URL);
  }, []);

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
    const listPokemon: ListPokemon = {
      name: indexedPokemon.name.charAt(0).toUpperCase() + indexedPokemon.name.slice(1),
      url: indexedPokemon.url,
      images: `${POKEMON_API_POKEMON_SPRITE}/${pokedexNumber}.png`,
      pokedexNumber,
      types,
    };
    return listPokemon;
  };

  const fetchPokemons = async (url: string | null) => {
    if (url && !loading) {
      setLoading(true);
      const result = await httpClient.get<PokemonListResponse>(url);
      if (result?.data?.results) {
        const listPokemonsPromises = result.data.results.map(indexedPokemonToListPokemon);
        const newPokemons = await Promise.all(listPokemonsPromises);

        setPokemons(newPokemons);
        setNextUrl(result.data.next);
        setPrevUrl(result.data.previous);
      }
      setLoading(false);
    }
  };
  const fetchNextPage = () => {
    if (nextUrl) {
      fetchPokemons(nextUrl);
      setPage(page + 1);
    }
  };
  const fetchPrevPage = () => {
    if (prevUrl) {
      fetchPokemons(prevUrl);
      setPage(page - 1);
    }
  };

  return {
    pokemons,
    fetchNextPage,
    fetchPrevPage,
    hasMorePokemon: !!nextUrl,
    loading,
    page,
  };
};

export default usePokemons;
