import { Coords } from './types';
import { randomNumberBetween } from '../../utils';

const MAX_DELAY = 5000;
const TIME_TO_CROSS = 1000;

export class Sand {
  public position: Coords;
  public originY: number;
  public delay: number;
  private firstTickTime?: number;

  constructor(private canvasWidth: number, public destination: Coords) {
    this.originY = destination.y;
    this.position = { x: 0, y: destination.y };

    this.delay = randomNumberBetween(0, MAX_DELAY);
  }

  tick(now: number) {
    if (this.firstTickTime == null) {
      this.firstTickTime = now;
    }

    let nextXPosition =
      ((now - this.firstTickTime - this.delay) / TIME_TO_CROSS) *
      this.canvasWidth;

    if (nextXPosition < 0) {
      nextXPosition = 0;
    } else if (nextXPosition > this.destination.x) {
      nextXPosition = this.destination.x;
    }

    this.position.x = nextXPosition;
  }
}
