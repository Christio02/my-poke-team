import '../styles/app.css';
import Nav from '../components/Nav.tsx';
import Banner from '../components/Banner.tsx';
import { TeamPage } from './TeamPage.tsx';

function App() {
  return (
    <>
      <Nav />
      <Banner />
      <TeamPage />
    </>
  );
}

export default App;
