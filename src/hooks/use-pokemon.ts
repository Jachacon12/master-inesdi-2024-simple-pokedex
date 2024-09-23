import type { Pokemon, PokemonUri } from 'models';
import { useEffect, useState } from 'react';
import { calculateWeakness } from 'utils/WeaknessCalculator';

const cache = new Map<string, Pokemon>();

export function usePokemon(pokemonUri: PokemonUri) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemonUri.url);
        const data = await response.json();
        const weaknesses = calculateWeakness(data.types);
        const pokemon = { ...data, weaknesses: weaknesses };
        cache.set(pokemonUri.url, pokemon);
        setPokemon(pokemon);
      } catch (error) {
        console.error('Error fetching Pokemon:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!pokemonUri) return;

    if (cache.has(pokemonUri.url)) {
      setPokemon(cache.get(pokemonUri.url));
      setIsLoading(false);
    } else {
      fetchPokemonData();
    }
  }, [pokemonUri]);

  return { pokemon, isLoading };
}
