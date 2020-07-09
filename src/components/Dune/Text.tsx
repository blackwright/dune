import React from 'react';
import * as THREE from 'three';
import { useThree, useLoader, useUpdate, useFrame } from 'react-three-fiber';
import { shader } from './shader';
import { generatePointsWithinBoundingBox } from './utils';

type Props = {
  children: string;
};

export const Text: React.FC<Props> = ({ children }) => {
  const { clock } = useThree();

  const font = useLoader(THREE.FontLoader, '/droid_sans_mono.json');

  const shapeGeometry = React.useMemo(() => {
    const shapes = font.generateShapes(children, 1.75);
    const geometry = new THREE.ShapeGeometry(shapes, 2);

    geometry.center();

    generatePointsWithinBoundingBox(geometry, 50 * children.length);

    return geometry;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const bufferGeometryRef = useUpdate<THREE.BufferGeometry>(
    (geometry) => {
      const { length: vertexCount } = shapeGeometry.vertices;

      const position = new Float32Array(vertexCount * 3);
      const color = new Float32Array(vertexCount);
      const visibleTime = new Float32Array(vertexCount);

      let minX = Number.MAX_SAFE_INTEGER;

      for (let i = 0; i < vertexCount; i += 3) {
        position[i] = shapeGeometry.vertices[i].x;
        position[i + 1] = shapeGeometry.vertices[i].y;
        position[i + 2] = shapeGeometry.vertices[i].z;

        minX = Math.min(minX, position[i]);

        color[i / 3] = THREE.MathUtils.randFloat(0.05, 0.1);
      }

      shapeGeometry.dispose();

      const xOffset = Math.abs(minX);

      for (let i = 0; i < vertexCount; i += 3) {
        visibleTime[i / 3] =
          (THREE.MathUtils.randFloat(-10.0, 10.0) + (position[i] + xOffset)) /
          40;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

      geometry.setAttribute(
        'visibleTime',
        new THREE.BufferAttribute(visibleTime, 1)
      );

      geometry.setAttribute('color', new THREE.BufferAttribute(color, 1));
    },
    [shapeGeometry]
  );

  const shaderMaterialRef = useUpdate<THREE.ShaderMaterial>(
    (material) => {
      material.uniforms.uTime.value = 0.0;
    },
    [shapeGeometry]
  );

  useFrame(() => {
    shaderMaterialRef.current!.uniforms.uTime.value += clock.getDelta() * 1000;
  });

  return (
    <points>
      <bufferGeometry ref={bufferGeometryRef} attach="geometry" />
      <shaderMaterial
        ref={shaderMaterialRef}
        attach="material"
        args={[shader]}
      />
    </points>
  );
};
