import '../styles/app.css';
import PokemonList from '../components/PokemonList.tsx';
import usePokemons from '../hooks/usePokemons.ts';
import { useEffect, useState } from 'react';
import { ListPokemon } from '../interfaces/pokemons.ts';
import Filter from '../components/Filter.tsx';

function App() {
  const { pokemons, hasMorePokemon, fetchNextPage, fetchPrevPage, loading } = usePokemons();
  const [filteredPokemons, setFilterPokemons] = useState<ListPokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const pokemonTypes = ['Grass', 'Fire', 'Water', 'Electric'];

  const handleTypeFilterChange = (selectedType: string) => {
    setSelectedType(selectedType);
  };

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

        {filteredPokemons.length > 0 ? <PokemonList pokemons={filteredPokemons} /> : <p>No Pokémon available</p>}
        {loading && <p>Loading...</p>}
        {hasMorePokemon && (
          <button className="next" onClick={fetchNextPage}>
            Next Page
          </button>
        )}
        <button className="prev" onClick={fetchPrevPage}>
          prev page
        </button>
      </main>
    </>
  );
}

export default App;
