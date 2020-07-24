import React from 'react';
import { MathUtils } from 'three';
import { Canvas } from 'react-three-fiber';
import ImageData from './image-data';
import Text from './text';
import Wind from './wind';

type Props = {
  text?: string;
  onComplete?: () => void;
};

const Dune: React.FC<Props> = ({ text = '', onComplete }) => {
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

        pointCoords.push(x, y, -1);
      }

      i += MathUtils.randInt(1, 12) * 4;
    }

    setPosition(Float32Array.from(pointCoords));
  }, []);

  return (
    <>
      <Canvas
        concurrent={true}
        orthographic={true}
        camera={{ position: [0, 0, 0], far: 500 }}
        resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      >
        <>
          {position && <Text position={position} onComplete={onComplete} />}
          <Wind level={0} />
        </>
      </Canvas>
      <ImageData onChange={handleImageData}>{text}</ImageData>
    </>
  );
};

export default Dune;
