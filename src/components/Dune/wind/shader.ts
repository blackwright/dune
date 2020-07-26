export const vertexShader = `
uniform float uTime;

varying float vPositionZ;

void main() {
  vPositionZ = position.z;
  
  gl_PointSize = 3.0;

  vec3 newPosition = vec3(position.x, position.y + sin(uTime), position.z);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const fragmentShader = `
varying float vPositionZ;

void main() {
  vec2 cxy = 3.0 * gl_PointCoord - 1.5;

  float r = dot(cxy, cxy);

  if (r > 1.5) {
    discard;
  }

  gl_FragColor = vec4(0.9, 0.3, 0.0, fract(sin(vPositionZ)));
}
`;

export const shader = {
  uniforms: {
    uTime: { value: 0.0 },
  },
  vertexShader,
  fragmentShader,
};
