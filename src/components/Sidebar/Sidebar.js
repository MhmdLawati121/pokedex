import { useParams } from "react-router-dom";
import { FetchData, FetchDetails } from "../../utils/api";
import { useState } from "react";
import { typeColors } from "../../utils/colors";
import { Link } from "react-router-dom";
import { Chart } from "../../utils/radar";
import { hexToRgba, title } from "../../utils/utils";
import pokeBackground from "../../media/pokeLoading.png";

//------------------------//
//------ Components ------//
//------------------------//

// Component for displaying pokemon image
function LargeImage({ url, types }) {
  return (
    <div
      className="header-image"
      style={{
        backgroundColor: hexToRgba(typeColors[types[0]], 0.8),
        backgroundImage: `url(${pokeBackground})`,
        backgroundSize: "60% 70%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "150% -40%",
      }}
    >
      <img src={url} alt="detailed view" width="350px"></img>
    </div>
  );
}

// Component for displaying evolution chain
function Evolution({ evolutionData }) {
  const renderEvolutionChain = () => {
    return evolutionData.map((chain, index) => (
      <div key={index} className="evolution-chain-group">
        {chain.map((evolution, subIndex) => (
          <div key={subIndex}>
            <Link to={`../../pokemon/:${evolution.name}`}>
              <img
                src={evolution.url}
                style={{ width: "80px" }}
                alt={evolution.name}
              />
            </Link>
          </div>
        ))}
      </div>
    ));
  };
  return evolutionData && evolutionData.length > 0 ? (
    <div>
      <h2>Evolution Chain</h2>
      <div className="evolution-chain">{renderEvolutionChain()}</div>
    </div>
  ) : (
    <button disabled>Loading...</button>
  );
}

// Component for displaying pokemon details
function NameAndNumber({ name, number }) {
  if (number < 10) number = "N°000" + number;
  else if (number < 100) number = "N°00" + number;
  else if (number < 1000) number = "N°0" + number;
  else number = "N°" + number;
  return (
    <section>
      <div className="detail-heading">
        <h2 className="name">{title(name)}</h2>
      </div>
      <div className="detail-number">
        <h2>{number}</h2>
      </div>
    </section>
  );
}

// Component for displaying Pokemon type
function Type({ types }) {
  const typeGraphics = types.map((type) => (
    <h3 style={{ backgroundColor: typeColors[type] }}>{type}</h3>
  ));
  return <div className="detail-type">{typeGraphics}</div>;
}

// Component for displaying Pokemon stats
function Stats({ stats, mainType }) {
  const datasets = {
    data: [],
    backgroundColor: hexToRgba(typeColors[mainType], 0.2),
    borderColor: hexToRgba(typeColors[mainType], 0.8),
    borderWidth: 1,
  };

  for (let stat of stats) {
    datasets.data.push(stat.base_stat);
  }

  return (
    <div className="stat-chart main-sidebar-section">
      <h2>Stats</h2>
      <Chart datasets={datasets} className="chart-graphic"></Chart>
    </div>
  );
}

//---------------------------------------//
//------ Basic Pokemon information ------//
//---------------------------------------//

// Component for displaying Pokemon height
function Height({ height }) {
  return <p>{height / 10} m</p>;
}

// Component for displaying Pokemon weight
function Weight({ weight }) {
  return <p>{weight / 10} kg</p>;
}

// Component for displaying Pokemon base experience
function Base_Expreience({ base_experience }) {
  return <p>{base_experience} xp</p>;
}

// Component for displaying Pokemon abilities
function Abilities({ abilities }) {
  const abilitiesList = abilities.map((ability) => (
    <li>{ability.ability.name}</li>
  ));
  return (
    <div className="abilities-div main-sidebar-section">
      <h2>Abilities</h2>
      <ul>{abilitiesList}</ul>
    </div>
  );
}

// Component for displaying all Pokemon basic information
function PokemonBasicInfo({ abilities, weight, height, base_experience }) {
  return (
    <div className="basic-info main-sidebar-section">
      <div className="basic-info-main-div">
        <div className="basic-info-icon-div">
          <i class="fa-solid fa-ruler"></i>
          <Weight weight={weight}></Weight>
        </div>
        <div className="basic-info-icon-div">
          <i class="fa-solid fa-scale-unbalanced-flip"></i>
          <Height height={height}></Height>
        </div>
        <div className="basic-info-icon-div">
          <i class="fa-solid fa-bars-progress"></i>
          <Base_Expreience base_experience={base_experience}></Base_Expreience>
        </div>
      </div>
    </div>
  );
}

// Component for displaying Pokemon graphic details
function PokemonGraphic({ pokemonData }) {
  const name = pokemonData.name;
  const number = pokemonData.id;
  const height = pokemonData.height;
  const weight = pokemonData.weight;
  const types = pokemonData.types.map((type) => type.type.name);
  const image = pokemonData.sprites?.other["official-artwork"]?.front_default;
  const abilities = pokemonData.abilities;
  const base_experience = pokemonData.base_experience;
  const stats = pokemonData.stats;

  return (
    <div className="graphic">
      {image && <LargeImage url={image} types={types}></LargeImage>}
      <NameAndNumber name={name} number={number}></NameAndNumber>
      <Type types={types}></Type>
      <PokemonBasicInfo
        weight={weight}
        height={height}
        abilities={abilities}
        base_experience={base_experience}
      ></PokemonBasicInfo>
      <Abilities abilities={abilities}></Abilities>
      <Stats stats={stats} mainType={types[0]}></Stats>
    </div>
  );
}

//--------------------------------//
//------ Exported Component ------//
//--------------------------------//

// Main Sidebar Component
export function Sidebar() {
  const [pokemonData, setPokemonData] = useState({});
  const [evolutionData, setEvolutionData] = useState([]);

  function handleResponse(data) {
    setPokemonData(data);
  }

  function handleEvolutions(data) {
    console.log("Evolution details:", data);
    setEvolutionData(data);
  }

  let { pokemonId } = useParams();
  pokemonId = pokemonId.slice(1);

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
