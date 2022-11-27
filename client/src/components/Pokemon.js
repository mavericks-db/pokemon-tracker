import { useForm } from 'react-hook-form';
import '../stylesheets/pokemon.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import { nanoid } from 'nanoid';

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
              <option value="Null">---</option>
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
            />
          </label>
          <label htmlFor="stats">
            Total Points:
            <input placeholder="calculating ..." id="total" readOnly disabled />
          </label>

          <button type="submit">Submit</button>
          <button
            type="button"
            id="reset"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </form>
        <Link to="/home">
          <FaHome />
        </Link>
      </div>
    </>
  );
}

export default Pokemon;
