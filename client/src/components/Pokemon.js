import { useForm } from "react-hook-form";
import "../stylesheets/pokemon.scss";
import { Link, Navigate } from "react-router-dom";

function Pokemon() {
  const { register, handleSubmit } = useForm();
  const apiURL = "http://localhost:5000/api/createpokemon";
  return (
    <>
      <h1>Please register your pokemon</h1>
      <form
        onSubmit={handleSubmit((data) => {
          async function fetchData() {
            const response = await fetch(apiURL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
            const responsedata = await response.json();
            console.log(responsedata);
          }
          fetchData();
          console.log(data);
          <Navigate to="/all_pokemons" />;
        })}
        className="form-container"
      >
        <h2>Pokemon Statistics</h2>
        <label htmlFor="name">Pokemon Name:</label>
        <input
          {...register("name", { required: true })}
          placeholder="Name"
          id="name"
        />
        <label htmlFor="type">Pokemon Type:</label>
        <input
          {...register("type", { required: true })}
          placeholder="Type"
          id="type"
        />
        <h2>Pokemon Statistics</h2>
        <label htmlFor="attack">Attack Points</label>
        <input
          {...register("attack", { required: true })}
          placeholder="Attack Points"
          id="attack"
        />
        <label htmlFor="defense">Defense Points</label>
        <input
          {...register("defense", { required: true })}
          placeholder="Defense Points"
          id="defense"
        />
        <label htmlFor="speed">Speed Points</label>
        <input
          {...register("speed", { required: true })}
          placeholder="Speed Points"
          id="speed"
        />
        <input type="submit" />
      </form>
      <Link to="/">Back to Home</Link>
    </>
  );
}

export default Pokemon;
