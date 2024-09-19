import { useContext } from 'react';
import { PokemonContext } from './PokemonContext.tsx';

export const usePokemonContext = () => {
  return useContext(PokemonContext);
};
