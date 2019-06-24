import { Sand } from './sand';

export class Wind {
  public numTextGrainsInPlace = 0;

  constructor(public canvasWidth: number, public sand: Sand[]) {}

  tick(now: number) {
    for (let i = this.sand.length - 1; i >= 0; i--) {
      const grain = this.sand[i];

      if (grain.position.x !== grain.destination.x) {
        grain.tick(now);

        // track how many grains have moved to their
        // destination in the rendered text so we can
        // know when to end the animation loop
        if (grain.position.x === grain.destination.x) {
          if (grain.destination.x === this.canvasWidth) {
            this.sand.splice(i, 1);
            continue;
          }

          this.numTextGrainsInPlace += 1;

          grain.lastTickDelta = now - grain.firstTickTimestamp!;
          grain.firstTickTimestamp = null;
        }
      }
    }
  }

  render(ctx: CanvasRenderingContext2D) {
    this.sand.forEach(grain => grain.render(ctx));
  }
}
