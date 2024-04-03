import "./App.css";
import { useState } from "react";
import { FetchData } from "./utils/api";
import { title } from "./utils/utils";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Cards/Cards"; // Assuming you have a Card component
import { Outlet, Link } from "react-router-dom";
import { NextBtn, BackBtn } from "./components/Pagination/Pagination";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  const handleResponse = (data) => {
    setPokemonData(data);
  };

  return (
    <div className="App">
      <Header></Header>

      <div className="container">
        <FetchData handleResponse={handleResponse} offset={offset} />
        <div className="cards">
          {pokemonData.map((pokemon, index) => (
            <Card
              key={index} // Assuming each card needs a unique key
              name={title(pokemon.name)}
              number={offset + index} // Assuming the Pokemon number starts from 1
              types={pokemon.types.map((type) => type.type.name)}
              url={pokemon.sprites.other["official-artwork"].front_default}
              setPokemonDetails={setPokemonDetails}
              weight={pokemon.weight}
              offset={offset}
            />
          ))}
        </div>
        <Outlet></Outlet>
        <div className="pageBtns">
          <BackBtn offset={offset} setOffset={setOffset}></BackBtn>
          <NextBtn offset={offset} setOffset={setOffset}></NextBtn>
        </div>
      </div>
    </div>
  );
}

export default App;
