import { useEffect, useState } from "react";
// import { nanoid } from 'nanoid';
import "../stylesheets/allpokemons.scss";
import { Link } from "react-router-dom";

function AllLeagues() {
  const [arr, setArr] = useState([]);
  const apiURL = "http://localhost:5000/api/my_leagues";

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
        <h1>All my leagues</h1>
        <>
          <table className="list-table">
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Location</th>
              <th>Terrain</th>
              <th>Date</th>
              <th>Slots</th>
              <th>Max Total Stats</th>
            </tr>
            {arr.length > 0 ? (
              arr.map((league, idx) => (
                <>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>
                      <Link to={`/league/details/${league.title}`} state={league}>
                        {league.title}
                      </Link>
                    </td>
                    <td>{league.location}</td>
                    <td>{league.terrain}</td>
                    <td>{league.date}</td>
                    <td>{league.slots}</td>
                    <td>{league.maxstats}</td>
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

export default AllLeagues;
