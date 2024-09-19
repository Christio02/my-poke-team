export interface IndexedPokemon {
  name: string;
  url: string;
}
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IndexedPokemon[];
}

export const pokemonTypes: string[] = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy',
];

export interface ListPokemon {
  name: string;
  url: string;
  images: string;
  pokedexNumber: number;
  types: string[];
}

export interface PokemonTypeInfo {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
