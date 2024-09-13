import '../styles/banner.css';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface BannerProps {
  title: string;
  text: string;
  desktopImage: string;
  mobileImage: string;
}

function Banner({ title, text, desktopImage, mobileImage }: BannerProps) {
  const [bgImage, setBgImage] = useState(desktopImage);
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateBackground = () => {
      if (window.innerWidth <= 768) {
        setBgImage(mobileImage);
      } else {
        setBgImage(desktopImage);
      }
    };

    updateBackground();
    window.addEventListener('resize', updateBackground);

    setIsLoaded(true);

    return () => {
      window.removeEventListener('resize', updateBackground);
    };
  }, [desktopImage, mobileImage, location.pathname]);

  return (
    <header className="banner" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className={`banner-content ${isLoaded ? 'slide-in' : ''}`}>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </header>
  );
}

export default Banner;
