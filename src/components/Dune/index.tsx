import React from 'react';
import { Canvas } from 'react-three-fiber';
import Layout from './layout/Layout';
import Text from './text';

type Props = {
  text?: string;
};

export const Dune: React.FC<Props> = ({ text = '' }) => {
  const [position, setPosition] = React.useState<Float32Array | null>(null);

  const handleImageData = React.useCallback((imageData: ImageData) => {
    // canvas image data is a one-dimensional array of RGBA values per pixel
    const pointCoords: number[] = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const alpha = imageData.data[i + 3];

      if (alpha > 0) {
        const x = ((i / 4) % imageData.width) - imageData.width / 2;
        const y = -((i / 4 - x) / imageData.width - imageData.height / 2);

        pointCoords.push(x, y, 0);
      }
    }

    setPosition(Float32Array.from(pointCoords));
  }, []);

  return (
    <>
      <Canvas
        camera={{ position: [0, 0, 1000] }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      >
        {position && <Text position={position} />}
      </Canvas>
      <Layout onImageData={handleImageData}>{text}</Layout>
    </>
  );
};
