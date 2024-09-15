import { render, screen } from '@testing-library/react';
import { Favorites } from '../../src/components/Favorites';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';

vi.mock('../../src/components/PokemonCard', () => ({
  // used gpt here:"The pokemoncard components all have different rendered names: <code> how can I check that 6 children are rendered?"
  default: () => <div>PokemonCard</div>,
}));

const testData = {
  name: 'Chris',
};

describe('Favorites component', () => {
  it('renders with correct props ', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites name={testData.name} />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText('Team Chris')).toBeInTheDocument();
  });

  it('renders 6 PokemonCard components', () => {
    render(
      <MemoryRouter initialEntries={['/team']}>
        <Routes>
          <Route path="/team" element={<Favorites name={testData.name} />} />
        </Routes>
      </MemoryRouter>,
    );
    const pokemonCards = screen.getAllByText('PokemonCard');
    expect(pokemonCards).toHaveLength(6);
  });
});
