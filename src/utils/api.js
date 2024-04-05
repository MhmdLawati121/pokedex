import React, { useEffect, useState } from "react";

// API request to obtain pokemon data to be displayed in cards
// Passed Params:
/* handleResponse: function to save returned data in state
 * offset: integer representing starting pokemon id, incremented depending on page number
 */
export function FetchData({ handleResponse, offset }) {
  // Error state
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

// API request to get image URL
// Passed Params:
/* name: string or integer representing pokemon name / id
 * setError: function to update error hook
 */
async function getUrl(name, setError) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const parsedResponse = await response.json();
    return parsedResponse.sprites?.other["official-artwork"]?.front_default;
  } catch (err) {
    setError(err.message);
  }
}

// API request to get pokemon details and evolution chain
// Passed Params:
/* id: integer representing pokemon id
 * handleResponse: function to save returned data (excluding evolutions) in state
 * handleEvolutions: function to save evolution chain in state
 */
export function FetchDetails({ id, handleResponse, handleEvolutions }) {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetches data of a single pokemon by name/id
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
            // Fetch data of the pokemon species
            const evoResponse = await fetch(
              `${parsedSpeciesResponse.evolution_chain.url}`
            );
            if (!evoResponse.ok) {
              throw new Error("Failed to fetch species data");
            }
            const parsedEvoResponse = await evoResponse.json();

            // Extract evolution details
            let evoData = parsedEvoResponse.chain;

            // Store evolution data
            // The data stored in evoChain in the format:
            // evoChain = [[base_pokemon Object], [middle_pokemon Object], [final_pokemon Object]]
            // for example:
            // evoChain = [[{oddish, 0, oddish.png}], [{gloom, 21, gloom.png}], [{vileplume, null, vileplume.png}, {bellossom, null, bellossom.png}]]
            let evoChain = [];
            let middleEvo = [];
            let finalEvo = [];

            // Save base evolution data
            async function TempUrl(name) {
              let temp_url =
                parsedResponse.name === name
                  ? parsedResponse.sprites?.other["official-artwork"]
                      ?.front_default
                  : await getUrl(name, setError);
              return temp_url;
            }
            let temp_url = await TempUrl(evoData.species.name);

            const basePokemon = [
              {
                name: evoData.species.name,
                level: 0,
                url: temp_url,
              },
            ];

            evoChain.push(basePokemon);

            // check if middle evolution exists
            if (evoData.evolves_to[0]) {
              for (let i = 0; i < evoData.evolves_to.length; i++) {
                temp_url = await TempUrl(evoData.evolves_to[i].species.name);
                const middle = {
                  name: evoData.evolves_to[i].species.name,
                  level: evoData.evolves_to[i].evolution_details[0].min_level,
                  url: temp_url,
                };
                middleEvo.push(middle);

                // check if third (final) evolution exists
                if (evoData.evolves_to[i].evolves_to[0]) {
                  for (
                    let j = 0;
                    j < evoData.evolves_to[i].evolves_to.length;
                    j++
                  ) {
                    temp_url = await TempUrl(
                      evoData.evolves_to[i].evolves_to[j].species.name
                    );
                    const final = {
                      name: evoData.evolves_to[i].evolves_to[j].species.name,
                      level:
                        evoData.evolves_to[i].evolves_to[j].evolution_details[0]
                          .min_level,
                      url: temp_url,
                    };
                    finalEvo.push(final);
                  }
                }
              }
            }
            if (!(middleEvo.length === 0)) {
              evoChain.push(middleEvo);
            }

            if (!(finalEvo.length === 0)) {
              evoChain.push(finalEvo);
            }

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
