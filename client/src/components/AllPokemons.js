import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import '../stylesheets/allpokemons.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function AllPokemons() {
  const [arr, setArr] = useState([]);
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}api/pokemon/my_pokemons`;
  const delUrl = `${process.env.REACT_APP_API_BASE_URL}api/pokemon/removepokemon`;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      setArr(data);
    }
    fetchData();
  }, [apiURL]);

  const deletePokemon = async (data) => {
    await fetch(delUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    navigate('/home');
  };

  return (
    <>
      <div className="list-container-pokemon">
        <h2>List of pokémons</h2>
        <>
          <table className="list-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Pokémon</th>
                <th>Type</th>
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
                          to={`/home/all_pokemons/details/${pokemon.name}`}
                          state={pokemon}
                        >
                          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </Link>
                      </td>
                      <td>{pokemon.type}</td>
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
                  <td>No registered pokemons to show.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      </div>
      <Link to="/home" className="home-allpokemons">
        <FaHome />
        Home
      </Link>
    </>
  );
}

export default AllPokemons;
