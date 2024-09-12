import pokeball from '../assets/pokeball.png';
import '../styles/nav.css';
import { useState } from 'react';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="header">
      <div className="logo">
        <img src={pokeball} alt="pokeball" />
      </div>
      <div className={`nav ${isOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li>
            <button className="nav-button">Explore Pokemons</button>
          </li>
          <li>
            <button className="nav-button">Your Team</button>
          </li>
        </ul>
      </div>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </nav>
  );
}

export default Nav;
