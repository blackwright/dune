export const SIDE_PADDING_RATIO = 0.05;

type LineOfText = {
  text: string;
  width: number;
};

const newLine: LineOfText = { text: '', width: 0 };

export class CanvasWriter {
  private canvasWidth: number;
  private canvasHeight: number;
  private lineHeight: number;
  private lines: LineOfText[] = [];
  public maxLineWidth = 0;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.lineHeight = ctx.measureText('M').width;
  }

  clear() {
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
          this.canvasWidth - this.canvasWidth * SIDE_PADDING_RATIO * 2
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

  private render() {
    const textHeight = this.lines.length * this.lineHeight;
    const verticalSpaceHeight =
      (this.lines.length - 1) * this.lineHeight * 1.25;
    const totalHeight = textHeight + verticalSpaceHeight;

    const x = this.canvasWidth * SIDE_PADDING_RATIO;
    let y = (this.canvasHeight - totalHeight) / 2;

    for (const line of this.lines) {
      this.ctx.fillText(line.text, x, y);
      y += verticalSpaceHeight / (this.lines.length - 1);
    }

    this.lines = [];
  }

  write(text: string) {
    this.layout(text);
    this.render();
  }

  getImageData() {
    return this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
  }
}
