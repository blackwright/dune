export const vertexShader = `
uniform float uTime;

void main() {
  gl_PointSize = 3.0;

  vec3 newPosition = vec3(position.x, position.y + sin(uTime), position.z);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;

export const fragmentShader = `
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
  vec2 cxy = 3.0 * gl_PointCoord - 1.5;

  float r = dot(cxy, cxy);

  if (r > 1.5) {
    discard;
  }

  float randColor = random(gl_PointCoord) * 0.1;

  gl_FragColor = vec4(vec3(randColor), 1.0);
}
`;

export const shader = {
  uniforms: {
    uTime: { value: 0.0 },
  },
  vertexShader,
  fragmentShader,
};
