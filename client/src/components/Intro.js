import '../stylesheets/intro.scss';
import Ash from '../assets/images/home.png';

function Intro() {
  return (
    <>
      <div className="home-wrapper">
        <h2 className="">Welcome to the Pokémon League !</h2>
        <img src={Ash} alt="Ash_team" draggable="false" />
        <div className="intro">
          <h3>
            Hi Trainer! Congratulations on qualifying for the Pokémon League.
            <br />
            <br />
            Before you can continue, you need to register your pokémons and
            book them on the league. This web application will help you keep
            track of your pokémons and the leagues your pokémons will
            participate in.
            <br />
            <br />
            For every league, you have to fill in the required slots, each slot
            can have 1 pokémon or a pair of pokémons. A pokémon can enter
            multiple leagues.
          </h3>
        </div>
      </div>
    </>
  );
}

export default Intro;
