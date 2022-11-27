import '../stylesheets/intro.scss';
import Ash from '../assets/images/home.png';

function Intro() {
  return (
    <>
      <div className="home-wrapper">
        <h2 className="">Welcome to the Pokemon League !</h2>
        <img src={Ash} alt="Ash_team" draggable="false" />
        <div className="intro">
          <h3>
            Hi Trainer! Congratulations on qualifying for the Pokemon League.
            <br />
            <br />
            Before you need to continue, you need to register your pokemon and
            book them on the league. This web application will help you keep
            track of your pokemons and the leagues your pokemons will
            participate in.
            <br />
            <br />
            For every league, you have to fill in the required slots, each slot
            can have 1 pokemon or a pair of pokemons. A pokemon can enter
            multiple leagues.
          </h3>
        </div>
      </div>
    </>
  );
}

export default Intro;
