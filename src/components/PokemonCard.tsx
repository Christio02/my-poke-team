
import '../styles/pokemonCard.css';
import {ListPokemon } from '../interfaces/pokemons.tsx';

interface PokemonCardProps {
  pokemon: ListPokemon;

}

export default function PokemonCard({pokemon}:PokemonCardProps) {
  return (
    <main className="pokemonCard">
      <section className="pokemonName">
        <h2 className="pokemonNameHeader">{pokemon.name}</h2>
      </section>
      <section className="icon">
        <img className="pokemonImage" src={pokemon.images} alt="" />
      </section>
        <h3 className="pokemonNumber">{pokemon.pokedexNumber}</h3>

    </main>
  )
}