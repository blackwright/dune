export function modulo(number1: number, number2: number): number {
  return ((number1 % number2) + number2) % number2;
}

function isInteger(number: number) {
  return modulo(number, 1) === 0;
}

export function randomNumberBetween(
  min: number,
  max: number,
  decimalPrecision = 1
) {
  if (isInteger(min) && isInteger(max)) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  const randomFloat = min + Math.random() * (max - min + 1);
  return Number(randomFloat.toPrecision(decimalPrecision));
}


export function randomElement(array: any[]) {
  return array[randomNumberBetween(0, array.length - 1)];
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
