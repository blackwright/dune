import { Sand } from './sand';

export class Wind {
  public isBlowing = true;
  private numDone = 0;

  constructor(public canvasWidth: number, public sand: Sand[]) {}

  tick(now: number) {
    for (const grain of this.sand) {
      if (grain.position.x !== grain.destination.x) {
        grain.tick(now);
        if (grain.position.x === grain.destination.x) {
          this.numDone += 1;
        }
      }
    }

    if (this.numDone === this.sand.length) {
      this.isBlowing = false;
    }
  }

  clear() {
    this.sand = this.sand.filter(
      grain => grain.position.x !== this.canvasWidth
    );
  }

  reset() {
    this.isBlowing = true;
    this.numDone = 0;
  }
}
