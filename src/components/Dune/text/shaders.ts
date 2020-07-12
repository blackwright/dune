const incomingVertexShader = `
uniform float uTime;

attribute float visibleTime;

varying float vVisibleDiff;

void main() {
  vVisibleDiff = uTime - visibleTime;

  gl_PointSize = 1.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const outgoingVertexShader = `
uniform float uTime;

attribute float visibleTime;

varying float vVisibleDiff;

void main () {
  vVisibleDiff = visibleTime - uTime;

  gl_PointSize = 1.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying float vVisibleDiff;

void main() {
  if (vVisibleDiff < 0.0) {
    discard;
  }

  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);

  if (r > 1.0) {
    discard;
  }

  gl_FragColor = vec4(0.15, 0.15, 0.15, 1.0);
}
`;

export const incomingShader = {
  uniforms: {
    uTime: { value: 0.0 },
  },
  vertexShader: incomingVertexShader,
  fragmentShader,
};

export const outgoingShader = {
  uniforms: {
    uTime: { value: 0.0 },
  },
  vertexShader: outgoingVertexShader,
  fragmentShader,
};
