import PokemonCard from '../../src/components/PokemonCard';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

const testData = {
  name: 'Diglett',
  type: 'Earth',
  id: 50,
  isFavorite: false,
  onToggleFavorite: () => {},
};

describe('PokemonCard component', () => {
  it('renders with correct props and shows FaRegStar when not favorite ', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route
            path="/team"
            element={
              <PokemonCard
                name={testData.name}
                type={testData.name}
                id={testData.id}
                isFavorite={testData.isFavorite}
                onToggleFavorite={testData.onToggleFavorite}
              />
            }
          />
        </Routes>
      </MemoryRouter>,
    );
    screen.debug();
    expect(screen.getByText('Diglett')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();

    const starIcon = screen.getByTestId('non-favorite-icon');
    expect(starIcon).toBeInTheDocument();
  });
});
