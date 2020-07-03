import React from 'react';
import * as THREE from 'three';
import { useLoader, useUpdate, useFrame } from 'react-three-fiber';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';
import { TextLayout } from './textLayout';
import { vertexShader, fragmentShader } from './shader';

type Props = {
  canvas: HTMLCanvasElement;
  children: string;
};

export const Text: React.FC<Props> = ({ canvas, children }) => {
  const [textToRender, setTextToRender] = React.useState('');

  React.useEffect(() => {
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d')!;
    const textLayout = new TextLayout(ctx);
    setTextToRender(textLayout.generate(children));
  }, [canvas, children]);

  const font = useLoader(THREE.FontLoader, '/roboto_regular.json');

  const geometry = React.useMemo(() => {
    const textGeometry = new THREE.TextGeometry(textToRender, {
      size: 40,
      font,
    });

    textGeometry.computeVertexNormals();

    const modifier = new TessellateModifier(8);

    for (let i = 0; i < 6; i++) {
      modifier.modify(textGeometry);
    }

    return textGeometry;
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

  const meshRef = useUpdate<
    THREE.Mesh<THREE.TextGeometry, THREE.ShaderMaterial>
  >(
    (self) => {
      self.geometry.center();
    },
    [textToRender]
  );

  useFrame(() => {
    material.uniforms.uTime.value += 1.0;
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};
