import { createContext, useContext } from 'react';
import { FlexGap } from './types';

export const GapContext = createContext<FlexGap>(0);

export function useGap() {
  return useContext(GapContext);
}
