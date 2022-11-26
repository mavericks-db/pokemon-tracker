import { useForm } from 'react-hook-form';
import '../stylesheets/pokemon.scss';
import { Link, useNavigate } from 'react-router-dom';

function Pokemon() {
  const { register, handleSubmit } = useForm();
  const apiURL = 'http://localhost:5000/api/createpokemon';
  const navigate = useNavigate();

  return (
    <>
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
          navigate('/all_pokemons');
        })}
        className="form-container"
      >
        <h2>Pokemon Statistics</h2>
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
          <input
            {...register('type', { required: true })}
            placeholder="Type"
            id="type"
          />
        </label>
        <h2>Pokemon Statistics</h2>
        <label htmlFor="attack">
          Attack Points:
          <input
            {...register('attack', { required: true })}
            placeholder="Attack"
            id="attack"
          />
        </label>
        <label htmlFor="defense">
          Defense Points:
          <input
            {...register('defense', { required: true })}
            placeholder="Defense"
            id="defense"
          />
        </label>
        <label htmlFor="speed">
          Speed Points:
          <input
            {...register('speed', { required: true })}
            placeholder="Speed"
            id="speed"
          />
        </label>
        <input type="submit" />
      </form>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default Pokemon;
