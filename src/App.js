import "./App.css";
import { FetchData } from "./api";
import { useState } from "react";
import { Sidebar } from "./sidebar"
import { Card } from "./cards"; // Assuming you have a Card component

function title(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function NextBtn({ offset, setOffset }) {
  function handleClick() { setOffset(offset + 20) }
  return (
    <button onClick={handleClick}> Next </button>
  )
}

function BackBtn({ offset, setOffset }) {
  function handleClick() { setOffset(offset - 20) }
  return (
    <button onClick={handleClick}> Back </button>
  )
}

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(1);

  const handleResponse = (data) => {
    setPokemonData(data);
  };

  return (
    <div className="App">
      <div className="container">
        <FetchData handleResponse={handleResponse} offset={offset} />
        <div className="cards">
          {pokemonData.map((pokemon, index) => (
            <Card
              key={index} // Assuming each card needs a unique key
              name={title(pokemon.name)}
              number={offset + index} // Assuming the Pokemon number starts from 1
              types={pokemon.types.map((type) => type.type.name)}
              url={pokemon.sprites.other['official-artwork'].front_default}
            />
          ))}
        </div>
        <Sidebar></Sidebar>
        <div>
          <BackBtn offset={offset} setOffset={setOffset}></BackBtn>
          <NextBtn offset={offset} setOffset={setOffset}></NextBtn>
        </div>
      </div>
    </div>
  );
}

export default App;
