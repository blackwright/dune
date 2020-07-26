import React from 'react';
import { Clock, Geometry, MathUtils, Vector3 } from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { shader } from './shader';
import { lerp } from './utils';

type Props = {
  isRendering: boolean;
};

const Wind: React.FC<Props> = ({ isRendering }) => {
  const clock = React.useRef(new Clock());

  const rotationDiff = React.useRef(0.01);

  const points = useUpdate<THREE.Points>((points) => {
    const geometry = new Geometry();

    const maxX = window.innerWidth / 2;
    const maxY = window.innerHeight / 2;

    for (let i = 0; i < 4_000; i++) {
      geometry.vertices.push(
        new Vector3(
          MathUtils.randInt(-maxX, maxX),
          MathUtils.randInt(-maxY, maxY),
          MathUtils.randInt(-maxX, maxX)
        )
      );
    }

    points.geometry = geometry;
  }, []);

  const material = useUpdate<THREE.ShaderMaterial>((material) => {
    material.uniforms.uTime.value = 0.0;
    clock.current.start();
  }, []);

  useFrame(() => {
    if (points.current) {
      const newRotationDiff = lerp(
        rotationDiff.current,
        isRendering ? 0.1 : 0.01,
        0.02
      );

      rotationDiff.current = newRotationDiff;

      points.current.rotation.y -= newRotationDiff;
    }

    if (material.current) {
      material.current.uniforms.uTime.value += clock.current.getDelta();
    }
  });

  return (
    <points ref={points}>
      <shaderMaterial ref={material} attach="material" args={[shader]} />
    </points>
  );
};

export default Wind;
