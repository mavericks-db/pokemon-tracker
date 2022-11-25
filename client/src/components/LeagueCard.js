import { useLocation } from 'react-router-dom';

function LeagueCard() {
  const location = useLocation();
  const {
    title, leaguelocation, terrain, date, slots, maxstats
  } = location.state;

  return (
    <>
      <h1>This is a league card</h1>
      <h3>{title}</h3>
      <h5>{leaguelocation}</h5>
      <h5>{terrain}</h5>
      <h5>{date}</h5>
      <h5>{slots}</h5>
      <h5>{maxstats}</h5>
    </>
  );
}

export default LeagueCard;
