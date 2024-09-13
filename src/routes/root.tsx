import Nav from '../components/Nav.tsx';
import Banner from '../components/Banner.tsx';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <Nav />
      <Banner />
      <Outlet />
    </>
  );
}
