import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/app.css';
import PokemonList from '../components/PokemonList';
import usePokemons from '../hooks/usePokemons';
import { usePokemonContext } from '../context/PokemonContext';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { ListPokemon } from '../interfaces/pokemons';
import Filter from '../components/Filter';

const queryClient = new QueryClient();

function AppContent() {
  const { pokemons, fetchNextPage, fetchPrevPage, isLoading, isFetching } = usePokemons();
  const [filteredPokemons, setFilteredPokemons] = useState<ListPokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const { toggleFavorite, isFavorited } = usePokemonContext();

  const pokemonTypes = ['Grass', 'Fire', 'Water', 'Electric'];

  const handleTypeFilterChange = (selectedType: string) => {
    setSelectedType(selectedType);
    sessionStorage.setItem('filter', selectedType);
  };

  useEffect(() => {
    const savedFilter = sessionStorage.getItem('filter');
    if (savedFilter) {
      setSelectedType(savedFilter);
    }
  }, []);

  useEffect(() => {
    if (selectedType) {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.types.some((type: string) => type.toLowerCase() === selectedType.toLowerCase()),
      );
      setFilteredPokemons(filtered);
    } else {
      setFilteredPokemons(pokemons);
    }
  }, [pokemons, selectedType]);

  return (
    <main className="main">
      <Filter name="Type" values={pokemonTypes} onFilterChange={handleTypeFilterChange} />

      <PokemonList
        pokemons={filteredPokemons}
        isFavorited={isFavorited}
        onToggleFavorite={toggleFavorite}
        isLoading={isLoading || isFetching}
      />

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
