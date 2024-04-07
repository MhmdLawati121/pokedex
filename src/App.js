import "./App.css";
import { useState } from "react";
import { title } from "./utils/utils";
import { FetchData } from "./utils/api";
import { Outlet } from "react-router-dom";
import { Card } from "./components/Cards/Cards";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { NextBtn, BackBtn } from "./components/Pagination/Pagination";

/**
 * Main application component
 * @returns {JSX.Element} The JSX for the main application
 */
function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(1);
  const [cachedData, setCachedData] = useState({});

  const handleResponse = (data) => {
    setPokemonData(data);
  };

  return (
    <div className="App">
      <Header></Header>

      <div className="container">
        {/* API call */}
        <FetchData
          handleResponse={handleResponse}
          offset={offset}
          cachedData={cachedData}
          setCachedData={setCachedData}
        />
        {/* Loading pokemon cards (20 at a time) */}
        <div className="cards">
          {pokemonData.map((pokemon, index) => (
            <Card
              key={index}
              name={title(pokemon.name)}
              number={offset + index}
              types={pokemon.types.map((type) => type.type.name)}
              url={pokemon.sprites.other["official-artwork"].front_default}
              weight={pokemon.weight}
              offset={offset}
            />
          ))}
        </div>
        {/* Router outlet - sidebar gets loaded here */}
        <Outlet></Outlet>

        {/* Pagination */}
        <div className="pageBtns">
          <BackBtn offset={offset} setOffset={setOffset}></BackBtn>
          <NextBtn offset={offset} setOffset={setOffset}></NextBtn>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
