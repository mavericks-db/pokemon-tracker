import { useLocation } from 'react-router-dom';

function PokemonCard() {
  const location = useLocation();
  const {
    name, attack, defense, speed,
  } = location.state;

  return (
    <>
      <h1>This is a pokemon card</h1>
      <h3>{name}</h3>
      <h5>{attack}</h5>
      <h5>{defense}</h5>
      <h5>{speed}</h5>
      <h5>{attack + defense + speed}</h5>
    </>
  );
}

export default PokemonCard;
