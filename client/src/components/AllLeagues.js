import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import '../stylesheets/allpokemons.scss';
import { Link, useNavigate } from 'react-router-dom';

function AllLeagues() {
  const [arr, setArr] = useState([]);
  const apiURL = 'http://localhost:5000/api/my_leagues';
  const delURL = 'http://localhost:5000/api/deleteleague';
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiURL);
      const data = await response.json();
      setArr(data);
    }
    fetchData();
  }, []);

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
        <h1>All my leagues</h1>
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
                          {league.title}
                        </Link>
                      </td>
                      <td>{league.location}</td>
                      <td>{league.terrain}</td>
                      <td>{league.date}</td>
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
      <Link to="/home">Back to Home</Link>
    </>
  );
}

export default AllLeagues;
