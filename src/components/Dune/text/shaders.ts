const incomingVertexShader = `
uniform float u_time;
uniform float u_delay;

attribute float visible_time;

varying float v_visible_diff;

void main() {
  v_visible_diff = u_time - visible_time - u_delay;

  gl_PointSize = 4.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const outgoingVertexShader = `
uniform float u_time;

attribute float visible_time;

varying float v_visible_diff;

void main () {
  v_visible_diff = visible_time - u_time;

  gl_PointSize = 4.0;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying float v_visible_diff;

void main() {
  if (v_visible_diff < 0.0) {
    discard;
  }

  vec2 cxy = 4.0 * gl_PointCoord - 2.0;

  float r = dot(cxy, cxy);

  if (r > 2.0) {
    discard;
  }

  gl_FragColor = vec4(0.9, 0.3, 0.0, 1.0);
}
`;

export const incomingShader = (uDelay: number) => {
  return {
    uniforms: {
      u_time: { value: 0.0 },
      u_delay: { value: uDelay },
    },
    vertexShader: incomingVertexShader,
    fragmentShader,
  };
};

export const outgoingShader = {
  uniforms: {
    u_time: { value: 0.0 },
  },
  vertexShader: outgoingVertexShader,
  fragmentShader,
};
