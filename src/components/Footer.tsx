import '../styles/footer.css';
import pokeball from '../assets/pokeball.png';
export default function Footer() {
  return (
    <footer className="footer">
      <img className="pokeball" src={pokeball} alt="pokeball" />
      <h3 className="info">Thank you for using team builder</h3>
    </footer>
  );
}
