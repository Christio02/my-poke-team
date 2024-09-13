
import '../styles/pokemonCard.css';
import Cradily from '../assets/cradilyPKMN.png';





export default function PokemonCard(){

    let handleLeftclick;
    let handleRightclick;


  return (
    <main className="pokemonCard">
      <section className="pokemonName">
        <h2 className="pokemonNameHeader">Name of Pokemon</h2>
      </section>
      <div className="icon">
        <img className="pokemonImage" src={Cradily} alt="" />
      </div>
      <section className="buttons">
        <button className="leftButton" onClick={handleLeftclick}>prevNum</button>
        <button className="rightButton" onClick={handleRightclick}>nextNum</button>
      </section>

        <h3 className="pokemonNumber">pokemonNumber</h3>

      <section  className="types">
        <div className="leftType">
        </div>
        <div className="rightType">
        </div>
      </section>
    </main>
  )
}