import { ListPokemon } from '../interfaces/pokemons.tsx';
import PokemonCard from './PokemonCard.tsx';
import '../styles/pokemonList.css';

interface PokemonListProps {
  pokemons: ListPokemon[];
}

const PokemonList = ({ pokemons }: PokemonListProps) => {
  return (
    <div className="pokemon-grid">
      {pokemons.length > 0 ? (
        pokemons.map((pokemon) => {
          return <PokemonCard key={pokemon.name} pokemon={pokemon} isFavorite={false} />;
        })
      ) : (
        <div>No Pokémon available</div>
      )}
    </div>
  );
};

export default PokemonList;
