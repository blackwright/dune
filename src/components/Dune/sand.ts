import { Coords } from './types';
import { randomNumberBetween } from '../../utils';

export const MAX_DELAY = 500;
export const TIME_TO_CROSS = 1000;

export class Sand {
  public position: Coords;
  public originY: number;
  public firstTickTimestamp: number | null = null;
  public lastTickDelta = 0;

  private size: number;

  constructor(
    private canvasWidth: number,
    public destination: Coords,
    private delay = randomNumberBetween(0, MAX_DELAY)
  ) {
    this.originY = destination.y;
    this.position = { x: -10, y: destination.y };
    this.size = randomNumberBetween(1, 2);
  }

  tick(now: number) {
    if (this.firstTickTimestamp == null) {
      this.firstTickTimestamp = this.lastTickDelta
        ? now + this.lastTickDelta
        : now;
      this.lastTickDelta = 0;
    }

    let nextXPosition =
      ((now - this.firstTickTimestamp - this.delay + this.lastTickDelta) /
        TIME_TO_CROSS) *
      this.canvasWidth;

    if (nextXPosition < this.position.x) {
      return;
    } else if (nextXPosition > this.destination.x) {
      nextXPosition = this.destination.x;
    }

    this.position.x = nextXPosition;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }
}
