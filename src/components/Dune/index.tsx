import React from 'react';
import { Canvas } from 'react-three-fiber';
import TextLayout from './TextLayout';

type Props = {
  text?: string;
};

export const Dune: React.FC<Props> = ({ text = '' }) => {
  const [
    canvasElement,
    setCanvasElement,
  ] = React.useState<HTMLCanvasElement | null>(null);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 50] }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={2} />

        {canvasElement && (
          <TextLayout canvas={canvasElement}>{text}</TextLayout>
        )}
      </Canvas>
      <canvas ref={setCanvasElement} />
    </>
  );
};
