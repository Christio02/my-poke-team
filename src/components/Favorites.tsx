import '../styles/team.css';
import React, { useEffect, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { IoIosSave } from 'react-icons/io';
import PokemonCard, { Pokemon } from './PokemonCard.tsx';

export function Favorites() {
  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem('teamName');
    return savedName || '';
  });
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

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

  const toggleFavorite = (id: number) => {
    setPokemonData((prevData) =>
      prevData.map((pokemon) => (pokemon.id === id ? { ...pokemon, isFavorite: !pokemon.isFavorite } : pokemon)),
    );
  };

  useEffect(() => {
    localStorage.setItem('teamName', name);
  }, [name]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };
  // used gpt to make team name editable when double clicking: "How can we make input field like double clicking team name to edit?"
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className="team-wrapper">
      <header>
        {isEditing ? (
          <input
            type="text"
            value={name}
            onChange={handleChange}
            onBlur={handleBlur}
            autoFocus
            className="input-team-name"
          />
        ) : (
          <h2 className="team-name" onDoubleClick={handleDoubleClick}>
            {name || 'Click pencil to edit name'}
          </h2>
        )}
        <div>
          <button className="edit-name-button" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <IoIosSave size={30} className="edit-name-icon" />
            ) : (
              <RiPencilFill size={30} className="edit-name-icon" />
            )}
          </button>
        </div>
      </header>

      <section className="team-section">
        {pokemonData
          .filter((pokemon) => pokemon.isFavorite)
          .map((pokemon) => (
            <div className="pokemon-card-container" key={pokemon.id}>
              <PokemonCard
                name={pokemon.name}
                type={pokemon.type}
                id={pokemon.id}
                isFavorite={pokemon.isFavorite}
                onToggleFavorite={() => toggleFavorite(pokemon.id)}
              />
            </div>
          ))}
      </section>
    </div>
  );
}
