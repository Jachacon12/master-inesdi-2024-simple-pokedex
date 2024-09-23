import { PokemonType, PokemonWeakness } from 'models';

const typeWeaknesses: { [key: string]: string[] } = {
  normal: ['fighting'],
  fire: ['water', 'ground', 'rock'],
  water: ['electric', 'grass'],
  electric: ['ground'],
  grass: ['fire', 'ice', 'poison', 'flying', 'bug'],
  ice: ['fire', 'fighting', 'rock', 'steel'],
  fighting: ['flying', 'psychic', 'fairy'],
  poison: ['ground', 'psychic'],
  ground: ['water', 'ice', 'grass'],
  flying: ['electric', 'ice', 'rock'],
  psychic: ['bug', 'ghost', 'dark'],
  bug: ['fire', 'flying', 'rock'],
  rock: ['water', 'grass', 'fighting', 'ground', 'steel'],
  ghost: ['ghost', 'dark'],
  dragon: ['ice', 'dragon', 'fairy'],
  dark: ['fighting', 'bug', 'fairy'],
  steel: ['fire', 'fighting', 'ground'],
  fairy: ['poison', 'steel'],
};

export function calculateWeakness(types: PokemonType[]): PokemonWeakness[] {
  // Store weaknesses as unique strings
  const weaknesses = new Set<string>();

  const typeList = types.map(type => type.type.name);

  typeList.forEach(type => {
    if (typeWeaknesses[type]) {
      typeWeaknesses[type].forEach(weak => weaknesses.add(weak));
    }
  });

  // Convert weaknesses Set into an array of PokemonWeakness objects
  return Array.from(weaknesses).map((weakness, index) => ({
    slot: index + 1,
    weakness: {
      name: weakness,
      url: `https://pokeapi.co/api/v2/type/${weakness}`,
    },
  }));
}
