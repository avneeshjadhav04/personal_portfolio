import { useContext } from 'react';
import { SmoothScrollContext } from '../components/SmoothScrollContext';

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}
