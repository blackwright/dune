import React from 'react';
import { Clock } from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { outgoingShader } from './shaders';
import type { BufferAttributes } from './types';

type Props = {
  attributes: BufferAttributes;
};

export const Outgoing: React.FC<Props> = ({ attributes }) => {
  const clockRef = React.useRef(new Clock());

  const geometryRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      const [position, visibleTime, color] = attributes;

      geometry.setAttribute('position', position);
      geometry.setAttribute('visible_time', visibleTime);
      geometry.setAttribute('color', color);
    },
    [attributes]
  );

  const materialRef = useUpdate<THREE.ShaderMaterial>(
    (material) => {
      material.uniforms.u_time.value = 0.0;
      clockRef.current.start();
    },
    [attributes]
  );

  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value += clockRef.current.getDelta();
    }
  });

  return (
    <points>
      <bufferGeometry ref={geometryRef} attach="geometry" />
      <shaderMaterial
        ref={materialRef}
        attach="material"
        args={[outgoingShader]}
      />
    </points>
  );
};
