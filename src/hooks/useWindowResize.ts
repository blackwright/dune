import React from 'react';

export type Dimensions = {
  width: number;
  height: number;
};

export function useWindowResize() {
  const timeoutIdRef = React.useRef<number>();

  const [dimensions, setDimensions] = React.useState<Dimensions | undefined>();

  React.useEffect(() => {
    const handleResize = () => {
      window.clearTimeout(timeoutIdRef.current);

      timeoutIdRef.current = window.setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 1_000);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.clearTimeout(timeoutIdRef.current);

      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return dimensions;
}
