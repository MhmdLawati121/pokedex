import { useEffect, useState } from "react";

/**
 * Component for fetching Pokemon data
 *
 * @param {Object} props - Props object
 * @param {Function} props.handleResponse - Function to save returned data in state
 * @param {number} props.offset - Number representing starting Pokemon ID
 * @param {Object} props.cachedData - Cached Pokemon data
 * @param {Function} props.setCachedData - Function to set cached Pokemon data
 * @returns {JSX.Element} - JSX element representing the fetching component
 */

export function FetchData({
  handleResponse,
  offset,
  cachedData,
  setCachedData,
}) {
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function fetchJob() {
      try {
        const pokemonData = [];
        for (let i = offset; i < offset + 20; i++) {
          const cachedPokemon = cachedData[i];
          if (cachedPokemon) {
            pokemonData.push(cachedPokemon);
          } else {
            const response = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${i}/`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const parsedResponse = await response.json();
            pokemonData.push(parsedResponse);
            setCachedData((prevCachedData) => ({
              ...prevCachedData,
              [i]: parsedResponse,
            }));
          }
        }
        handleResponse(pokemonData);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchJob();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return null;
}

/**
 * Function to get the URL of a Pokemon image
 *
 * @param {string|number} name - Pokemon name or ID
 * @param {Function} setError - Function to update the error hook
 * @returns {Promise<string>} - URL of the Pokemon image
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

/**
 * Component for fetching Pokemon data
 *
 * @param {Object} props - Props object
 * @param {number} props.id - Number representing Pokemon ID
 * @param {Function} props.handleResponse - Function to save returned data (except evos)
 * @param {Function} props.handleEvolutions - Function to save evolution data
 * @returns {JSX.Element} - JSX element representing the fetching component
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
            // eevee works similarly: [[{eevee Object}], [{vaporeon Object}, {flareon Object}, ....]]
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (error) {
    console.log(error);
  }

  return null;
}
