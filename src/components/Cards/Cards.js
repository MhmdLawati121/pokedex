import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { typeColors } from "../../utils/colors";
import { lightenColor } from "../../utils/utils";
import pokeLoading from "../../media/pokeLoading.png";

/**
 * Component to display Pokemon image in card.
 *
 * @param {Object} props - Props object
 * @param {string} props.name - Pokemon name
 * @param {number} props.number - Pokemon number (id)
 * @param {string} props.url - Image URL
 * @param {number} props.offset - Offset value (represents page)
 * @returns {JSX.Element} - The JSX element representing the Pokemon image
 */

function Image({ name, number, url, offset }) {
  const [loading, setLoading] = useState(true);

  // React useEffect hook to set aand detect loading states
  useEffect(() => {
    setLoading(true);
  }, [offset]);

  const handleImageLoad = () => {
    setLoading(false); // Set loading state to false when the image is loaded
  };

  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="pokemonImageContainer"
    >
      {loading && (
        <div className="loading-placeholder">
          <img
            src={pokeLoading}
            alt={"Loading screen"}
            style={{
              width: "11.2rem",
              height: "11.2rem",
            }}
          ></img>
        </div>
      )}
      <img
        src={url}
        alt={name}
        onLoad={handleImageLoad}
        style={{
          display: loading ? "none" : "block",
          width: "11.2rem",
          height: "11.2rem",
        }}
      />
    </div>
  );
}

/**
 * Component to display the weight of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {number} props.weight - Pokemon weight
 * @returns {JSX.Element} - The JSX element representing Pokemon weight
 */

function Weight({ weight }) {
  return (
    <div className="pokemon-weight">
      <i class="fa-solid fa-scale-unbalanced-flip"></i>
      {/* weight is divided by 10 due to PokeAPI weight floating point formatting */}
      <p>{weight / 10} kg</p>
    </div>
  );
}

/**
 * Component to display the name of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {string} props.name - Pokemon name
 * @returns {JSX.Element} - The JSX element representing Pokemon name
 */

function Name({ name }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <div class="loader"></div> : <h1>{name}</h1>;
}

/**
 * Component to display the number of a Pokemon
 *
 * @param {Object} props - Props object
 * @param {number} props.name - Pokemon number/id
 * @returns {JSX.Element} - The JSX element representing Pokemon number/id
 */

function Number({ number }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <div class="loader"></div> : <h3>#{number}</h3>;
}

/**
 * Component to display a Pokemon card
 *
 * @param {Object} props - Props object
 * @param {string} props.name - Pokemon name
 * @param {number} props.number - Pokemon number/id
 * @param {Array} props.types - Pokemon types {may have more than one}
 * @param {string} props.url - Image URL
 * @param {number} props.weight - Pokemon weight
 * @param {number} props.offset - Offset value (represents page)
 * @returns {JSX.Element} - The JSX element representing the Pokemon card
 */

export function Card({ name, number, types, url, weight, offset }) {
  const primaryTypeColor = typeColors[types[0]];
  let cardBorderColor, typeBackground, cardColor;

  // check number of types
  if (types.length > 1) {
    // pokemon with multiple types are given gradient backgrounds & borders
    cardBorderColor = `linear-gradient(45deg, ${primaryTypeColor}, ${
      typeColors[types[1]]
    })`;
    typeBackground = cardBorderColor;
    cardColor = `linear-gradient(45deg, ${lightenColor(
      primaryTypeColor,
      60
    )}, ${lightenColor(typeColors[types[1]], 60)}`;
  } else if (types.length === 1) {
    cardBorderColor = typeColors[types[0]];
    typeBackground = cardBorderColor;
    cardColor = lightenColor(primaryTypeColor, 70);
  }

  const cardBackgroundColor = lightenColor(typeColors[types[0]], 80);
  console.log(cardBackgroundColor);

  // return depends on types[] length
  return types.length > 1 ? (
    <div className="cardBorder" style={{ backgroundImage: cardBorderColor }}>
      <Link to={`pokemon/:${number}`}>
        <div className={`card`} style={{ backgroundImage: cardColor }}>
          <Name name={name}></Name>
          <Number number={number}></Number>
          <Image number={number} url={url} offset={offset}></Image>
          <Weight weight={weight}></Weight>
          <div
            className="type"
            style={{
              backgroundImage: typeBackground,
              color: "white",
            }}
          >
            {types.join(" / ")}
          </div>
        </div>
      </Link>
    </div>
  ) : (
    <div className="cardBorder" style={{ backgroundColor: cardBorderColor }}>
      <Link to={`pokemon/:${number}`}>
        <div className={`card`} style={{ backgroundColor: cardColor }}>
          <Name name={name}></Name>
          <Number number={number}></Number>
          <Image number={number} url={url}></Image>
          <Weight weight={weight}></Weight>

          <div
            className="type"
            style={{
              backgroundColor: typeBackground,
              color: "white",
            }}
          >
            {types[0]}
          </div>
        </div>
      </Link>
    </div>
  );
}
