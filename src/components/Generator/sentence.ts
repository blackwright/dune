import { randomElement, capitalize } from '../../utils';
import { WordType, getRandomWord } from './words';

const STRUCTURES = [
  'NVCN',
  'NVRAN',
  'NVRANCNVAN',
  'RNVPN',
  'RNVRAN,CNCN',
  'PRANVRANCRANCVN',
  'CRNVNPRN',
  'RNPNVRN,PRNVN',
  'PNCN,PNCRN',
  'RNVCNV',
  'RNV,RNV',
  'NVPRANPRNVA',
  'RNVPN,PNCNVA',
  'NVRN,CNVRNV',
  'NVAPN',
  'PNNVPN,CV',
  'RNV, RNVRAN',
  'NVRAN,NVAN',
  'CNVRN,PNNV',
  'NVRNVRAN',
  'NPN,NPAN,NPANV',
  'ANVPNCNV',
  'ANVPN',
  'CNCNPRAN'
];

export default class Sentence {
  private value: string;

  constructor() {
    const randomStructure = randomElement(STRUCTURES);
    this.value = this.build(randomStructure);
  }

  private build(structure: string) {
    const words = (Array.from(structure) as WordType[]).map(wordType =>
      getRandomWord(wordType)
    );

    const sentence = words.join(' ').replace(' , ', ',');
    return capitalize(sentence) + '.';
  }

  toString() {
    return this.value;
  }
}
