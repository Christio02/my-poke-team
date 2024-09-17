import PokemonCard, { Pokemon } from '../../src/components/PokemonCard';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const createTestData = () => {
  return { name: 'Diglett', type: 'Earth', id: 50, isFavorite: false, onToggleFavorite: () => {} };
};
let testCardData: Pokemon;
beforeEach(() => {
  testCardData = createTestData();
});

describe('PokemonCard component', () => {
  it('renders with correct props and shows FaRegStar when not favorite ', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route
            path="/team"
            element={
              <PokemonCard
                name={testCardData.name}
                type={testCardData.name}
                id={testCardData.id}
                isFavorite={testCardData.isFavorite}
                onToggleFavorite={testCardData.onToggleFavorite}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    screen.debug();
    expect(screen.getByText('Diglett')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();

    const starIcon = screen.getByTestId(`non-favorite-icon-${testCardData.id}`);
    expect(starIcon).toBeInTheDocument();
  });
  it('matches snapshot with correct props and shows FaRegStar when not favorite ', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route
            path="/team"
            element={
              <PokemonCard
                name={testCardData.name}
                type={testCardData.name}
                id={testCardData.id}
                isFavorite={testCardData.isFavorite}
                onToggleFavorite={testCardData.onToggleFavorite}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
