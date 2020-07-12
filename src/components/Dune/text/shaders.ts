const incomingVertexShader = `
uniform float uTime;

attribute float visibleTime;

varying float vVisibleDiff;

void main() {
  vVisibleDiff = uTime - visibleTime - 2.0;

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

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  if (vVisibleDiff < 0.0) {
    discard;
  }

  vec2 cxy = 2.0 * gl_PointCoord - 1.0;

  float r = dot(cxy, cxy);

  if (r > 1.0) {
    discard;
  }

  float randColor = random(gl_PointCoord) * 0.1;

  gl_FragColor = vec4(vec3(randColor), 1.0);
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
