import React from 'react';
import { Clock } from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { incomingShader } from './shaders';
import type { BufferAttributes } from './types';

const INCOMING_DELAY = 2.0;

type Props = {
  attributes: BufferAttributes;
  maxVisibleTime: number;
  onComplete?: () => void;
};

const Incoming: React.FC<Props> = ({
  attributes,
  maxVisibleTime,
  onComplete,
}) => {
  const clock = React.useRef(new Clock());

  const hasCompleted = React.useRef(false);

  React.useEffect(() => {
    hasCompleted.current = false;
  }, [attributes]);

  const geometry = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      const [position, visibleTime, color] = attributes;

      geometry.setAttribute('position', position);
      geometry.setAttribute('visibleTime', visibleTime);
      geometry.setAttribute('color', color);
    },
    [attributes]
  );

  const material = useUpdate<THREE.ShaderMaterial>(
    (material) => {
      material.uniforms.uTime.value = 0.0;
      clock.current.start();
    },
    [attributes]
  );

  const shader = React.useMemo(() => incomingShader(INCOMING_DELAY), []);

  useFrame(() => {
    if (material.current) {
      material.current.uniforms.uTime.value += clock.current.getDelta();

      if (
        material.current.uniforms.uTime.value >
          maxVisibleTime + INCOMING_DELAY &&
        !hasCompleted.current
      ) {
        hasCompleted.current = true;
        onComplete?.();
      }
    }
  });

  return (
    <points>
      <bufferGeometry ref={geometry} attach="geometry" />
      <shaderMaterial ref={material} attach="material" args={[shader]} />
    </points>
  );
};

export default Incoming;
