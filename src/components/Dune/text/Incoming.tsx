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

export const Incoming: React.FC<Props> = ({
  attributes,
  maxVisibleTime,
  onComplete,
}) => {
  const clockRef = React.useRef(new Clock());

  const hasCompletedRef = React.useRef(false);

  React.useEffect(() => {
    hasCompletedRef.current = false;
  }, [attributes]);

  const geometryRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      const [position, visibleTime, color] = attributes;

      geometry.setAttribute('position', position);
      geometry.setAttribute('visibleTime', visibleTime);
      geometry.setAttribute('color', color);
    },
    [attributes]
  );

  const materialRef = useUpdate<THREE.ShaderMaterial>(
    (material) => {
      material.uniforms.uTime.value = 0.0;
      clockRef.current.start();
    },
    [attributes]
  );

  const shader = React.useMemo(() => incomingShader(INCOMING_DELAY), []);

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += clockRef.current.getDelta();

      if (
        materialRef.current.uniforms.uTime.value >
          maxVisibleTime + INCOMING_DELAY &&
        !hasCompletedRef.current
      ) {
        hasCompletedRef.current = true;
        onComplete?.();
      }
    }
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef} attach="geometry" />
      <shaderMaterial ref={materialRef} attach="material" args={[shader]} />
    </points>
  );
};
