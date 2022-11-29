import { useForm } from 'react-hook-form';
import '../stylesheets/pokemon.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import PokemonTypes from '../assets/images/PokemonTypes.webp';
import Names from './Names';
import Types from './Types';

function Pokemon() {
  const { register, handleSubmit } = useForm();
  const apiURL = `${process.env.REACT_APP_API_BASE_URL}api/createpokemon`;
  const navigate = useNavigate();
  const pknames = Names;
  const typeArr = Types;

  const computeTotal = () => {
    const stats = document.querySelectorAll('.stats');
    const totalArr = [];
    Array.from(stats).forEach((el) => {
      totalArr.push(parseInt(el.value, 10));
    });
    const total = totalArr.reduce((a, b) => a + b);
    document.querySelector('#total').value = total;
  };

  const searchHandler = (e) => {
    const val = e.target.value.charAt(0).toUpperCase()
      + e.target.value.slice(1);
    if (val.length > 0) {
      const sugg = document.querySelector('#suggestions');
      sugg.textContent = pknames.filter((pkname) => pkname.match(val));
    }
    return null;
  };

  return (
    <>
      <div className="pokemon-wrapper">
        <h2>Please register your pokémon</h2>
        <div className="form-wrapper">
          <form
            onSubmit={handleSubmit((data) => {
              async function fetchData() {
                await fetch(apiURL, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
                });
              }
              fetchData();
              navigate('/home/all_pokemons');
            })}
            className="form-container"
          >
            <label htmlFor="name">
              Pokémon Name: &emsp;
              <input
                {...register('name', { required: true })}
                placeholder="Name"
                id="name"
                onChange={(e) => searchHandler(e)}
              />
            </label>
            <p>Search suggestions:</p>
            <span id="suggestions"> </span>
            <label htmlFor="type">
              Pokémon Type: &emsp;
              <select {...register('type', { required: true })} id="type">
                <option value="???">???</option>
                {typeArr.map((type) => (
                  <option value={type} key={nanoid()}>
                    {type}
                  </option>
                ))}
                ;
              </select>
            </label>
            <label htmlFor="attack">
              Attack Points: &emsp;
              <input
                {...register('attack', { required: true })}
                placeholder="Attack"
                id="attack"
                onKeyUp={() => computeTotal()}
                className="stats"
                type="number"
              />
            </label>
            <label htmlFor="defense">
              Defense Points: &emsp;
              <input
                {...register('defense', { required: true })}
                placeholder="Defense"
                id="defense"
                onKeyUp={() => computeTotal()}
                className="stats"
                type="number"
              />
            </label>
            <label htmlFor="speed">
              Speed Points: &emsp;
              <input
                {...register('speed', { required: true })}
                placeholder="Speed"
                id="speed"
                onKeyUp={() => computeTotal()}
                className="stats"
                type="number"
              />
            </label>
            <label htmlFor="stats">
              Total Points: &emsp;
              <input
                placeholder="calculating ..."
                id="total"
                readOnly
                disabled
              />
            </label>
            <div>
              <button type="submit">Submit</button>
              <button
                type="button"
                id="reset"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </form>
          <div>
            <img src={PokemonTypes} alt="PokemonTypes" />
          </div>
        </div>
        <h3 className="info">
          NOTE: For the pokémon to be eligible to participate in any league, it
          is required to have the following stats - attack, defense, and speed.
          The total stats of the pokémon would be the sum of attack, defense,
          and speed.
        </h3>
        <Link to="/home" className="home-pokemon">
          <FaHome />
          Home
        </Link>
      </div>
    </>
  );
}

export default Pokemon;
