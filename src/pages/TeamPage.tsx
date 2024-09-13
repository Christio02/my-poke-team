import '../styles/teampage.css';
import { Banner } from '../components/Banner.tsx';
import { Favorites } from '../components/Favorites.tsx';

export function TeamPage() {
  return (
    <>
      <main className="team-page">
        <Banner />
        <Favorites name="Chris" />
      </main>
    </>
  );
}
