import { useForm } from 'react-hook-form';
import '../stylesheets/pokemon.scss';
import { Link, useNavigate } from 'react-router-dom';

function League() {
  const { register, handleSubmit } = useForm();
  const apiURL = 'http://localhost:5000/api/bookleague';
  const navigate = useNavigate();

  return (
    <>
      <h1>Please book a pokemon league</h1>
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
          navigate('/all_leagues');
        })}
        className="form-container"
      >
        <h2>League Details</h2>
        <label htmlFor="title">
          Title:
          <input
            {...register('title', { required: true })}
            placeholder="Title"
            id="title"
          />
        </label>
        <label htmlFor="type">
          Location:
          <input
            {...register('location', { required: true })}
            placeholder="Location"
            id="location"
          />
        </label>
        <label htmlFor="terrain">
          Terrain:
          <input
            {...register('terrain', { required: true })}
            placeholder="Terrain"
            id="terrain"
          />
        </label>
        <label htmlFor="date">
          Date:
          <input
            {...register('date', { required: true })}
            placeholder="Date"
            id="date"
            type="date"
          />
        </label>
        <label htmlFor="slots">
          No. of slots:
          <input
            {...register('slots', { required: true })}
            placeholder="Slots"
            id="slots"
            type="number"
          />
        </label>
        <label htmlFor="maxstats">
          Max limit of total stats:
          <input
            {...register('maxstats', { required: true })}
            placeholder="Max Limit"
            id="maxstats"
            type="number"
          />
        </label>

        <input type="submit" />
      </form>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default League;
