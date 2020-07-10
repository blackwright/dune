import React from 'react';
import * as THREE from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { incomingShader } from './shaders';
import { BufferAttributes } from './types';

type Props = {
  attributes: BufferAttributes;
};

const Incoming: React.FC<Props> = ({ attributes }) => {
  const clock = React.useRef(new THREE.Clock());

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

  useFrame(() => {
    material.current.uniforms.uTime.value += clock.current.getDelta();
  });

  return (
    <points>
      <bufferGeometry ref={geometry} attach="geometry" />
      <shaderMaterial
        ref={material}
        attach="material"
        args={[incomingShader]}
      />
    </points>
  );
};

export default Incoming;
