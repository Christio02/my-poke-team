//https://www.youtube.com/watch?v=T9M-Xji_NOw & https://www.youtube.com/watch?v=TauoQNo2ZQU lastet ned 16.09.2024
import { useEffect, useState } from 'react';
import { IndexedPokemon, ListPokemon, PokemonListResponse } from '../interfaces/pokemons.tsx';
import { POKEMON_API_POKEMON_SPRITE, POKEMON_API_POKEMON_URL } from '../constants.tsx';
import { httpClient } from '../api/httpClient.tsx';

const usePokemons = () => {
  const [pokemons, setPokemons] = useState<ListPokemon[]>([])
  const [nextUrl,] = useState<string | null>(POKEMON_API_POKEMON_URL);

  useEffect(() => {
    fetchPokemons()
  }, [])

  const indexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon) => {
    const pokedexNumber = parseInt(indexedPokemon.url.replace(`${POKEMON_API_POKEMON_URL}/`, "")
      .replace("/",""))
    const listPokemon : ListPokemon = {
      name: indexedPokemon.name.replace(indexedPokemon.name.charAt(0),indexedPokemon.name.charAt(0).toLocaleUpperCase()),
      url: indexedPokemon.url,
      images: `${POKEMON_API_POKEMON_SPRITE}/${pokedexNumber}.png`,
      pokedexNumber
    }
    return listPokemon
  }

  const fetchPokemons = async () => {
    if(nextUrl) {
      const result = await httpClient.get<PokemonListResponse>(nextUrl);
      if(result?.data?.results){
        const listPokemons = result.data.results.map(p=>indexedPokemonToListPokemon(p))
        setPokemons(listPokemons);

      }
      console.log(result);
    }
  }
  return {
    pokemons
  }
}
export default usePokemons;