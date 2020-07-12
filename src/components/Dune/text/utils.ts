import * as THREE from 'three';
import type { BufferAttributes } from './types';

export function createBufferAttributes(
  position: Float32Array
): BufferAttributes {
  const vertexCount = position.length / 3;

  const color = new Float32Array(vertexCount);
  const visibleTime = new Float32Array(vertexCount);

  const minX = position[0];

  const xOffset = Math.abs(minX);

  for (let i = 0; i < vertexCount; i++) {
    visibleTime[i] =
      (THREE.MathUtils.randFloat(-200.0, 200.0) + (position[i * 3] + xOffset)) /
      500;
  }

  return [
    new THREE.BufferAttribute(position, 3),
    new THREE.BufferAttribute(visibleTime, 1),
    new THREE.BufferAttribute(color, 1),
  ];
}
