import '../styles/app.css';
import Filter from '../components/Filter.tsx';
import PokemonList from '../components/PokemonList.tsx';
import usePokemons from '../hooks/usePokemons.tsx';
import { useState } from 'react';

function App() {
  const { pokemons, hasMorePokemon, fetchNextPage } = usePokemons();
  const [filteredPokemons, setFilterPokemons] = useState(pokemons);

  const pokemonTypes = ['Grass', 'Fire', 'Water', 'Electric'];
  const pokemonColors = ['Green', 'Red', 'Blue', 'Yellow'];

  const handleTypeFilterChange = (selectedType: string) => {
    if (selectedType === '') {
      setFilterPokemons(pokemons);
    } else {
      setFilterPokemons(
        pokemons.filter((pokemon) => {
          pokemon.ty;
          pes;
        }),
      );
    }
  };

  return (
    <>
      <main className="main">
        {/*<Filter name="Type" values={pokemonTypes} />*/}
        <PokemonList pokemons={pokemons}></PokemonList>
        {hasMorePokemon} (
        <button className="next" onClick={fetchNextPage}>
          next page
        </button>
        )
      </main>
    </>
  );
}

export default App;
