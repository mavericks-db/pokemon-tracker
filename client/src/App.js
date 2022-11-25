import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Pokemon from './components/Pokemon';
import AllPokemons from './components/AllPokemons';
import PokemonCard from './components/PokemonCard';
import AllLeagues from './components/AllLeagues';
import League from './components/League';
import LeagueCard from './components/LeagueCard';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/register_pokemon" element={<Pokemon />} />
            <Route path="/all_pokemons" element={<AllPokemons />} />
            <Route path="/pokemon/details/:id" element={<PokemonCard />} />
            <Route path="/book_league" element={<League />} />
            <Route path="/all_leagues" element={<AllLeagues />} />
            <Route path="/league/details/:leagueid" element={<LeagueCard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
