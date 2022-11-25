import '../stylesheets/navbar.scss';
import { NavLink, Outlet } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <div className="navbar">
        <h1>Pokemon League Tracker</h1>
        <NavLink to="/register_pokemon">Register Pokemon</NavLink>
        <h2>Add League</h2>
        <NavLink to="/all_pokemons">All Pokemons</NavLink>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
