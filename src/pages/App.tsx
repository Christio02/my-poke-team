import '../styles/app.css';
import Filter from '../components/Filter.tsx';
import PokemonList from '../components/PokemonList.tsx';
import usePokemons from '../hooks/usePokemons.ts';
import { useEffect, useState } from 'react';
import { ListPokemon } from '../interfaces/pokemons.ts';

function App() {
  const { pokemons, hasMorePokemon, fetchNextPage, loading } = usePokemons();
  const [filteredPokemons, setFilterPokemons] = useState<ListPokemon[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  const pokemonTypes = ['Grass', 'Fire', 'Water', 'Electric'];

  const handleTypeFilterChange = (selectedType: string) => {
    setSelectedType(selectedType);
  };

  // Only filter the already loaded Pokémon, no need to fetch during filtering
  useEffect(() => {
    if (selectedType) {
      const filtered = pokemons.filter((pokemon) =>
        pokemon.types.some((type: string) => type.toLowerCase() === selectedType.toLowerCase()),
      );
      setFilterPokemons(filtered.slice(0, 20)); // Ensure only 20 are shown
    } else {
      setFilterPokemons(pokemons.slice(0, 20)); // Default to first 20 when no filter
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
      </main>
    </>
  );
}

export default App;
