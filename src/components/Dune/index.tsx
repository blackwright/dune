import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Text } from './Text';

type Props = {
  text?: string;
};

export const Dune: React.FC<Props> = ({ text = '' }) => {
  const [textCanvas, setTextCanvas] = React.useState<HTMLCanvasElement | null>(
    null
  );

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 50] }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={2} />

        {textCanvas && (
          <React.Suspense fallback={null}>
            <Text canvas={textCanvas}>{text}</Text>
          </React.Suspense>
        )}
      </Canvas>
      <canvas ref={setTextCanvas} />
    </>
  );
};
