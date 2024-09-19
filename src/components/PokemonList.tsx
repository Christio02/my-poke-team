import React from 'react';
import { ListPokemon } from '../interfaces/pokemons';
import PokemonCard from './PokemonCard';
import '../styles/pokemonList.css';

interface PokemonListProps {
  pokemons: ListPokemon[];
  onToggleFavorite: (pokemon: ListPokemon) => void;
  isFavorited: (pokemon: ListPokemon) => boolean;
  isLoading: boolean;
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemons, onToggleFavorite, isFavorited, isLoading }) => {
  if (isLoading) {
    return <div className="loading">Loading Pokémon...</div>;
  }

  if (pokemons.length === 0) {
    return <div className="no-pokemon">No Pokémon available</div>;
  }

  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          pokemon={pokemon}
          isFavorite={isFavorited(pokemon)}
          onToggleFavorite={() => onToggleFavorite(pokemon)}
        />
      ))}
    </div>
  );
};

export default PokemonList;
