import '../styles/pokemonCard.css';
import Cradily from '../assets/cradilypng.png';
import { FaRegStar, FaStar } from 'react-icons/fa';

export type Pokemon = {
  name: string;
  type: string;
  id: number;
  isFavorite: boolean;
  onToggleFavorite?: () => void;
};

export default function PokemonCard({ name, id, isFavorite, onToggleFavorite }: Pokemon) {
  let handleLeftclick;
  let handleRightclick;

  return (
    <section className="pokemonCard">
      <div className="pokemonName">
        <h2 className="pokemonNameHeader">{name}</h2>
      </div>
      <div className="icon">
        <img className="pokemonImage" src={Cradily} alt="" />
      </div>
      <div className="buttons">
        <button className="leftButton" onClick={handleLeftclick}>
          prevNum
        </button>
        <button className="rightButton" onClick={handleRightclick}>
          nextNum
        </button>
      </div>
      <button onClick={onToggleFavorite}>
        {!isFavorite && <FaRegStar size={30} />}
        {isFavorite && <FaStar size={30} color="yellow" />}
      </button>
      <div className="pokemonNumber">
        <h3>{id}</h3>
      </div>
      <div className="types">
        <div className="leftType"></div>
        <div className="rightType"></div>
      </div>
    </section>
  );
}
