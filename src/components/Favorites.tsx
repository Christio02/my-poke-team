import '../styles/team.css';
import { useState } from 'react';
import PokemonCard, { Pokemon } from './PokemonCard.tsx';
// import PokemonCard from './PokemonCard.tsx';

type FavoritesProps = {
  name: string;
};

export function Favorites({ name }: FavoritesProps) {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([
    {
      name: 'Bulbasaur',
      type: 'Grass',
      id: 1,
      isFavorite: true,
    },
    {
      name: 'Charmander',
      type: 'Fire',
      id: 2,
      isFavorite: false,
    },
    {
      name: 'Squirtle',
      type: 'Water',
      id: 3,
      isFavorite: true,
    },
    {
      name: 'Pidgey',
      type: 'Normal',
      id: 4,
      isFavorite: false,
    },
    {
      name: 'Jigglypuff',
      type: 'Fairy',
      id: 5,
      isFavorite: true,
    },
    {
      name: 'Psyduck',
      type: 'Water',
      id: 6,
      isFavorite: true,
    },
  ]);

  const toggleFavorite = (index: number) => {
    setPokemonData((prevData) =>
      prevData.map((pokemon, i) => (i === index ? { ...pokemon, isFavorite: !pokemon.isFavorite } : pokemon)),
    );
  };

  return (
    <div className="team-wrapper">
      <header>
        <h2>Team {name}</h2>
      </header>

      <section className="team-section">
        {pokemonData.map((pokemon, index) => (
          <div className="pokemon-card-container" key={index}>
            <ul>
              <PokemonCard
                name={pokemon.name}
                type={pokemon.type}
                id={pokemon.id}
                isFavorite={pokemon.isFavorite}
                onToggleFavorite={() => toggleFavorite(index)}
              />
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
