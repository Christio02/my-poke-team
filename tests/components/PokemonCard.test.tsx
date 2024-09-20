import { render, screen } from '@testing-library/react';
import PokemonCard from '../../src/components/PokemonCard';
import { describe, it, expect } from 'vitest';


const mockPokemon = {
  name: "Raticate",
  images: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/20.svg",
  url:"https://pokeapi.co/api/v2/pokemon/20/",
  pokedexNumber: 20,
  types: ["Normal"],
};

describe('PokemonCard component', () => {
  it('renders PokemonCard with correct data', () => {
    render(<PokemonCard pokemon={mockPokemon} isFavorite={false} />);

    const pokemonName = screen.getByText(/Raticate/i);
    expect(pokemonName).toBeInTheDocument();

    const pokemonImage = screen.getByAltText('Raticate');
    expect(pokemonImage).toHaveAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/20.svg');

    const pokedexNumber = screen.getByText(/20/i);
    expect(pokedexNumber).toBeInTheDocument();

  });

});