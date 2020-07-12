import { WordType, getRandomWord } from './words';
import { structures } from './structures';
import { randomElement, capitalize } from './utils';

export default class Sentence {
  private value: string;

  constructor() {
    const randomStructure = randomElement(structures);
    this.value = this.build(randomStructure);
  }

  private build(structure: string) {
    const words = (Array.from(structure) as WordType[]).map((wordType) =>
      getRandomWord(wordType)
    );

    const sentence = words.join(' ').replace(' , ', ',');
    return capitalize(sentence) + '.';
  }

  toString() {
    return this.value;
  }
}
