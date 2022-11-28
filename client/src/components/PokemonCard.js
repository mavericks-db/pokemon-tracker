import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import '../stylesheets/pokemoncard.scss';
import { useEffect, useState } from 'react';
import pokeball from '../assets/images/pokeball.png';

function PokemonCard() {
  const location = useLocation();
  const {
    name, attack, defense, speed,
  } = location.state;
  const [pokemonImg, setImg] = useState();
  const [pokemonImg2, setImg2] = useState();
  const [pokemonid, setID] = useState();
  const [baseXP, setXP] = useState();
  const [height, setHeight] = useState();
  const [weight, setWeight] = useState();
  const abilities = [];
  const [ability1, setAbility1] = useState();
  const [ability2, setAbility2] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setImg(data.sprites.other['official-artwork'].front_default);
      setImg2(data.sprites.versions['generation-v']['black-white'].animated.front_default);
      setID(data.id);
      setXP(data.base_experience);
      setHeight(data.height);
      setWeight(data.weight);
      Object.values(data.abilities).map((el) => abilities.push(el.ability.name));
      setAbility1(abilities[0]);
      setAbility2(abilities[1]);
    }
    fetchData();
  });

  return (
    <>
      <div className="pokemoncard-wrapper">
        <div className="pokemon-api">
          {pokemonImg ? (
            <>
              <img src={pokemonImg} alt="pokemon_image" draggable="false" className="pokemonpicture" />
            </>
          ) : (
            <>
              <img src={pokeball} alt="pokeball" draggable="false" className="pokemonpicture" />
            </>
          )}
          <h4>
            #
            {pokemonid}
            {' '}
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h4>
        </div>
        <div className="pokemon-details">
          <h3>Pokémon Stats</h3>
          <h5>
            Base XP: &nbsp;
            {baseXP}
          </h5>
          <h5>
            Height: &nbsp;
            {height}
          </h5>
          <h5>
            Weight: &nbsp;
            {weight}
          </h5>
          <h5>
            Attack Points: &emsp;
            {attack}
          </h5>
          <h5>
            Defense Points: &emsp;
            {defense}
          </h5>
          <h5>
            Speed Point: &emsp;
            {speed}
          </h5>
          <h5>
            Total Stats: &emsp;
            {attack + defense + speed}
          </h5>
          <h5>
            Abilities: &emsp;
            {ability1}
            ,
            {' '}
            {ability2}

          </h5>
          <Link to="/home" className="home-pokemoncard">
            <img src={pokemonImg2} alt="" />
            <FaHome />
            Home
          </Link>
        </div>
      </div>
    </>
  );
}

export default PokemonCard;
