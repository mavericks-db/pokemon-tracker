import { useEffect, useState } from "react";
// import { nanoid } from 'nanoid';
import "../stylesheets/allpokemons.scss";
import { Link } from "react-router-dom";

function AllPokemons() {
  const [arr, setArr] = useState([]);
  const apiURL = "http://localhost:5000/api/my_pokemons";

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      console.log(data);
      setArr(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="list-container">
        <h1>All my pokemons</h1>
        <>
          <table className="list-table">
            <tr>
              <th>No.</th>
              <th>Pokemon</th>
            </tr>
            {arr.length > 0 ? (
              arr.map((pokemon, idx) => (
                <>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>
                      <Link to={`/details/${pokemon.name}`} state={pokemon}>
                        {pokemon.name}
                      </Link>
                    </td>
                  </tr>
                </>
              ))
            ) : (
              <h5>Loading ... </h5>
            )}
          </table>
        </>
      </div>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default AllPokemons;
