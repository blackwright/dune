import { useEffect } from 'react';
import { debounced } from '../utils';

export function useDebouncedResize(
  fn: React.EffectCallback,
  deps: React.DependencyList
) {
  useEffect(() => {
    fn();

    const debouncedFn = debounced(fn);

    window.addEventListener('resize', debouncedFn);
    return () => window.removeEventListener('resize', debouncedFn);
  }, [fn, ...deps]);
}
