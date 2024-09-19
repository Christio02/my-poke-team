import '../styles/app.css';
import PokemonList from '../components/PokemonList.tsx';
import usePokemons from '../hooks/usePokemons.ts';
import { usePokemonContext } from '../context/usePokemonContext.ts';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { ListPokemon } from '../interfaces/pokemons.ts';
import Filter from '../components/Filter.tsx';

function App() {
  const { pokemons, fetchNextPage, fetchPrevPage, page, loading, hasMorePokemon } = usePokemons();
  const [filteredPokemons, setFilterPokemons] = useState<ListPokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const { toggleFavorite, isFavorited } = usePokemonContext();

  const pokemonTypes = ['Grass', 'Fire', 'Water', 'Electric'];

  const handleTypeFilterChange = (selectedType: string) => {
    setSelectedType(selectedType);
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
      setFilterPokemons(filtered.slice(0, 20));
    } else {
      setFilterPokemons(pokemons.slice(0, 20));
    }
  }, [pokemons, selectedType]);

  return (
    <>
      <main className="main">
        <Filter name="Type" values={pokemonTypes} onFilterChange={handleTypeFilterChange} />

        {filteredPokemons.length > 0 ? (
          <PokemonList pokemons={filteredPokemons} isFavorited={isFavorited} onToggleFavorite={toggleFavorite} />
        ) : (
          <p>No Pokémon of this type in this page</p>
        )}
        {loading && <p>Loading...</p>}

        <section className="button-container">
          <button className="prev" onClick={fetchPrevPage}>
            <MdKeyboardArrowLeft className="arrow" />
            Prev Page
          </button>
          {hasMorePokemon && (
            <button className="next" onClick={fetchNextPage}>
              Next Page
              <MdKeyboardArrowRight className="arrow" />
            </button>
          )}
        </section>
        <h3 className="page-number">Page {page}</h3>
      </main>
    </>
  );
}

export default App;
