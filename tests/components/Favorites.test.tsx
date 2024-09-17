import { render, screen } from '@testing-library/react';
import { Favorites, FavoritesProps } from '../../src/components/Favorites';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { FaRegStar, FaStar } from 'react-icons/fa';

vi.mock('../../src/components/PokemonCard', () => ({
  // used gpt here:"The pokemoncard components all have different rendered names: <code> how can I check that 6 children are rendered?"
  default: ({
    id,
    isFavorite,
    onToggleFavorite,
  }: {
    id: number;
    isFavorite: boolean;
    onToggleFavorite: () => void;
  }) => (
    <div>
      PokemonCard
      <button onClick={onToggleFavorite} data-testid={`favorite-button-${id}`}>
        {!isFavorite && (
          <span data-testid="non-favorite-icon">
            <FaRegStar size={30} data-testid={`non-favorite-icon-${id}`} />
          </span>
        )}
        {isFavorite && (
          <span data-testid="favorite-icon">
            <FaStar size={30} color="yellow" data-testid={`favorite-icon-${id}`} />
          </span>
        )}
      </button>
    </div>
  ),
}));

const createTestData = () => {
  return {
    name: 'Test',
  };
};

let testFavoritesData: FavoritesProps;
beforeEach(() => {
  testFavoritesData = createTestData();
});

describe('Favorites component', () => {
  it('renders with correct props ', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites name={testFavoritesData.name} />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('Team Test')).toBeInTheDocument();
  });

  it('matches snapshot with correct props', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites name={testFavoritesData.name} />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders 6 PokemonCard components', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites name={testFavoritesData.name} />} />
        </Routes>
      </MemoryRouter>,
    );
    const pokemonCards = screen.getAllByText('PokemonCard');
    expect(pokemonCards).toHaveLength(6);
  });

  it('toggles favorite pokemon when button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites name="Test" />} />
        </Routes>
      </MemoryRouter>,
    );
    const favoriteButton = screen.getByTestId(`favorite-button-1`);
    await user.click(favoriteButton);
    expect(screen.queryByTestId('non-favorite-icon-1')).toBeInTheDocument();
  });
});
