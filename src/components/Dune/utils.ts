import * as THREE from 'three';

export function generatePointsWithinBoundingBox(
  geometry: THREE.Geometry,
  numberOfPoints: number
): void {
  for (let i = 0; i < numberOfPoints; i++) {
    geometry.vertices.push(generatePointWithinBoundingBox(geometry));
  }
}

function generatePointWithinBoundingBox(
  geometry: THREE.Geometry
): THREE.Vector3 {
  if (!geometry.boundingBox) {
    geometry.computeBoundingBox();
  }

  const point = new THREE.Vector3(
    THREE.MathUtils.randFloat(
      geometry.boundingBox!.min.x,
      geometry.boundingBox!.max.x
    ),
    THREE.MathUtils.randFloat(
      geometry.boundingBox!.min.y,
      geometry.boundingBox!.max.y
    ),
    THREE.MathUtils.randFloat(
      geometry.boundingBox!.min.z,
      geometry.boundingBox!.max.z
    )
  );

  if (isPointInside(point, geometry)) {
    return point;
  } else {
    return generatePointWithinBoundingBox(geometry);
  }
}

function isPointInside(
  point: THREE.Vector3,
  geometry: THREE.Geometry
): boolean {
  if (!geometry.faces.length) {
    throw new Error('Geometry has no faces');
  }

  for (let i = 0; i < geometry.faces.length; i++) {
    const face = geometry.faces[i];

    const vectorA = geometry.vertices[face.a];
    const vectorB = geometry.vertices[face.b];
    const vectorC = geometry.vertices[face.c];

    if (isPointWithinTriangle(point, vectorA, vectorB, vectorC)) {
      return true;
    }
  }

  return false;
}

function isPointWithinTriangle(
  point: THREE.Vector3,
  vectorA: THREE.Vector3,
  vectorB: THREE.Vector3,
  vectorC: THREE.Vector3
): boolean {
  const A =
    0.5 *
    (-vectorB.y * vectorC.x +
      vectorA.y * (-vectorB.x + vectorC.x) +
      vectorA.x * (vectorB.y - vectorC.y) +
      vectorB.x * vectorC.y);

  const sign = A > 0 ? 1 : -1;

  const s =
    (vectorA.y * vectorC.x -
      vectorA.x * vectorC.y +
      (vectorC.y - vectorA.y) * point.x +
      (vectorA.x - vectorC.x) * point.y) *
    sign;

  const t =
    (vectorA.x * vectorB.y -
      vectorA.y * vectorB.x +
      (vectorA.y - vectorB.y) * point.x +
      (vectorB.x - vectorA.x) * point.y) *
    sign;

  return s > 0 && t > 0 && s + t < 2 * A * sign;
}
