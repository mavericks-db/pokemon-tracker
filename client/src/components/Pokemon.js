import { useForm } from 'react-hook-form';
import '../stylesheets/pokemon.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { nanoid } from 'nanoid';
import PokemonTypes from '../assets/images/PokemonTypes.webp';

function Pokemon() {
  const { register, handleSubmit } = useForm();
  const apiURL = 'http://localhost:5000/api/createpokemon';
  const navigate = useNavigate();

  const typeArr = [
    'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dark',
    'Dragon',
    'Steel',
    'Fairy',
  ];

  const computeTotal = () => {
    const stats = document.querySelectorAll('.stats');
    const totalArr = [];
    Array.from(stats).forEach((el) => {
      totalArr.push(parseInt(el.value, 10));
    });
    const total = totalArr.reduce((a, b) => a + b);
    document.querySelector('#total').value = total;
  };

  return (
    <>
      <div className="pokemon-wrapper">
        <h1>Please register your pokemon</h1>
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
              Pokemon Name:
              <input
                {...register('name', { required: true })}
                placeholder="Name"
                id="name"
              />
            </label>
            <label htmlFor="type">
              Pokemon Type:
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
              Attack Points:
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
              Defense Points:
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
              Speed Points:
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
              Total Points:
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
          NOTE: For the pokemon to be eligible to participate in any league, it
          is required to have the following stats - attack, defense, and speed.
          The total stats of the pokemon would be the sum of attack, defense,
          and speed.
        </h3>
        <Link to="/home" className="home">
          <FaHome />
          Home
        </Link>
      </div>
    </>
  );
}

export default Pokemon;
