import '../styles/teampage.css';
import { Favorites } from '../components/Favorites.tsx';

export function TeamPage() {
  return (
    <>
      <main className="team-page">
        <Favorites name="Chris" />
      </main>
    </>
  );
}
