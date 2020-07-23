import React from 'react';
import { MathUtils } from 'three';
import { Canvas } from 'react-three-fiber';
import ImageData from './image-data';
import Text from './text';
import Wind from './wind';

type Props = {
  text?: string;
};

export const Dune: React.FC<Props> = ({ text = '' }) => {
  const [position, setPosition] = React.useState<Float32Array | null>(null);

  const handleImageData = React.useCallback((imageData: ImageData) => {
    // canvas image data is a one-dimensional array of RGBA values per pixel
    const pointCoords: number[] = [];

    let i = 0;

    while (i < imageData.data.length) {
      const alpha = imageData.data[i + 3];

      if (alpha > 0) {
        const x = ((i / 4) % imageData.width) - imageData.width / 2;
        const y = -((i / 4 - x) / imageData.width - imageData.height / 2);

        pointCoords.push(x, y, -10);
      }

      i += MathUtils.randInt(1, 7) * 4;
    }

    setPosition(Float32Array.from(pointCoords));
  }, []);

  return (
    <>
      <Canvas
        orthographic={true}
        camera={{ position: [0, 0, 0], far: 3000 }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      >
        <>
          {position && <Text position={position} />}
          <Wind level={0} />
        </>
      </Canvas>
      <ImageData onChange={handleImageData}>{text}</ImageData>
    </>
  );
};
