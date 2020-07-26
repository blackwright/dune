import { MathUtils } from 'three';

export function removeRandomVertices(geometry: THREE.Geometry, count: number) {
  count = Math.min(count, geometry.vertices.length);

  for (let i = 0; i < count; i++) {
    geometry.vertices.splice(
      MathUtils.randInt(0, geometry.vertices.length - 1),
      1
    );
  }
}

export function getVisibleHeight(
  camera: THREE.PerspectiveCamera,
  depth: number
) {
  const { z } = camera.position;
  depth += z;

  const verticalFovRadians = (camera.fov * Math.PI) / 180;

  return Math.tan(verticalFovRadians / 2) * depth * 2;
}

export function lerp(value1: number, value2: number, t: number) {
  return value1 * (1 - t) + value2 * t;
}
