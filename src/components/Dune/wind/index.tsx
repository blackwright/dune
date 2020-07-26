import React from 'react';
import { Clock, Geometry, MathUtils, Vector3 } from 'three';
import { useUpdate, useFrame } from 'react-three-fiber';
import { shader } from './shader';
import { lerp } from './utils';

type Props = {
  isRendering: boolean;
};

const Wind: React.FC<Props> = ({ isRendering }) => {
  const clockRef = React.useRef(new Clock());

  const rotationDiffRef = React.useRef(0.01);

  const pointsRef = useUpdate<THREE.Points>((points) => {
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

  const materialRef = useUpdate<THREE.ShaderMaterial>((material) => {
    material.uniforms.uTime.value = 0.0;
    clockRef.current.start();
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const newRotationDiff = lerp(
        rotationDiffRef.current,
        isRendering ? 0.1 : 0.01,
        0.02
      );

      rotationDiffRef.current = newRotationDiff;

      pointsRef.current.rotation.y -= newRotationDiff;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += clockRef.current.getDelta();
    }
  });

  return (
    <points ref={pointsRef}>
      <shaderMaterial ref={materialRef} attach="material" args={[shader]} />
    </points>
  );
};

export default Wind;
