import '../styles/app.css';
import PokemonList from '../components/PokemonList.tsx';
import usePokemons from '../hooks/usePokemons.tsx';
import { usePokemonContext } from '../context/PokemonContext';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { MdKeyboardArrowLeft } from 'react-icons/md';

function App() {
  const { pokemons, fetchNextPage, fetchPrevPage, page } = usePokemons();
  const { toggleFavorite, isFavorited } = usePokemonContext();

  return (
    <>
      <main className="main">
        <PokemonList pokemons={pokemons} onToggleFavorite={toggleFavorite} isFavorited={isFavorited} />

        <section className="button-container">
          <button className="prev" onClick={fetchPrevPage}>
            <MdKeyboardArrowLeft className="arrow" />
            Prev Page
          </button>

          <button className="next" onClick={fetchNextPage}>
            Next Page
            <MdKeyboardArrowRight className="arrow" />
          </button>
        </section>
        <h3 className="page-number">Page {page}</h3>
      </main>
    </>
  );
}

export default App;
