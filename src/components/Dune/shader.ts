export const vertexShader = `
uniform float uTime;

varying vec3 vNormal;

void main() {
  vNormal = normal;
  vec3 newPosition = position;
  newPosition.x += sin(uTime) * 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`.trim();

export const fragmentShader = `
varying vec3 vNormal;

void main () {
  gl_FragColor = vec4(vNormal, 1.0);
}
`.trim();
