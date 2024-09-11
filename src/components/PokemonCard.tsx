
import '../styles/pokemonCard.css';
import Cradily from '../assets/cradilyPKMN.png';





export default function PokemonCard(){

    let handleLeftclick;
    let handleRightclick;

  return (
    <section className="pokemonCard">
      <div className="pokemonName">
        <h2 className="pokemonNameHeader">Name of Pokemon</h2>
      </div>
      <div className="icon">
        <img className="pokemonImage" src={Cradily} alt="" />
      </div>
      <div className="buttons">
        <button className="leftButton" onClick={handleLeftclick}>prevNum</button>
        <button className="rightButton" onClick={handleRightclick}>nextNum</button>
      </div>
      <div className="pokemonNumber">
        <h3>pokemonNumber</h3>
      </div>
      <div className="types">
        <div className="leftType">
        </div>
        <div className="rightType">
        </div>
      </div>
    </section>
  )
}