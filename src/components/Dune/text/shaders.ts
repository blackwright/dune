const incomingVertexShader = `
uniform float uTime;

attribute float visibleTime;
attribute float color;

varying float vVisibleDiff;
varying float vColor;

void main() {
  vColor = color;
  vVisibleDiff = uTime - visibleTime;

  gl_PointSize = 3.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const outgoingVertexShader = `
uniform float uTime;

attribute float visibleTime;
attribute float color;

varying float vVisibleDiff;
varying float vColor;

void main () {
  vColor = color;
  vVisibleDiff = visibleTime - uTime;

  gl_PointSize = 3.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying float vVisibleDiff;
varying float vColor;

void main() {
  if (vVisibleDiff < 0.0) {
    discard;
  }

  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  float r = dot(cxy, cxy);

  if (r > 1.0) {
    discard;
  }

  gl_FragColor = vec4(vColor, vColor, vColor, 1.0);
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
