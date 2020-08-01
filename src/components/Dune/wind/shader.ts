export const vertexShader = `
uniform float u_time;

varying float v_position_z;

void main() {
  v_position_z = position.z;
  
  gl_PointSize = 6.0;

  vec3 newPosition = vec3(position.x, position.y + sin(u_time), position.z);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const fragmentShader = `
varying float v_position_z;

void main() {
  vec2 cxy = 6.0 * gl_PointCoord - 3.0;

  float r = dot(cxy, cxy);

  if (r > 3.0) {
    discard;
  }

  gl_FragColor = vec4(0.9, 0.3, 0.0, fract(sin(v_position_z)));
}
`;

export const shader = {
  uniforms: {
    u_time: { value: 0.0 },
  },
  vertexShader,
  fragmentShader,
};
