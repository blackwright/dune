import React from 'react';
import { Clock, Geometry, MathUtils, Vector3 } from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { shader } from './shader';

type Props = {
  level: 0 | 1;
};

const Wind: React.FC<Props> = ({ level }) => {
  const clock = React.useRef(new Clock());

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
      points.current.rotation.y -= 0.01;
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
