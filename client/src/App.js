import "./App.scss";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pokemon from "./components/Pokemon";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register_pokemon" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
