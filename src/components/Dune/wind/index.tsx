import React from 'react';
import { TextureLoader, Geometry, MathUtils, Vector3, Color } from 'three';
import { useLoader, useUpdate, useFrame } from 'react-three-fiber';
import dust from './dust.png';
import { getParticleCount, lerp } from './utils';

type Props = {
  dimensions: {
    width: number;
    height: number;
  };
  isRendering: boolean;
};

export const Wind: React.FC<Props> = ({ dimensions, isRendering }) => {
  const sprite = useLoader(TextureLoader, dust);

  const rotationDiffRef = React.useRef(0.1);

  const { starColor, spiceColor } = React.useMemo(
    () => ({
      starColor: new Color(0xdddddd),
      spiceColor: new Color(0xff796f),
    }),
    []
  );

  const pointsRef = useUpdate<THREE.Points>((points) => {
    const geometry = new Geometry();

    const maxX = dimensions.width / 2;
    const maxY = dimensions.height / 2;

    const particleCount = getParticleCount(dimensions);

    for (let i = 0; i < particleCount; i++) {
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

  const materialRef = useUpdate<THREE.PointsMaterial>((material) => {
    material.color = starColor.clone();
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      const newRotationDiff = lerp(
        rotationDiffRef.current,
        isRendering ? 1.0 : 0.1,
        isRendering ? 0.1 : 0.05
      );

      rotationDiffRef.current = newRotationDiff;

      pointsRef.current.rotation.y -= newRotationDiff / 12;

      materialRef.current.color.lerp(
        isRendering ? spiceColor : starColor,
        isRendering ? 0.1 : 0.05
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <pointsMaterial
        ref={materialRef}
        attach="material"
        args={[
          {
            size: 2,
            map: sprite,
          },
        ]}
      />
    </points>
  );
};
