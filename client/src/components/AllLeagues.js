import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import '../stylesheets/allleagues.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

function AllLeagues() {
  const [arr, setArr] = useState([]);
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}api/my_leagues`;
  const delURL = `${process.env.REACT_APP_API_BASE_URL}api/deleteleague`;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setArr(data);
    }
    fetchData();
  }, [apiURL]);

  const removeLeague = async (data) => {
    await fetch(delURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    navigate('/home');
  };

  return (
    <>
      <div className="list-container">
        <h2>Upcoming Pokémon Leagues</h2>
        <>
          <table className="list-table">
            <thead>
              <tr>
                <th>No.</th>
                <th>Title</th>
                <th>Location</th>
                <th>Terrain</th>
                <th>Date</th>
                <th>Slots</th>
                <th>Max Total Stats</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {arr.length > 0 ? (
                arr.map((league, idx) => (
                  <React.Fragment key={nanoid()}>
                    <tr>
                      <td>{idx + 1}</td>
                      <td>
                        <Link
                          to={`/home/league/details/${league.title}`}
                          state={league}
                        >
                          {league.title.charAt(0).toUpperCase() + league.title.slice(1)}
                        </Link>
                      </td>
                      <td>{league.location.charAt(0).toUpperCase() + league.location.slice(1)}</td>
                      <td>{league.terrain.charAt(0).toUpperCase() + league.terrain.slice(1)}</td>
                      <td>{league.date.slice(0, 10)}</td>
                      <td>{league.slots}</td>
                      <td>{league.maxstats}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => removeLeague(league)}
                        >
                          X
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td>No booked leagues to show.</td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      </div>
      <Link to="/home" className="home-allleagues">
        <FaHome />
        Home
      </Link>
    </>
  );
}

export default AllLeagues;
