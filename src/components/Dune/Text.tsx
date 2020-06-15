import React from 'react';
import * as THREE from 'three';
import { useLoader, useUpdate } from 'react-three-fiber';
import { TextLayout } from './textLayout';

type Props = {
  canvas: HTMLCanvasElement;
  children: string;
};

export const Text: React.FC<Props> = ({ canvas, children }) => {
  const [textToRender, setTextToRender] = React.useState('');

  const font = useLoader(THREE.FontLoader, '/roboto_regular.json');
  const shapes = font.generateShapes(textToRender, 20);

  const meshRef = useUpdate<
    THREE.Mesh<THREE.ShapeBufferGeometry, THREE.MeshNormalMaterial>
  >(
    (self) => {
      self.geometry.computeBoundingBox();
      const xMid =
        -0.5 *
        (self.geometry.boundingBox!.max.x - self.geometry.boundingBox!.min.x);
      const yMid =
        -0.5 *
        (self.geometry.boundingBox!.max.y - self.geometry.boundingBox!.min.y);
      self.geometry.translate(xMid, yMid, 0);
      self.position.z = -500;
    },
    [textToRender]
  );

  React.useEffect(() => {
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d')!;
    const textLayout = new TextLayout(ctx);
    setTextToRender(textLayout.generate(children));
  }, [canvas, children]);

  return (
    <mesh ref={meshRef}>
      <shapeBufferGeometry attach="geometry" args={[shapes]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  );
};
