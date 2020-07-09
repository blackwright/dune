type LineOfText = {
  text: string;
  width: number;
};

const newLine: LineOfText = { text: '', width: 0 };

const CANVAS_PADDING = 50;

export class LayoutGenerator {
  private canvasWidth: number;
  private canvasHeight: number;
  private lines: LineOfText[] = [];
  public maxLineWidth = 0;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
  }

  private layout(text: string) {
    this.lines = [];
    const words = text.split(/\s+/);
    const { width: spaceWidth } = this.ctx.measureText(' ');

    let line = { ...newLine };

    while (words.length) {
      const currentWord = words.shift()!;

      line.text += currentWord;
      line.width = this.ctx.measureText(line.text).width;

      const nextWord = words[0];

      if (nextWord == null) {
        this.maxLineWidth = Math.max(this.maxLineWidth, line.width);
        this.lines.push(line);
      }

      if (
        nextWord &&
        line.width + spaceWidth + this.ctx.measureText(nextWord).width >
          this.canvasWidth + CANVAS_PADDING
      ) {
        this.maxLineWidth = Math.max(this.maxLineWidth, line.width);
        this.lines.push(line);
        line = { ...newLine };
      } else {
        line.text += ' ';
        line.width += spaceWidth;
      }
    }
  }

  generate(text: string) {
    this.layout(text);
    this.clear();
    return this.lines.map((line) => line.text).join('\n');
  }
}
