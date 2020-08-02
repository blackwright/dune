type Clamp = [number, number];

type ClampRanges = {
  input: Clamp;
  output: Clamp;
};

export function clamp(value: number, [min, max]: Clamp): number {
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  return Math.min(Math.max(value, min), max);
}

export function clampNumberRange(
  value: number,
  { input, output }: ClampRanges
) {
  const mappedValue =
    ((value - input[0]) * (output[1] - output[0])) / (input[1] - input[0]) +
    output[0];

  return clamp(mappedValue, [output[0], output[1]]);
}
