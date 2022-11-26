import '../stylesheets/navbar.scss';
import { NavLink, Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div className="navbar">
        <NavLink to="/">
          <h1>Pokemon League Tracker</h1>
        </NavLink>
        <NavLink to="/home/register_pokemon">Register Pokemon</NavLink>
        <NavLink to="/home/book_league">Book League</NavLink>
        <NavLink to="/home/all_pokemons">All Pokemons</NavLink>
        <NavLink to="/home/all_leagues">All Leagues</NavLink>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
