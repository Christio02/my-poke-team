import '../styles/favorites.css';
import React, { useEffect, useState } from 'react';
import { RiPencilFill } from 'react-icons/ri';
import { IoIosSave } from 'react-icons/io';
import PokemonCard from './PokemonCard.tsx';
import { ListPokemon } from '../interfaces/pokemons.tsx';

interface FavoritesProps {
  pokemons: ListPokemon[];
  onToggleFavorite: (pokemon: ListPokemon) => void;
  isFavorited: (pokemon: ListPokemon) => boolean;
}

export function Favorites({ pokemons, onToggleFavorite, isFavorited }: FavoritesProps) {
  const [name, setName] = useState(() => {
    const savedName = localStorage.getItem('teamName');
    return savedName || 'Team name';
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('teamName', name);
  }, [name]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newName = e.target.value;

    if (newName.length > 20) {
      newName = newName.substring(0, 20);
    }

    setName(newName);
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
            {name}
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
        {pokemons.length > 0 ? (
          pokemons.map((pokemon) => (
            <div className="pokemon-card-container" key={pokemon.pokedexNumber}>
              <PokemonCard
                pokemon={pokemon}
                isFavorite={isFavorited(pokemon)}
                onToggleFavorite={() => onToggleFavorite(pokemon)}
              />
            </div>
          ))
        ) : (
          <p className="no-pokemons-text">No Pokémons in your team.</p>
        )}
      </section>
    </div>
  );
}
