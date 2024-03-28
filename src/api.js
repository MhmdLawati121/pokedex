import React, { useEffect, useState } from 'react';

export function FetchData({ name, handleResponse, offset }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchJob() {
            try {
                const pokemonData = []
                for (let i = offset; i < offset + 20; i++) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch data');
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
    }, [name, handleResponse, offset]);

    return (null);
}
