import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import AllPokemons from './components/AllPokemons';
import PokemonCard from './components/PokemonCard';
import AllLeagues from './components/AllLeagues';
import League from './components/League';
import LeagueCard from './components/LeagueCard';
import Welcome from './components/Welcome';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/home" element={<Home />}>
            <Route path="/home/register_pokemon" element={<Pokemon />} />
            <Route path="/home/all_pokemons" element={<AllPokemons />} />
            <Route path="/home/pokemon/details/:id" element={<PokemonCard />} />
            <Route path="/home/book_league" element={<League />} />
            <Route path="/home/all_leagues" element={<AllLeagues />} />
            <Route path="/home/league/details/:leagueid" element={<LeagueCard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
