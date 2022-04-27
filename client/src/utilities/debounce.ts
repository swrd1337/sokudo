import type { DependencyList, EffectCallback } from 'react';
import { useEffect } from 'react';

const useDebouncedEffect = (effect: EffectCallback, deps: DependencyList, delay: number) => {
  useEffect(() => {
    const handler = setTimeout(effect, delay);

    return () => clearTimeout(handler);
  }, [...deps, delay]);
};

export default useDebouncedEffect;
