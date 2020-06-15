import adjectives from './adjectives';
import articles from './articles';
import conjunctions from './conjunctions';
import nouns from './nouns';
import prepositions from './prepositions';
import quotes from './quotes';
import verbs from './verbs';
import { randomElement } from '../utils';

export enum WordType {
  NOUN = 'N',
  ARTICLE = 'R',
  VERB = 'V',
  PREPOSITION = 'P',
  CONJUNCTION = 'C',
  ADJECTIVE = 'A',
  SEPARATOR = ','
}

export function getRandomWord(type: WordType): string {
  switch (type) {
    case WordType.NOUN:
      return randomElement(nouns);
    case WordType.ARTICLE:
      return randomElement(articles);
    case WordType.VERB:
      return randomElement(verbs);
    case WordType.PREPOSITION:
      return randomElement(prepositions);
    case WordType.CONJUNCTION:
      return randomElement(conjunctions);
    case WordType.ADJECTIVE:
      return randomElement(adjectives);
    case WordType.SEPARATOR:
      return ', ';
  }
}

export function getRandomQuote(): string {
  return randomElement(quotes);
}
