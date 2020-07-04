export const vertexShader = `
uniform float uTime;

attribute float xOffset;
attribute float velocity;

varying vec3 vNormal;

void main() {
  vec3 newPosition = position;
  newPosition.x = min(uTime * velocity + xOffset, position.x);

  vNormal = normal;

  gl_PointSize = 3.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`.trim();

export const fragmentShader = `
varying vec3 vNormal;

void main () {
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);

  if (r > 1.0) {
    discard;
  }

  gl_FragColor = vec4(vNormal, 1.0);
}
`.trim();
