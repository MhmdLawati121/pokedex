import React, { useEffect, useState } from "react";

export function FetchData({ name, handleResponse, offset }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchJob() {
      try {
        const pokemonData = [];
        for (let i = offset; i < offset + 20; i++) {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${i}/`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const parsedResponse = await response.json();
          pokemonData.push(parsedResponse);
        }
        handleResponse(pokemonData);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchJob();
  }, [offset]);

  return null;
}

export function FetchDetails({ id, handleResponse, handleEvolutions }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get pokemon data
    async function fetchJob() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const parsedResponse = await response.json();

        // Send data to client-side
        handleResponse(parsedResponse);
        const speciesUrl = parsedResponse.species.url;
        /* -------------------------------------------------------------------- */
        try {
          // Get species data
          const speciesResponse = await fetch(`${speciesUrl}`);
          if (!speciesResponse.ok) {
            throw new Error("Failed to fetch species data");
          }
          const parsedSpeciesResponse = await speciesResponse.json();
          /* -------------------------------------------------------------------- */
          try {
            // Get species data
            const evoResponse = await fetch(
              `${parsedSpeciesResponse.evolution_chain.url}`
            );
            if (!evoResponse.ok) {
              throw new Error("Failed to fetch species data");
            }
            const parsedEvoResponse = await evoResponse.json();

            // Extract evolution details
            let evoData = parsedEvoResponse.chain;
            let evoChain = [];

            const basePokemon = {
              name: evoData.species.name,
              level: 0,
              url: function () {
                async function getUrl() {
                  try {
                    const response = await fetch(
                      `https://pokeapi.co/api/v2/pokemon/${this.name}/`
                    );
                    if (!response.ok) {
                      throw new Error("Failed to fetch data");
                    }
                    const parsedResponse = await response.json();
                    return parsedResponse.sprites?.other["official-artwork"]
                      ?.front_default;
                  } catch (err) {
                    setError(err.message);
                  }
                }

                return parsedResponse.name === this.name
                  ? parsedResponse.sprites?.other["official-artwork"]
                      ?.front_default
                  : getUrl();
              },
            };

            evoChain.push(basePokemon);

            for (let i = 0; i < evoData.evolves_to.length; i++) {
              const middle = {
                name: evoData.evolves_to[i].species.name,
                level: evoData.evolves_to[i].evolution_details[0].min_level,
              };

              const final = {
                name: evoData.evolves_to[i].evolves_to[0].species.name,
                level:
                  evoData.evolves_to[i].evolves_to[0].evolution_details[0]
                    .min_level,
              };
              evoChain.push(middle);
              evoChain.push(final);
            }
            console.log(evoChain);
            handleEvolutions(evoChain);
            /* -------------------------------------------------------------------- */
          } catch (error) {
            setError(error.message);
          }
          /* -------------------------------------------------------------------- */
        } catch (err) {
          setError(err.message);
        }
        /* -------------------------------------------------------------------- */
      } catch (err) {
        setError(err.message);
      }
    }
    fetchJob();
  }, [id]);

  return null;
}
