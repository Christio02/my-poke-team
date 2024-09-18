import { ListPokemon } from '../interfaces/pokemons.ts';
import PokemonCard from './PokemonCard.tsx';
import '../styles/pokemonList.css';

interface PokemonListProps {
  pokemons: ListPokemon[];
  onToggleFavorite: (pokemon: ListPokemon) => void;
  isFavorited: (pokemon: ListPokemon) => boolean;
}

const PokemonList = ({ pokemons, onToggleFavorite, isFavorited }: PokemonListProps) => {
  return (
    <div className="pokemon-grid">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            isFavorite={isFavorited(pokemon)}
            onToggleFavorite={() => onToggleFavorite(pokemon)}
          />
        ))
      ) : (
        <div>No Pokémon available</div>
      )}
    </div>
  );
};

export default PokemonList;
