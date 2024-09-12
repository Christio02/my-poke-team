import '../styles/team.css';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { useState } from 'react';
// import PokemonCard from './PokemonCard.tsx';

type Pokemon = {
  name: string;
  type: string;
  hp: number;
  isFavorite: boolean;
};

type FavoritesProps = {
  name: string;
};

export function Favorites({ name }: FavoritesProps) {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([
    {
      name: 'Bulbasaur',
      type: 'Grass',
      hp: 200,
      isFavorite: true,
    },
    {
      name: 'Charmander',
      type: 'Fire',
      hp: 250,
      isFavorite: false,
    },
    {
      name: 'Squirtle',
      type: 'Water',
      hp: 220,
      isFavorite: true,
    },
    {
      name: 'Pidgey',
      type: 'Normal',
      hp: 180,
      isFavorite: false,
    },
    {
      name: 'Jigglypuff',
      type: 'Fairy',
      hp: 270,
      isFavorite: true,
    },
    {
      name: 'Psyduck',
      type: 'Water',
      hp: 240,
      isFavorite: true,
    },
  ]);

  const handleFavoriteClick = (index: number) => {
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
              <li>{pokemon.name}</li>
              <li>{pokemon.type}</li>
              <li>{pokemon.hp}</li>
            </ul>
            {/*<PokemonCard />*/}
            <button onClick={() => handleFavoriteClick(index)}>
              {!pokemon.isFavorite && <FaRegStar size={30} />}
              {pokemon.isFavorite && <FaStar size={30} color="yellow" />}
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
