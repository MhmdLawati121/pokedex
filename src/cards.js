// Pokemon Image
function Image({ name, number }) {
  return (
    <img
      src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`}
      alt={name}
    ></img>
  );
}

// Pokemon Card
function Card({ name, number, types }) {
  let cardBorderColor, typeBackground;
  const typeColors = {
    fire: "rgba(255,0,0,1)",
    grass: "rgba(0,255,0,1)",
    water: "rgba(0,0,255,1)",
  };

  if (types.length > 1) {
    cardBorderColor = `linear-gradient(to right, ${typeColors[types[0]]}, ${
      typeColors[types[1]]
    })`;
    console.log(cardBorderColor);
    typeBackground = cardBorderColor;
  } else if (types.length === 1) {
    cardBorderColor = typeColors[types[0]];
    typeBackground = cardBorderColor;
  }

  return (
    <div className={`card`} style={{ border: `3px solid ${cardBorderColor}` }}>
      <h1>{name}</h1>
      <h3>#{number}</h3>
      <Image number={number}></Image>
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
  );
}

// Exported function
export function Cards() {
  return (
    <div className="cards">
      <Card name="bulbasaur" number="001" types={["grass"]}></Card>
      <Card name="ivysaur" number="002" types={["grass"]}></Card>
      <Card name="venusaur" number="003" types={["grass"]}></Card>
      <Card name="charmander" number="004" types={["fire"]}></Card>
      <Card name="charmeleon" number="005" types={["fire"]}></Card>
      <Card name="charizard" number="006" types={["fire"]}></Card>
      <Card name="squirtle" number="007" types={["water"]}></Card>
      <Card name="wartortle" number="008" types={["water"]}></Card>
      <Card name="blaustoise" number="009" types={["water"]}></Card>
    </div>
  );
}
