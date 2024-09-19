import { createContext, useState, useEffect, ReactNode } from 'react';
import { ListPokemon } from '../interfaces/pokemons.tsx';

interface PokemonContextType {
  favoritePokemons: ListPokemon[];
  toggleFavorite: (pokemon: ListPokemon) => void;
  isFavorited: (pokemon: ListPokemon) => boolean;
}

export const PokemonContext = createContext<PokemonContextType>({
  favoritePokemons: [],
  toggleFavorite: () => {},
  isFavorited: () => false,
});

export const PokemonProvider = ({ children }: { children: ReactNode }) => {
  const initializeFavorites = () => {
    const savedFavorites = localStorage.getItem('favoritePokemons');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  };

  const [favoritePokemons, setFavoritePokemons] = useState<ListPokemon[]>(initializeFavorites);

  useEffect(() => {
    localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons));
  }, [favoritePokemons]);

  const toggleFavorite = (pokemon: ListPokemon) => {
    const isAlreadyFavorited = favoritePokemons.find((fav) => fav.pokedexNumber === pokemon.pokedexNumber);

    if (isAlreadyFavorited) {
      setFavoritePokemons(favoritePokemons.filter((fav) => fav.pokedexNumber !== pokemon.pokedexNumber));
    } else if (favoritePokemons.length < 6) {
      setFavoritePokemons([...favoritePokemons, pokemon]);
    } else {
      alert('You can only favorite a maximum of 6 Pokémons.');
    }
  };

  const isFavorited = (pokemon: ListPokemon) => {
    return favoritePokemons.some((fav) => fav.pokedexNumber === pokemon.pokedexNumber);
  };

  return (
    <PokemonContext.Provider value={{ favoritePokemons, toggleFavorite, isFavorited }}>
      {children}
    </PokemonContext.Provider>
  );
};
