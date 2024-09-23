export type PokedexTheme = 'blue' | 'red' | 'yellow' | 'green';
export type PokemonUri = {
  name: string;
  url: string;
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonWeakness = {
  slot: number;
  weakness: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export type PokemonType = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: PokemonType[];
  weaknesses: PokemonWeakness[];
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
  };
};
