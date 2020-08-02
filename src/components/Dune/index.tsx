import React, { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import { useWindowResize } from 'hooks/useWindowResize';
import { Text } from './text';
import { Wind } from './wind';

type Props = {
  position: Float32Array;
  isRendering: boolean;
  onComplete?: () => void;
};

export const Dune: React.FC<Props> = ({
  position,
  isRendering,
  onComplete,
}) => {
  const dimensions = useWindowResize();

  return (
    <Canvas
      concurrent={true}
      orthographic={true}
      camera={{ position: [0, 0, 1], far: 500 }}
      resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
      pixelRatio={window.devicePixelRatio}
    >
      <Text position={position} incomingDelay={2} onComplete={onComplete} />

      <Suspense fallback={null}>
        <Wind dimensions={dimensions} isRendering={isRendering} />
      </Suspense>
    </Canvas>
  );
};
