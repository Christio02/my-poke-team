import desktopBackgroundImage from '../assets/banner.jpg';
import mobileBackgroundImage from '../assets/banner-mb.jpg';
import '../styles/banner.css';
import { useEffect, useState } from 'react';

function Banner() {
  const [bgImage, setBgImage] = useState(desktopBackgroundImage);

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth <= 768) {
        setBgImage(mobileBackgroundImage);
      } else {
        setBgImage(desktopBackgroundImage);
      }
    };

    updateBackground(); // Set initial background
    window.addEventListener('resize', updateBackground); // Update on window resize

    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, []);

  return (
    <header className="banner" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="banner-content">
        <h1>Tittel</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
      </div>
    </header>
  );
}

export default Banner;
