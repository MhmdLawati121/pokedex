import { useParams } from "react-router-dom";
import { FetchDetails } from "../../utils/api";
import { useState } from "react";
import { typeColors } from "../../utils/colors";
import { Link } from "react-router-dom";
import { Chart } from "../../utils/radar";
import { hexToRgba, title } from "../../utils/utils";
import icons from "../../media/icons";

//------------------------//
//------ Components ------//
//------------------------//

/**
 * Ccomponent to display Pokemon image with its type icon.
 *
 * @param {Object} props - Props object
 * @param {string} props.url - Image URL
 * @param {Array} props.types - Pokemon type(s)
 * @returns {JSX.Element} - JSX element representing the image
 */
function LargeImage({ url, types }) {
  return (
    <div
      className="header-image"
      style={{
        backgroundColor: hexToRgba(typeColors[types[0]], 0.8),
      }}
    >
      <img
        className="pokemonLargeImage"
        src={url}
        alt="detailed view"
        width="350px"
        style={{ position: "relative", zIndex: 1 }}
      ></img>
      <img
        src={icons[types[0]]}
        className="icon"
        alt="detailed view"
        width="250px"
        style={{
          border: `solid 3px ${typeColors[types[0]]}`,
        }}
      ></img>
    </div>
  );
}

/**
 * Component to display the evolution chain of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {Array} props.evolutionData - Evolution data of the Pokemon
 * @returns {JSX.Element} - JSX element representing the evolution chain
 */
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
    <div className="instruction-container">
      <div className="instruction">
        <h1>Click on a Pokemon to view its details</h1>
      </div>
    </div>
  );
}

/**
 * Component to display the name and number of a Pokemon.
 *
 * @param {Object} props - Props object
 * @param {string} props.name - Pokemon name
 * @param {number} props.number - Pokemon number
 * @returns {JSX.Element} - JSX element representing the name and number of the Pokemon
 */
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

/**
 * Component to display the types of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {Array} props.types - Pokemon Types
 * @returns {JSX.Element} - JSX element representing the types of the Pokemon
 */
function Type({ types }) {
  const typeGraphics = types.map((type) => (
    <h3 style={{ backgroundColor: typeColors[type] }}>{type}</h3>
  ));
  return <div className="detail-type">{typeGraphics}</div>;
}

/**
 * Component to display the stats of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {Array} props.stats - Pokemon stats
 * @param {string} props.mainType - Pokemon primary/main type
 * @returns {JSX.Element} - JSX element representing the stats of the Pokemon
 */
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
/**
 * Component to display the height of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {number} props.weight - Pokemon height
 * @returns {JSX.Element} - The JSX element representing Pokemon height
 */
// Component for displaying Pokemon height
function Height({ height }) {
  return <p>{height / 10} m</p>;
}

/**
 * Component to display the weight of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {number} props.weight - Pokemon weight
 * @returns {JSX.Element} - The JSX element representing Pokemon weight
 */
function Weight({ weight }) {
  return <p>{weight / 10} kg</p>;
}

/**
 * Component to display the base experience of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {number} props.base_experience - Base experience of Pokemon
 * @returns {JSX.Element} - The JSX element representing the base experience of the Pokemon
 */
function BaseExpreience({ base_experience }) {
  return <p>{base_experience} xp</p>;
}

/**
 * Component to display the abilities of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {Array} props.abilities - Pokemon abilities
 * @returns {JSX.Element} - JSX element representing the abilities of the Pokemon
 */
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

/**
 * Component to display all basic information of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {number} props.weight - Pokemon weight
 * @param {number} props.height - Pokemon height
 * @param {number} props.base_experience - Pokemon base exp.
 * @returns {JSX.Element} - JSX element representing all basic information of the Pokemon
 */
function PokemonBasicInfo({ weight, height, base_experience }) {
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
          <BaseExpreience base_experience={base_experience}></BaseExpreience>
        </div>
      </div>
    </div>
  );
}

/**
 * Component to display entire pokemon graphic
 *
 * @param {Object} props - Props object
 * @param {Object} props.pokemonData - All pokemon data
 * @returns {JSX.Element} - JSX element representing graphic data of Pokemon
 */
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

/**
 * Component for the sidebar
 *
 * @returns {JSX.Element} - JSX element representing the main sidebar
 */
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
