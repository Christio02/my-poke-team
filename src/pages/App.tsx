import { useState, useCallback, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/app.css';
import PokemonList from '../components/PokemonList';
import usePokemons from '../hooks/usePokemons';
import { usePokemonContext } from '../context/usePokemonContext.ts';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import Filter from '../components/Filter';
import { pokemonTypes } from '../interfaces/pokemons.ts';

const queryClient = new QueryClient();

function AppContent() {
  const { pokemons, fetchNextPage, fetchPrevPage, isLoading, isFetching } = usePokemons();
  const [selectedType, setSelectedType] = useState<string>(() => {
    return sessionStorage.getItem('filter') || '';
  });
  const { toggleFavorite, isFavorited } = usePokemonContext();

  const handleTypeFilterChange = useCallback((selectedType: string) => {
    setSelectedType(selectedType);
    sessionStorage.setItem('filter', selectedType);
  }, []); // optimized version so not unnecessary re-render

  const filteredPokemons = useMemo(() => {
    // only re-render if one dependencies changes. claude.ai: "Error: Maximum update depth exceeded. Where in app.tsx does it happen
    if (selectedType) {
      return pokemons
        .filter((pokemon) => pokemon.types.some((type: string) => type.toLowerCase() === selectedType.toLowerCase()))
        .slice(0, 20);
    }
    return pokemons.slice(0, 20);
  }, [pokemons, selectedType]);

  return (
    <main className="main">
      <Filter name="Type" values={pokemonTypes} onFilterChange={handleTypeFilterChange} />

      {filteredPokemons.length > 0 ? (
        <PokemonList
          pokemons={filteredPokemons}
          isFavorited={isFavorited}
          onToggleFavorite={toggleFavorite}
          isLoading={isLoading || isFetching}
        />
      ) : (
        <p>No Pokémon of this type in this page</p>
      )}
      {isLoading && <p>Loading...</p>}

      <section className="button-container">
        <button onClick={fetchPrevPage} className="prev">
          <MdKeyboardArrowLeft className="arrow" />
          Previous
        </button>

        <button onClick={fetchNextPage} className="next">
          Next
          <MdKeyboardArrowRight className="arrow" />
        </button>
      </section>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
