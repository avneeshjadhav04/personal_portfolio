import { createContext } from 'react';

export interface SmoothScrollContextValue {
  scrollTo: (target: string | number | HTMLElement) => void;
}

export const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  scrollTo: () => {},
});
