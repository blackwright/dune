import React from 'react';
import * as THREE from 'three';
import { useLoader, useFrame, useThree } from 'react-three-fiber';
import { TextLayout } from './textLayout';
import { vertexShader, fragmentShader } from './shader';
import { generatePointsWithinBoundingBox } from './utils';

type Props = {
  canvas: HTMLCanvasElement;
  children: string;
};

export const Text: React.FC<Props> = ({ canvas, children }) => {
  const { clock } = useThree();

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
    const shapes = font.generateShapes(textToRender, 2.5);

    const shapeGeometry = new THREE.ShapeGeometry(shapes, 2);

    shapeGeometry.center();

    generatePointsWithinBoundingBox(shapeGeometry, 50 * children.length);

    const bufferGeometry = new THREE.BufferGeometry();

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

    const xOffset = Math.abs(minX);

    for (let i = 0; i < vertexCount; i += 3) {
      visibleTime[i / 3] =
        (THREE.MathUtils.randFloat(-10.0, 10.0) + (position[i] + xOffset)) / 12;
    }

    bufferGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(position, 3)
    );

    bufferGeometry.setAttribute(
      'visibleTime',
      new THREE.BufferAttribute(visibleTime, 1)
    );

    bufferGeometry.setAttribute('color', new THREE.BufferAttribute(color, 1));

    return bufferGeometry;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const material = React.useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uExitTimestamp: { value: 0.0 },
      },
      vertexShader,
      fragmentShader,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    clock.start();
  }, []);

  useFrame(() => {
    material.uniforms.uTime.value = clock.getElapsedTime();
  });

  React.useEffect(() => {
    window.setTimeout(() => {
      material.uniforms.uExitTimestamp.value = clock.getElapsedTime();
    }, 3000);
  });

  return <points geometry={geometry} material={material} />;
};
