import { render, screen, fireEvent } from '@testing-library/react';
import { Favorites, FavoritesProps } from '../../src/components/Favorites';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Mock, vi } from 'vitest';

vi.mock('../../src/components/PokemonCard', () => ({
  default: ({
              pokemon,
              isFavorite,
              onToggleFavorite,
            }: {
    pokemon: { name: string; pokedexNumber: number };
    isFavorite: boolean;
    onToggleFavorite: () => void;
  }) => (
    <div>
      <p>{pokemon.name}</p>
      <button onClick={onToggleFavorite} data-testid={`favorite-button-${pokemon.pokedexNumber}`}>
        {isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </div>
  ),
}));

const samplePokemons = [
  {
    name: 'Bulbasaur',
    pokedexNumber: 1,
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    images: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['Grass', 'Poison'],
  },
  {
    name: 'Ivysaur',
    pokedexNumber: 2,
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
    images: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    types: ['Grass', 'Poison'],
  },
];

let testFavoritesData: FavoritesProps;
let mockOnToggleFavorite: Mock;
let mockIsFavorited: Mock;

beforeEach(() => {
  // Correctly spy on localStorage methods using vi.spyOn
  vi.spyOn(global.localStorage, 'setItem').mockImplementation(() => {});
  vi.spyOn(global.localStorage, 'getItem').mockReturnValue('Team name');

  mockOnToggleFavorite = vi.fn();
  mockIsFavorited = vi.fn((pokemon) => pokemon.pokedexNumber === 1); // Mock to favor Bulbasaur

  testFavoritesData = {
    pokemons: samplePokemons,
    onToggleFavorite: mockOnToggleFavorite,
    isFavorited: mockIsFavorited,
  };
});

afterEach(() => {
  // Ensure to restore mocks after each test to avoid conflicts
  vi.restoreAllMocks();
});

describe('Favorites component', () => {
  it('renders with correct props', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites {...testFavoritesData} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Ivysaur')).toBeInTheDocument();
  });

  it('matches snapshot with correct props', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites {...testFavoritesData} />} />
        </Routes>
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the correct number of PokemonCard components', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites {...testFavoritesData} />} />
        </Routes>
      </MemoryRouter>
    );
    const pokemonCards = screen.getAllByText(/Bulbasaur|Ivysaur/);
    expect(pokemonCards).toHaveLength(2); // As we have 2 Pokémon in the sample
  });

  it('renders "No Pokémons in your team" when there are no Pokémon', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites {...testFavoritesData} pokemons={[]} />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('No Pokémons in your team.')).toBeInTheDocument();
  });

  it('prevents team name from exceeding 20 characters', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites {...testFavoritesData} />} />
        </Routes>
      </MemoryRouter>
    );

    const teamNameElement = screen.getByText('Team name');
    fireEvent.doubleClick(teamNameElement);

    const inputElement = screen.getByDisplayValue('Team name');
    fireEvent.change(inputElement, { target: { value: 'A very long team name that exceeds 20 chars' } });
    fireEvent.blur(inputElement);

    const displayedName = screen.getByText('A very long team nam');
    expect(displayedName).toBeInTheDocument();
  });

  it('toggles favorite pokemon when button is clicked', async () => {
    const { findByTestId } = render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites {...testFavoritesData} />} />
        </Routes>
      </MemoryRouter>
    );

    const favoriteButton = await findByTestId('favorite-button-2'); // Ivysaur
    fireEvent.click(favoriteButton);
    expect(mockOnToggleFavorite).toHaveBeenCalledWith(samplePokemons[1]);
  });
});
