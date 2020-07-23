import { MathUtils, BufferAttribute } from 'three';
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
      (MathUtils.randFloat(-200.0, 200.0) + (position[i * 3] + xOffset)) / 500;
  }

  return [
    new BufferAttribute(position, 3),
    new BufferAttribute(visibleTime, 1),
    new BufferAttribute(color, 1),
  ];
}
