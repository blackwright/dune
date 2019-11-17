import { useEffect } from 'react';
import { debounced } from '../utils';

export function useDebouncedResize(
  fn: ({ width, height }: { width: number; height: number }) => void,
  deps: React.DependencyList
) {
  useEffect(() => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;
    const width = innerWidth * devicePixelRatio;
    const height = innerHeight * devicePixelRatio;

    fn({ width, height });

    const debouncedFn = debounced(() => fn({ width, height }));

    window.addEventListener('resize', debouncedFn);
    return () => window.removeEventListener('resize', debouncedFn);
  }, [fn, ...deps]);
}
