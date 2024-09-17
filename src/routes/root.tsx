import Nav from '../components/Nav.tsx';
import Banner from '../components/Banner.tsx';
import { Outlet } from 'react-router-dom';
import usePokemons from '../hooks/usePokemons.tsx';
import PokemonList from '../components/PokemonList.tsx';
import Footer from '../components/Footer.tsx';



export default function Root() {
  const { pokemons } = usePokemons();

  return (
<>
    <Nav />
  <Banner />

    <PokemonList pokemons={pokemons} />

    <Outlet />
  <Footer />
</>

)
  ;
}
