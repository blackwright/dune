import { NumberOfParagraphs } from 'types';

export function getParticleGap(
  paragraphs: NumberOfParagraphs,
  area: number
): number {
  return gap(area) * paragraphFactor(paragraphs);
}

function gap(area: number): number {
  if (area > 3_000_000) {
    return 20;
  }

  if (area > 1_000_000) {
    return 16;
  }

  return 5;
}

function paragraphFactor(paragraphs: NumberOfParagraphs): number {
  switch (paragraphs) {
    case 1:
      return 1;
    case 2:
      return 0.8;
    case 3:
      return 0.6;
    case 4:
      return 0.4;
  }
}
