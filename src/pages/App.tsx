import '../styles/app.css';
import PokemonList from '../components/PokemonList.tsx';
import usePokemons from '../hooks/usePokemons.tsx';
function App() {
  const { pokemons, fetchNextPage, fetchPrevPage } = usePokemons();

  return (
    <>
      <main className="main">
        {/*<Filter name="Type" values={pokemonTypes} />*/}
        <PokemonList pokemons={pokemons}></PokemonList>

        <button className="next" onClick={fetchNextPage}>
          next page
        </button>

        <button className="prev" onClick={fetchPrevPage}>
          prev page
        </button>
      </main>
    </>
  );
}

export default App;
