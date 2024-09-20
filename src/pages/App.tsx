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
  const [currentPage, setCurrentPage] = useState(1);

  const handleTypeFilterChange = useCallback((selectedType: string) => {
    setSelectedType(selectedType);
    sessionStorage.setItem('filter', selectedType);
  }, []);

  const filteredPokemons = useMemo(() => {
    if (selectedType) {
      return pokemons
        .filter((pokemon) => pokemon.types.some((type: string) => type.toLowerCase() === selectedType.toLowerCase()))
        .slice(0, 20);
    }
    return pokemons.slice(0, 20);
  }, [pokemons, selectedType]);

  const handleNextPage = () => {
    if (!isLoading && !isFetching) {
      fetchNextPage();
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (!isLoading && !isFetching) {
      fetchPrevPage();
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }
  };

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
        <p className="message">No Pokémon of this type in this page</p>
      )}
      {isLoading && <p className="message">Loading...</p>}

      <section className="button-container">
        <button onClick={handlePrevPage} className="prev" disabled={isLoading || isFetching}>
          <MdKeyboardArrowLeft className="arrow" />
          Prev
        </button>

        <button onClick={handleNextPage} className="next" disabled={isLoading || isFetching}>
          Next
          <MdKeyboardArrowRight className="arrow" />
        </button>
      </section>

      <h3 className="page-number">Page {currentPage}</h3>
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
