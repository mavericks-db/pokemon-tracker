import '../stylesheets/navbar.scss';
import { NavLink, Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <h1>Pokemon League Tracker</h1>
        </NavLink>
        <NavLink to="/register_pokemon">Register Pokemon</NavLink>
        <NavLink to="/book_league">Book League</NavLink>
        <NavLink to="/all_pokemons">All Pokemons</NavLink>
        <NavLink to="/all_leagues">All Leagues</NavLink>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
