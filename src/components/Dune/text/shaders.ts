const incomingVertexShader = `
uniform float uTime;
uniform float uDelay;

attribute float visibleTime;

varying float vVisibleDiff;

void main() {
  vVisibleDiff = uTime - visibleTime - uDelay;

  gl_PointSize = 2.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const outgoingVertexShader = `
uniform float uTime;

attribute float visibleTime;

varying float vVisibleDiff;

void main () {
  vVisibleDiff = visibleTime - uTime;

  gl_PointSize = 2.0;
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

  float randColor = random(gl_PointCoord) * 0.3;

  gl_FragColor = vec4(vec3(randColor), 1.0);
}
`;

export const incomingShader = (uDelay: number) => {
  return {
    uniforms: {
      uTime: { value: 0.0 },
      uDelay: { value: uDelay },
    },
    vertexShader: incomingVertexShader,
    fragmentShader,
  };
};

export const outgoingShader = {
  uniforms: {
    uTime: { value: 0.0 },
  },
  vertexShader: outgoingVertexShader,
  fragmentShader,
};
