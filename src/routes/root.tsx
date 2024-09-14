import Nav from '../components/Nav.tsx';
import Banner from '../components/Banner.tsx';
import { Outlet, useLocation } from 'react-router-dom';
import ImageApp from '../assets/banner.webp';
import desktopImageTeam from '../assets/banner-team.jpeg';
import mobileImageTeam from '../assets/banner-team-mb.jpeg';
import Footer from '../components/Footer.tsx';

export default function Root() {
  const location = useLocation();

  let bannerProps;
  if (location.pathname === '/team') {
    bannerProps = {
      title: 'Your Team',
      text: "Here you can view all the Pokemons you've favorited and added to your personal team. You can manage your team of up to 6 Pokemons, see their details, and adjust your strategy. If you've changed your mind, you can easily remove any Pokemon from your team by un-favoriting them, allowing you to make room for new additions.",
      desktopImage: desktopImageTeam,
      mobileImage: mobileImageTeam,
    };
  } else {
    bannerProps = {
      title: 'Explore Pokemons',
      text: 'Discover and explore a wide variety of Pokemons. Learn about their names, abilities and types. You can also select your favorite Pokemons and build your own dream team of up to 6 members. Add them to your personal collection by starring them, and strategize the best team to use in your battles!',
      desktopImage: ImageApp,
      mobileImage: ImageApp,
    };
  }

  return (
    <>
      <Nav />
      <Banner
        key={location.pathname}
        title={bannerProps.title}
        text={bannerProps.text}
        desktopImage={bannerProps.desktopImage}
        mobileImage={bannerProps.mobileImage}
      />
      <Outlet />
      <Footer />
    </>
  );
}
