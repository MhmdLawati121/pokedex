import { useParams } from "react-router-dom";
import { FetchData, FetchDetails } from "../../utils/api";
import { useState } from "react";
import { typeColors } from "../../utils/colors";

function LargeImage({ url, types }) {
  return (
    <div
      className="header-image"
      style={{ backgroundColor: typeColors[types[0]] }}
    >
      <img src={url} alt="detailed view" width="350px"></img>
    </div>
  );
}

function Evolution({ evolutionData }) {
  return <button>{evolutionData[0].name}</button>;
}

function NameAndNumber({ name, number }) {
  if (number < 10) number = "N°00" + number;
  else if (number < 100) number = "N°0" + number;
  else number = "N°" + number;
  return (
    <section>
      <div className="detail-heading">
        <h2 className="name">{name}</h2>
      </div>
      <div className="detail-number">
        <h2>{number}</h2>
      </div>
    </section>
  );
}

function Type({ type }) {
  return (
    <div className="detail-type">
      <h2 style={{ backgroundColor: typeColors[type] }}>{type}</h2>
    </div>
  );
}

function Abilities({ abilities }) {
  const abilitiesList = abilities.map((ability) => (
    <li>{ability.ability.name}</li>
  ));
  return abilitiesList;
}

function Stats({ stats }) {
  const statsList = stats.map((stat) => (
    <li>{stat.stat.name + stat.base_stat}</li>
  ));
  return statsList;
}

function PokemonGraphic({ pokemonData }) {
  const name = pokemonData.name;
  const number = pokemonData.id;
  const types = pokemonData.types.map((type) => type.type.name);
  const image = pokemonData.sprites?.other["official-artwork"]?.front_default;
  const abilities = pokemonData.abilities;
  const stats = pokemonData.stats;

  return (
    <div className="graphic">
      {image && <LargeImage url={image} types={types}></LargeImage>}
      <NameAndNumber name={name} number={number}></NameAndNumber>
      <Type type={types[0]}></Type>
      <Abilities abilities={abilities}></Abilities>
      <Stats stats={stats}></Stats>
    </div>
  );
}

export function Sidebar() {
  const [pokemonData, setPokemonData] = useState({});
  const [evolutionData, setEvolutionData] = useState([]);

  function handleResponse(data) {
    console.log("Pokemon details:", data);
    setPokemonData(data);
  }

  function handleEvolutions(data) {
    console.log("Pokemon details:", data);
    setEvolutionData(data);
  }

  let { pokemonId } = useParams();
  pokemonId = pokemonId.slice(1);
  console.log(pokemonId);

  console.log(pokemonData);
  return (
    <div className="sidebar">
      <FetchDetails
        id={pokemonId}
        handleResponse={handleResponse}
        handleEvolutions={handleEvolutions}
      ></FetchDetails>
      {pokemonData.name && <PokemonGraphic pokemonData={pokemonData} />}
      {evolutionData && <Evolution evolutionData={evolutionData} />}
    </div>
  );
}
