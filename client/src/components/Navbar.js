import "../stylesheets/navbar.scss";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <h1>Pokemon League Tracker</h1>
        <NavLink to="/register_pokemon">
          Register Pokemon
        </NavLink>
        <h2>Add League</h2>
      </div>
    </>
  );
}

export default Navbar;
