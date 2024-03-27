function getImage(num) {
  return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${num}.png`;
}

function PokemonGraphic({ name, number }) {
  return (
    <div className="graphic">
      <h1>{name}</h1>
      <h1>{number}</h1>
      <img src={getImage("004")} width="100%" alt={name} />
    </div>
  );
}

function EvolutionGraphic({ chain }) {
  const evolutions = chain.map((pokemon) => (
    <div className="evolution" key={pokemon}>
      <img src={getImage(pokemon)} alt={`Evolution of ${pokemon}`} />
    </div>
  ));

  return <section className="evolutions">{evolutions}</section>;
}

export function Sidebar() {
  return (
    <div className="sidebar">
      <PokemonGraphic name="Charmander" number="005" />
      <EvolutionGraphic chain={["004", "005", "006"]} />
    </div>
  );
}
