import { MathUtils } from 'three';
import Sentence from './sentence';

type Constructor = {
  min: number;
  max: number;
};
export default class Paragraph {
  private min: number;
  private max: number;
  private value = '';

  constructor({ min, max }: Constructor) {
    this.min = min;
    this.max = max;
  }

  build() {
    const sentenceCount = MathUtils.randInt(this.min, this.max);

    const sentences: string[] = [];

    for (let i = 0; i < sentenceCount; i++) {
      sentences.push(new Sentence().toString());
    }

    this.value = sentences.join(' ');
    return this;
  }

  toString() {
    return this.value;
  }
}
