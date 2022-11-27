import '../stylesheets/navbar.scss';
import { NavLink, Outlet } from 'react-router-dom';
import Pokeball from '../assets/images/pokeball.png';

function Navbar() {
  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <img src={Pokeball} alt="Pokeball" className="rotate-center" />
        </NavLink>
        <NavLink to="/home/register_pokemon">Register Pokemon</NavLink>
        <NavLink to="/home/book_league">Book League</NavLink>
        <NavLink to="/home/all_pokemons">Show Pokemons</NavLink>
        <NavLink to="/home/all_leagues">Show Leagues</NavLink>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
