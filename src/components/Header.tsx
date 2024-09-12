import pokeball from '../assets/pokeball.png';
import '../styles/Header.css';
import { useState } from 'react';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={pokeball} alt="pokeball" />
      </div>
      <nav className={`nav ${isOpen ? 'open' : ''}`}>
        <ul className="nav-links">
          <li>
            <button className="nav-button">Explore Pokemons</button>
          </li>
          <li>
            <button className="nav-button">Your Team</button>
          </li>
        </ul>
      </nav>
      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
    </header>
  );
}

export default Header;
