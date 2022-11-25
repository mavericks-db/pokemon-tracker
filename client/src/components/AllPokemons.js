import React, { useEffect, useState } from 'react';
// import { nanoid } from 'nanoid';
import '../stylesheets/allpokemons.scss';
import { Link, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

function AllPokemons() {
  const [arr, setArr] = useState([]);
  const apiURL = 'http://localhost:5000/api/my_pokemons';
  const delUrl = 'http://localhost:5000/api/removepokemon';
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      console.log(data);
      setArr(data);
    }
    fetchData();
  }, []);

  const deletePokemon = async (data) => {
    // console.log(data);
    const response = await fetch(delUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const responsedata = await response.json();
    console.log(responsedata);
    navigate('/');
  };

  return (
    <>
      <div className="list-container">
        <h1>All my pokemons</h1>
        <>
          <table className="list-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Pokemon</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arr.length > 0 ? (
                arr.map((pokemon, idx) => (
                  <React.Fragment key={nanoid()}>
                    <tr>
                      <td>{idx + 1}</td>
                      <td>
                        <Link
                          to={`/pokemon/details/${pokemon.name}`}
                          state={pokemon}
                        >
                          {pokemon.name}
                        </Link>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => deletePokemon(pokemon)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td>Loading ... </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      </div>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default AllPokemons;
