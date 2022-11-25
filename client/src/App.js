import "./App.scss";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokemon from "./components/Pokemon";
import AllPokemons from "./components/AllPokemons";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/register_pokemon" element={<Pokemon />} />
            <Route path="/all_pokemons" element={<AllPokemons />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
