import { ListPokemon } from '../interfaces/pokemons.tsx';
import PokemonCard from './PokemonCard.tsx';


interface PokemonListProps {
  pokemons: ListPokemon[];
}


const PokemonList = ({pokemons} : PokemonListProps) =>{
  return <>{pokemons.length > 0
  ? pokemons.map((pokemon)=>{
      return <PokemonCard key={pokemon.name} pokemon={pokemon}/>
    }):null}</>
};
export default PokemonList;