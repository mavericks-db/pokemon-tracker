import { Link } from 'react-router-dom';
import '../stylesheets/welcome.scss';
import { VscDebugStart } from 'react-icons/vsc';
import PokemonLogo from '../assets/images/pokemonLogo.png';
import '../stylesheets/animations.scss';

function Welcome() {
  return (
    <div className="wrapper">
      <img src={PokemonLogo} alt="PokemonLogo" className="scale-in-center" draggable="false" />
      <h1 className="text-focus-in">LEAGUE TRACKER</h1>
      <Link to="home" className="text-focus-in">
        START HERE &nbsp;
        <VscDebugStart />
      </Link>
    </div>
  );
}

export default Welcome;
