/**
 * This is an ES6 class version of https://github.com/namniak/canvas-text-wrapper
 * Fixes an issue where the canvas element gets initialized repeatedly
 */

type Options = {
  font: string;
  sizeToFill?: boolean;
  maxFontSizeToFill: number | undefined;
  lineHeight?: number;
  allowNewLine?: boolean;
  lineBreak?: string;
  textAlign?: CanvasTextAlign;
  verticalAlign?: string;
  paddingX?: number;
  paddingY?: number;
};

const defaultOptions: Required<Options> = {
  font: '18px Arial, sans-serif',
  sizeToFill: false,
  maxFontSizeToFill: undefined,
  lineHeight: 1,
  allowNewLine: true,
  lineBreak: 'auto',
  textAlign: 'left',
  verticalAlign: 'top',
  paddingX: 0,
  paddingY: 0,
};

export class Writer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: Required<Options>;

  constructor(canvas: HTMLCanvasElement, options: Options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.options = { ...defaultOptions, ...options };

    this.ctx.font = this.options.font;
    this.ctx.textBaseline = 'bottom';

    let scale = 1;

    const { devicePixelRatio } = window;

    if (devicePixelRatio > 1) {
      const tempCtx: any = {};

      (Object.keys(this.ctx) as Array<keyof CanvasRenderingContext2D>).forEach(
        (key) => {
          tempCtx[key] = this.ctx[key];
        }
      );

      const { width, height } = this.canvas;

      scale = devicePixelRatio;

      this.canvas.width = width * scale;
      this.canvas.height = height * scale;
      this.canvas.style.width = `${(width * scale) / 2}px`;
      this.canvas.style.height = `${(height * scale) / 2}px`;

      (Object.keys(tempCtx) as Array<keyof CanvasRenderingContext2D>).forEach(
        (key) => {
          try {
            (this.ctx as any)[key] = tempCtx[key];
          } catch (e) {}
        }
      );

      this.ctx.scale(scale, scale);
    }
  }

  write(text: string) {
    const EL_WIDTH = this.canvas.width;
    const EL_HEIGHT = this.canvas.height;

    const MAX_TEXT_WIDTH = EL_WIDTH - this.options.paddingX * 2;
    const MAX_TEXT_HEIGHT = EL_HEIGHT - this.options.paddingY * 2;

    const multiNewLineDelimiter = '\u200B';
    const fontSize = this.options.font.match(/\d+(px|em|%)/g)
      ? +(this.options.font.match(/\d+(px|em|%)/g) as any)[0].match(/\d+/g)
      : 18;
    const newLineIndexes: number[] = [];
    const textPos = { x: 0, y: 0 };

    let lines: string[] = [];
    let textBlockHeight = 0;
    let lineHeight = 0;
    let fontParts: string[];

    const handleMultipleNewline = (text: string) => {
      do {
        text = text.replace(/\n\n/g, '\n' + multiNewLineDelimiter + '\n');
      } while (text.indexOf('\n\n') > -1);
      return text;
    };

    const setFont = (fontSize: number) => {
      if (!fontParts) {
        fontParts = this.options.sizeToFill
          ? this.ctx.font.split(/\b\d+px\b/i)
          : this.options.font.split(/\b\d+px\b/i);
      }

      this.ctx.font = fontParts[0] + fontSize + 'px' + fontParts[1];
    };

    const setLineHeight = () => {
      if (!isNaN(this.options.lineHeight)) {
        lineHeight = fontSize * this.options.lineHeight;
      } else if (this.options.lineHeight.toString().indexOf('px') !== -1) {
        lineHeight = parseInt(`${this.options.lineHeight}`);
      } else if (this.options.lineHeight.toString().indexOf('%') !== -1) {
        lineHeight = (parseInt(`${this.options.lineHeight}`) / 100) * fontSize;
      }
    };

    const setHorizAlign = () => {
      this.ctx.textAlign = this.options.textAlign;

      if (this.options.textAlign === 'center') {
        textPos.x = EL_WIDTH / 2;
      } else if (this.options.textAlign === 'right') {
        textPos.x = EL_WIDTH - this.options.paddingX;
      } else {
        textPos.x = this.options.paddingX;
      }
    };

    const setVertAlign = () => {
      if (this.options.verticalAlign === 'middle') {
        textPos.y = (EL_HEIGHT - textBlockHeight) / 2;
      } else if (this.options.verticalAlign === 'bottom') {
        textPos.y = EL_HEIGHT - textBlockHeight - this.options.paddingY;
      } else {
        textPos.y = this.options.paddingY;
      }
    };

    const drawText = () => {
      const skipLineOnMatch = multiNewLineDelimiter + ' ';

      for (var i = 0; i < lines.length; i++) {
        textPos.y = parseInt(`${textPos.y}`) + lineHeight;

        if (lines[i] !== skipLineOnMatch) {
          this.ctx.fillText(lines[i], textPos.x, textPos.y);
        }
      }
    };

    const checkLength = (words: string[]) => {
      var testString, tokenLen, sliced, leftover;

      words.forEach((word, index) => {
        testString = '';
        tokenLen = this.ctx.measureText(word).width;

        if (tokenLen > MAX_TEXT_WIDTH) {
          for (
            var k = 0;
            this.ctx.measureText(testString + word[k]).width <=
              MAX_TEXT_WIDTH && k < word.length;
            k++
          ) {
            testString += word[k];
          }

          sliced = word.slice(0, k);
          leftover = word.slice(k);
          words.splice(index, 1, sliced, leftover);
        }
      });
    };

    const breakText = (words: string[]) => {
      lines = [];
      for (var i = 0, j = 0; i < words.length; j++) {
        lines[j] = '';

        if (this.options.lineBreak === 'auto') {
          if (
            this.ctx.measureText(lines[j] + words[i]).width > MAX_TEXT_WIDTH
          ) {
            break;
          } else {
            while (
              this.ctx.measureText(lines[j] + words[i]).width <=
                MAX_TEXT_WIDTH &&
              i < words.length
            ) {
              lines[j] += words[i] + ' ';
              i++;

              if (this.options.allowNewLine) {
                for (var k = 0; k < newLineIndexes.length; k++) {
                  if (newLineIndexes[k] === i) {
                    j++;
                    lines[j] = '';
                    break;
                  }
                }
              }
            }
          }
          lines[j] = lines[j].trim();
        } else {
          lines[j] = words[i];
          i++;
        }
      }
    };

    const wrap = () => {
      if (this.options.allowNewLine) {
        var newLines = text.trim().split('\n');
        for (var i = 0, idx = 0; i < newLines.length - 1; i++) {
          idx += newLines[i].trim().split(/\s+/).length;
          newLineIndexes.push(idx);
        }
      }

      var words = text.trim().split(/\s+/);
      checkLength(words);
      breakText(words);

      textBlockHeight = lines.length * lineHeight;
    };

    const adjustFontSize = (size: number) => {
      setFont(size);
      lineHeight = size;
      wrap();
    };

    const render = () => {
      if (this.options.sizeToFill) {
        let wordsCount = text.trim().split(/\s+/).length;
        let newFontSize = 0;

        do {
          if (!!this.options.maxFontSizeToFill) {
            if (++newFontSize <= this.options.maxFontSizeToFill) {
              adjustFontSize(newFontSize);
            } else {
              break;
            }
          } else {
            adjustFontSize(++newFontSize);
          }
        } while (
          textBlockHeight < MAX_TEXT_HEIGHT &&
          lines.join(' ').split(/\s+/).length === wordsCount
        );

        adjustFontSize(--newFontSize);
      } else {
        wrap();
      }

      setVertAlign();
      setHorizAlign();
      drawText();
    };

    text = handleMultipleNewline(text);
    setFont(fontSize);
    setLineHeight();
    render();

    return lines;
  }
}
