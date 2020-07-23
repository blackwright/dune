import { MathUtils } from 'three';

export function randomElement(array: any[]) {
  return array[MathUtils.randInt(0, array.length - 1)];
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
