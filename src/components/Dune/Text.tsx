import React from 'react';
import * as THREE from 'three';
import { useLoader, useFrame } from 'react-three-fiber';
import { TextLayout } from './textLayout';
import { vertexShader, fragmentShader } from './shader';
import { generatePointsWithinBoundingBox } from './utils';

type Props = {
  canvas: HTMLCanvasElement;
  children: string;
};

export const Text: React.FC<Props> = ({ canvas, children }) => {
  const textLayout = React.useMemo(
    () => new TextLayout(canvas.getContext('2d')!),
    [canvas]
  );

  const [textToRender, setTextToRender] = React.useState(
    textLayout.generate(children)
  );

  React.useEffect(() => {
    setTextToRender(textLayout.generate(children));
  }, [children, textLayout]);

  const font = useLoader(THREE.FontLoader, '/droid_sans_mono.json');

  const geometry = React.useMemo(() => {
    const textGeometry = new THREE.TextGeometry(textToRender, {
      size: 2,
      curveSegments: 2,
      height: 0.1,
      bevelEnabled: false,
      font,
    });

    textGeometry.center();

    generatePointsWithinBoundingBox(textGeometry, 3000);

    textGeometry.computeVertexNormals();

    const bufferGeometry = new THREE.BufferGeometry();

    const { length: vertexCount } = textGeometry.vertices;

    const position = new Float32Array(vertexCount * 3);
    const xOffset = new Float32Array(vertexCount);
    const velocity = new Float32Array(vertexCount);

    for (let i = 0; i < vertexCount; i += 3) {
      position[i] = textGeometry.vertices[i].x;
      position[i + 1] = textGeometry.vertices[i].y;
      position[i + 2] = textGeometry.vertices[i].z;

      const isXPositive = Math.random() > 0.5;
      const xOffsetAmount = Math.random() * (isXPositive ? 200 : -200);
      xOffset[i / 3] = xOffsetAmount - 2000 - 100 * position[i];

      const randomVelocity = THREE.MathUtils.randFloat(0.5, 1.0);
      velocity[i / 3] = randomVelocity;
    }

    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(position, 3)
    );

    bufferGeometry.setAttribute(
      'xOffset',
      new THREE.BufferAttribute(xOffset, 1)
    );

    bufferGeometry.setAttribute(
      'velocity',
      new THREE.BufferAttribute(velocity, 1)
    );

    return bufferGeometry;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textToRender]);

  const material = React.useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textToRender]);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.getElapsedTime() * 500;
  });

  return <points geometry={geometry} material={material} />;
};
