// Pokemon Image
function Image({ name, number, url }) {
  return (
    <img
      src={url}
      alt={name}
    ></img>
  );
}

// Pokemon Card
export function Card({ name, number, types, url }) {

  let cardBorderColor, typeBackground;
  const typeColors = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  if (types.length > 1) {
    cardBorderColor = `linear-gradient(45deg, ${typeColors[types[0]]}, ${typeColors[types[1]]
      })`;
    console.log(cardBorderColor);
    typeBackground = cardBorderColor;
  } else if (types.length === 1) {
    cardBorderColor = typeColors[types[0]];
    typeBackground = cardBorderColor;
  }

  return (
    types.length > 1 ?
      <div className="cardBorder" style={{ backgroundImage: cardBorderColor }}>
        <div className={`card`}>
          <h1>{name}</h1>
          <h3>#{number}</h3>
          <Image number={number} url={url}></Image>
          <div
            className="type"
            style={{
              backgroundImage: typeBackground,
              color: "white",
            }}
          >
            {types.join(' / ')}
          </div>
        </div>
      </div>
      :
      <div className="cardBorder" style={{ backgroundColor: cardBorderColor }}>
        <div className={`card`}>
          <h1>{name}</h1>
          <h3>#{number}</h3>
          <Image number={number} url={url}></Image>
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
      </div>
  );
}

