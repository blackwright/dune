type Dimensions = {
  width: number;
  height: number;
};

export function getParticleCount({ width, height }: Dimensions): number {
  return (width * height) / 1000;
}

export function lerp(value1: number, value2: number, t: number) {
  return value1 * (1 - t) + value2 * t;
}
