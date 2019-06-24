import { Sand } from './sand';

export class Wind {
  public numTextGrainsInPlace = 0;

  constructor(
    public canvasWidth: number,
    public textSand: Sand[],
    public backgroundSand: Sand[]
  ) {}

  tick(now: number) {
    for (let i = 0; i < this.textSand.length; i++) {
      const grain = this.textSand[i];

      if (grain.position.x !== grain.destination.x) {
        grain.tick(now);

        // track how many grains have moved to their
        // destination in the rendered text so we can
        // know when to end the animation loop
        if (grain.position.x === grain.destination.x) {
          this.numTextGrainsInPlace += 1;

          grain.lastTickDelta = now - grain.firstTickTimestamp!;
          grain.firstTickTimestamp = null;
        }
      }
    }

    for (let i = this.backgroundSand.length - 1; i >= 0; i--) {
      const grain = this.backgroundSand[i];
      grain.tick(now);

      if (grain.position.x === this.canvasWidth) {
        this.backgroundSand.splice(i, 1);
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.textSand.forEach(grain => grain.render(ctx));
    this.backgroundSand.forEach(grain => grain.render(ctx));
  }
}
