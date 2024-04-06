import { useEffect, useState } from "react";
import pokeLoading from "../../media/pokeLoading.png";
import { Link } from "react-router-dom";
import { typeColors } from "../../utils/colors";
import { hexToRgba, lightenColor } from "../../utils/utils";

// Pokemon Image
function Image({ name, number, url, offset }) {
  const [loading, setLoading] = useState(true);

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
            style={{
              width: "180px",
              height: "180px",
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
          width: "180px",
          height: "180px",
        }}
      />
    </div>
  );
}

// Pokemon Weight
function Weight({ weight }) {
  return (
    <div className="pokemon-weight">
      <i class="fa-solid fa-scale-unbalanced-flip"></i>
      <p>{weight / 10} kg</p>
    </div>
  );
}

// Pokemon Name
function Name({ name }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <div class="loader"></div> : <h1>{name}</h1>;
}

// Pokemon Number
function Number({ number }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return loading ? <div class="loader"></div> : <h3>#{number}</h3>;
}

// Pokemon Card
export function Card({
  name,
  number,
  types,
  url,
  setPokemonDetails,
  weight,
  offset,
}) {
  const primaryTypeColor = typeColors[types[0]];
  let cardBorderColor, typeBackground, cardColor;

  if (types.length > 1) {
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
